from unittest.mock import patch, call

from rest_framework import status
from rest_framework.test import APITestCase, APIClient

from authentication.factories import UserFactory
from profiles.factories import (
    ProfileCompanyFactory,
)
from images.factories import ProfileimageFactory
from utils.moderation.encode_decode_id import encode_id
from utils.unittest_helper import AnyStr
from utils.dump_response import dump  # noqa


@patch("profiles.views.ModerationManager.schedule_autoapprove")
@patch("profiles.views.ModerationManager.revoke_deprecated_autoapprove")
class TestProfileModeration(APITestCase):
    def setUp(self) -> None:
        self.banner = ProfileimageFactory(image_type="banner")
        self.logo = ProfileimageFactory(image_type="logo")
        self.second_banner = ProfileimageFactory(image_type="banner")
        self.second_logo = ProfileimageFactory(image_type="logo")
        self.user = UserFactory()
        self.profile = ProfileCompanyFactory.create(person=self.user)

        self.user_client = APIClient()
        self.user_client.force_authenticate(self.user)

        self.moderator_client = APIClient()

    def test_approve_banner_and_logo(self, mock_revoke, mock_schedule):
        # user updates both banner and logo
        self.user_client.patch(
            path="/api/profiles/{profile_id}".format(
                profile_id=self.profile.id
            ),
            data={
                "banner": self.banner.uuid,
                "logo": self.logo.uuid,
            },
        )
        self.profile.refresh_from_db()

        # moderator approves request
        response = self.moderator_client.patch(
            path="/api/profiles/{profile_id}/images_moderation/".format(
                profile_id=encode_id(self.profile.id)
            ),
            data={
                "banner": self.profile.banner.uuid,
                "logo": self.profile.logo.uuid,
                "action": "approve",
            },
        )

        self.profile.refresh_from_db()
        self.banner.refresh_from_db()
        self.logo.refresh_from_db()

        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertEqual(
            {"status_updated_at": AnyStr(), "status": "approved"},
            response.json(),
        )
        self.assertTrue(self.banner.is_approved)
        self.assertTrue(self.logo.is_approved)
        self.assertEqual(self.profile.banner_approved, self.profile.banner)
        self.assertEqual(self.profile.logo_approved, self.profile.logo)
        self.assertEqual(self.profile.APPROVED, self.profile.status)
        mock_schedule.assert_called_once()
        mock_revoke.assert_called_once()

    def test_approve_banner(self, mock_revoke, mock_schedule):
        # user updates only banner
        self.user_client.patch(
            path="/api/profiles/{profile_id}".format(
                profile_id=self.profile.id
            ),
            data={
                "banner": self.banner.uuid,
            },
        )
        self.profile.refresh_from_db()

        # moderator approves request
        response = self.moderator_client.patch(
            path="/api/profiles/{profile_id}/images_moderation/".format(
                profile_id=encode_id(self.profile.id)
            ),
            data={
                "banner": self.profile.banner.uuid,
                "action": "approve",
            },
        )

        self.profile.refresh_from_db()
        self.banner.refresh_from_db()

        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertEqual(
            {"status_updated_at": AnyStr(), "status": "approved"},
            response.json(),
        )
        self.assertTrue(self.banner.is_approved)
        self.assertEqual(self.profile.banner_approved, self.profile.banner)
        self.assertEqual(self.profile.APPROVED, self.profile.status)
        mock_schedule.assert_called_once()
        mock_revoke.assert_called_once()

    def test_approve_logo(self, mock_revoke, mock_schedule):
        # user updates logo
        self.user_client.patch(
            path="/api/profiles/{profile_id}".format(
                profile_id=self.profile.id
            ),
            data={
                "logo": self.logo.uuid,
            },
        )
        self.profile.refresh_from_db()

        # moderator approves request
        response = self.moderator_client.patch(
            path="/api/profiles/{profile_id}/images_moderation/".format(
                profile_id=encode_id(self.profile.id)
            ),
            data={
                "logo": self.profile.logo.uuid,
                "action": "approve",
            },
        )

        self.profile.refresh_from_db()
        self.logo.refresh_from_db()

        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertEqual(
            {"status_updated_at": AnyStr(), "status": "approved"},
            response.json(),
        )
        self.assertTrue(self.logo.is_approved)
        self.assertEqual(self.profile.logo_approved, self.profile.logo)
        self.assertEqual(self.profile.APPROVED, self.profile.status)
        mock_schedule.assert_called_once()
        mock_revoke.assert_called_once()

    def test_approve_banner_and_logo_processed_request(
        self, mock_revoke, mock_schedule
    ):
        # user updates both banner and logo
        self.user_client.patch(
            path="/api/profiles/{profile_id}".format(
                profile_id=self.profile.id
            ),
            data={
                "banner": self.banner.uuid,
                "logo": self.logo.uuid,
            },
        )
        self.profile.refresh_from_db()

        # moderator approves request
        self.moderator_client.patch(
            path="/api/profiles/{profile_id}/images_moderation/".format(
                profile_id=encode_id(self.profile.id)
            ),
            data={
                "banner": self.profile.banner.uuid,
                "logo": self.profile.logo.uuid,
                "action": "approve",
            },
        )

        # moderator approves request one more time
        response = self.moderator_client.patch(
            path="/api/profiles/{profile_id}/images_moderation/".format(
                profile_id=encode_id(self.profile.id)
            ),
            data={
                "banner": self.profile.banner.uuid,
                "logo": self.profile.logo.uuid,
                "action": "approve",
            },
        )

        self.assertEqual(status.HTTP_400_BAD_REQUEST, response.status_code)
        self.assertEqual(
            {
                "non_field_errors": [
                    "The change approval request has been processed. URL is outdated"
                ]
            },
            response.json(),
        )
        mock_schedule.assert_called_once()
        mock_revoke.assert_called_once()

    def test_approve_banner_and_logo_outdated_request(
        self, mock_revoke, mock_schedule
    ):
        # user updates both banner and logo
        self.user_client.patch(
            path="/api/profiles/{profile_id}".format(
                profile_id=self.profile.id
            ),
            data={
                "banner": self.banner.uuid,
                "logo": self.logo.uuid,
            },
        )
        self.profile.refresh_from_db()

        first_banner = self.profile.banner.uuid
        first_logo = self.profile.logo.uuid

        # user updates both banner and logo again during pending request
        self.user_client.patch(
            path="/api/profiles/{profile_id}".format(
                profile_id=self.profile.id
            ),
            data={
                "banner": self.second_banner.uuid,
                "logo": self.second_logo.uuid,
            },
        )

        self.profile.refresh_from_db()

        # moderator approves first request
        response = self.moderator_client.patch(
            path="/api/profiles/{profile_id}/images_moderation/".format(
                profile_id=encode_id(self.profile.id)
            ),
            data={
                "banner": first_banner,
                "logo": first_logo,
                "action": "approve",
            },
        )

        self.assertEqual(status.HTTP_400_BAD_REQUEST, response.status_code)
        self.assertEqual(
            {
                "non_field_errors": [
                    "There is a new request for moderation. URL is outdated"
                ]
            },
            response.json(),
        )
        self.assertNotEqual(self.profile.banner, first_banner)
        self.assertNotEqual(self.profile.logo, first_logo)
        self.assertEqual(self.profile.PENDING, self.profile.status)
        mock_schedule.assert_has_calls([call(), call()])
        mock_revoke.assert_not_called()

    def test_approve_banner_and_logo_wrong_action(
        self, mock_revoke, mock_schedule
    ):
        # user updates both banner and logo
        self.user_client.patch(
            path="/api/profiles/{profile_id}".format(
                profile_id=self.profile.id
            ),
            data={
                "banner": self.banner.uuid,
                "logo": self.logo.uuid,
            },
        )
        self.profile.refresh_from_db()

        # moderator approves request
        response = self.moderator_client.patch(
            path="/api/profiles/{profile_id}/images_moderation/".format(
                profile_id=encode_id(self.profile.id)
            ),
            data={
                "banner": self.profile.banner.uuid,
                "logo": self.profile.logo.uuid,
                "action": "some_other_action",
            },
        )

        self.assertEqual(status.HTTP_400_BAD_REQUEST, response.status_code)
        self.assertEqual(
            {"action": ["Action is not allowed"]}, response.json()
        )
        mock_schedule.assert_called_once()
        mock_revoke.assert_not_called()

    def test_approve_banner_and_logo_error_in_signed_id(
        self, mock_revoke, mock_schedule
    ):
        # user updates both banner and logo
        self.user_client.patch(
            path="/api/profiles/{profile_id}".format(
                profile_id=self.profile.id
            ),
            data={
                "banner": self.banner.uuid,
                "logo": self.logo.uuid,
            },
        )
        self.profile.refresh_from_db()

        # moderator approves request
        response = self.moderator_client.patch(
            path="/api/profiles/{profile_id}/images_moderation/".format(
                profile_id="some_wrong_signed_id"
            ),
            data={
                "banner": self.profile.banner.uuid,
                "logo": self.profile.logo.uuid,
                "action": "approve",
            },
        )

        self.assertEqual(status.HTTP_404_NOT_FOUND, response.status_code)
        self.assertEqual({"detail": "Not found."}, response.json())
        mock_schedule.assert_called_once()
        mock_revoke.assert_not_called()

    def test_approve_banner_and_logo_non_existing_profile(
        self, mock_revoke, mock_schedule
    ):
        # user updates both banner and logo
        self.user_client.patch(
            path="/api/profiles/{profile_id}".format(
                profile_id=self.profile.id
            ),
            data={
                "banner": self.banner.uuid,
                "logo": self.logo.uuid,
            },
        )
        self.profile.refresh_from_db()

        # moderator approves request
        response = self.moderator_client.patch(
            path="/api/profiles/{profile_id}/images_moderation/".format(
                profile_id=encode_id(0)
            ),
            data={
                "banner": self.profile.banner.uuid,
                "logo": self.profile.logo.uuid,
                "action": "approve",
            },
        )

        self.assertEqual(status.HTTP_404_NOT_FOUND, response.status_code)
        self.assertEqual({"detail": "Not found."}, response.json())
        mock_schedule.assert_called_once()
        mock_revoke.assert_not_called()

    def test_approve_banner_and_logo_empty_image_fields(
        self, mock_revoke, mock_schedule
    ):
        # user updates both banner and logo
        self.user_client.patch(
            path="/api/profiles/{profile_id}".format(
                profile_id=self.profile.id
            ),
            data={
                "banner": self.banner.uuid,
                "logo": self.logo.uuid,
            },
        )
        self.profile.refresh_from_db()

        # moderator approves request
        response = self.moderator_client.patch(
            path="/api/profiles/{profile_id}/images_moderation/".format(
                profile_id=encode_id(self.profile.id)
            ),
            data={
                "action": "approve",
            },
        )

        self.assertEqual(status.HTTP_400_BAD_REQUEST, response.status_code)
        self.assertEqual(
            {
                "non_field_errors": [
                    "At least one image (logo or banner) must be provided for the moderation request."
                ]
            },
            response.json(),
        )
        mock_schedule.assert_called_once()
        mock_revoke.assert_not_called()
