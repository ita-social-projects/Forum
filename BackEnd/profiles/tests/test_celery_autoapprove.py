from unittest.mock import patch

from rest_framework.test import APITestCase

from authentication.factories import UserFactory
from profiles.factories import (
    ProfileCompanyFactory,
)
from administration.models import AutoModeration
from images.factories import ProfileimageFactory
from utils.unittest_helper import AnyInt


@patch("utils.moderation.image_moderation.celery_autoapprove.apply_async")
class TestCelery(APITestCase):
    def setUp(self) -> None:
        self.banner = ProfileimageFactory(image_type="banner")
        self.logo = ProfileimageFactory(image_type="logo")
        self.user = UserFactory()
        self.profile = ProfileCompanyFactory.create(person=self.user)
        self.client.force_authenticate(self.user)

    def test_autoapprove_banner_and_logo(self, mock_task):
        mock_task.return_value.id = "sometaskid"
        self.client.patch(
            path="/api/profiles/{profile_id}".format(
                profile_id=self.profile.id
            ),
            data={
                "banner": self.banner.uuid,
                "logo": self.logo.uuid,
            },
        )
        mock_task.assert_called_with(
            (self.profile.id, self.banner.uuid, self.logo.uuid),
            countdown=AnyInt(),
        )

    def test_autoapprove_only_banner(self, mock_task):
        mock_task.return_value.id = "sometaskid"
        self.client.patch(
            path="/api/profiles/{profile_id}".format(
                profile_id=self.profile.id
            ),
            data={
                "banner": self.banner.uuid,
            },
        )
        mock_task.assert_called_with(
            (self.profile.id, self.banner.uuid, None), countdown=AnyInt()
        )

    def test_autoapprove_only_logo(self, mock_task):
        mock_task.return_value.id = "sometaskid"
        self.client.patch(
            path="/api/profiles/{profile_id}".format(
                profile_id=self.profile.id
            ),
            data={
                "logo": self.logo.uuid,
            },
        )
        mock_task.assert_called_with(
            (self.profile.id, None, self.logo.uuid), countdown=AnyInt()
        )

    def test_change_autoapprove_time(self, mock_task):
        test_value = 5
        autapprove_delay = AutoModeration.get_auto_moderation_hours()
        autapprove_delay.auto_moderation_hours = test_value
        autapprove_delay.save()

        mock_task.return_value.id = "sometaskid"
        self.client.patch(
            path="/api/profiles/{profile_id}".format(
                profile_id=self.profile.id
            ),
            data={
                "banner": self.banner.uuid,
                "logo": self.logo.uuid,
            },
        )
        mock_task.assert_called_with(
            (self.profile.id, self.banner.uuid, self.logo.uuid),
            countdown=test_value * 60 * 60,
        )
