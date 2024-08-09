import os
from rest_framework.test import APITestCase
from unittest import mock
from rest_framework import status
from django.utils.timezone import now
from utils.image_moderation import ModerationManager
from authentication.factories import UserFactory
from profiles.factories import ProfileStartupFactory
from images.factories import ProfileimageFactory


class TestSendModerationEmail(APITestCase):
    def setUp(self):
        self.banner_path = os.path.join(
            os.getcwd(), "images/tests/img/img_2mb.png"
        )
        self.logo_path = os.path.join(
            os.getcwd(), "images/tests/img/img_300kb.png"
        )

        self.banner = ProfileimageFactory(image_path=self.banner_path)
        self.logo = ProfileimageFactory(image_path=self.logo_path)
        self.user = UserFactory(email="test1@test.com")
        self.profile = ProfileStartupFactory.create(
            person=self.user,
            official_name="Test Official Startup",
            phone="380100102034",
            edrpou="99999999",
        )

    @mock.patch("utils.send_email.EmailMultiAlternatives")
    @mock.patch("utils.send_email.render_to_string")
    @mock.patch(
        "utils.send_email.attach_image",
        new_callable=mock.mock_open,
        read_data=b"image",
    )
    def test_send_moderation_email(
        self, mock_file, mock_render_to_string, mock_email_multi_alternatives
    ):
        self.client.force_authenticate(self.user)
        response = self.client.patch(
            path="/api/profiles/{profile_id}".format(
                profile_id=self.profile.id
            ),
            data={"banner": self.banner.uuid, "logo": self.logo.uuid},
        )

        mock_email_multi_alternatives.assert_called_once()
        mock_render_to_string.assert_called_once()
        email_instance = mock_email_multi_alternatives.return_value
        mock_file.assert_called()
        email_instance.send.assert_called_once()
        self.assertEqual(status.HTTP_200_OK, response.status_code)

        email_data = mock_render_to_string.call_args[0][1]
        self.assertEqual(self.profile.name, email_data["profile_name"])
        self.assertEqual(self.banner.uuid, str(email_data["banner"].uuid))
        self.assertEqual(self.logo.uuid, str(email_data["logo"].uuid))
        self.assertEqual(
            self.profile.status_updated_at.strftime("%d.%m.%Y %H:%M"),
            email_data["updated_at"],
        )

    @mock.patch("utils.send_email.EmailMultiAlternatives")
    @mock.patch("utils.send_email.render_to_string")
    @mock.patch(
        "utils.send_email.attach_image",
        new_callable=mock.mock_open,
        read_data=b"image",
    )
    def test_send_moderation_email_only_banner(
        self, mock_file, mock_render_to_string, mock_email_multi_alternatives
    ):
        self.client.force_authenticate(self.user)
        response = self.client.patch(
            path="/api/profiles/{profile_id}".format(
                profile_id=self.profile.id
            ),
            data={
                "banner": self.banner.uuid,
            },
        )

        mock_email_multi_alternatives.assert_called_once()
        mock_render_to_string.assert_called_once()
        email_instance = mock_email_multi_alternatives.return_value
        mock_file.assert_called()
        email_instance.send.assert_called_once()
        self.assertEqual(status.HTTP_200_OK, response.status_code)

        email_data = mock_render_to_string.call_args[0][1]
        self.assertEqual(self.profile.name, email_data["profile_name"])
        self.assertEqual(self.banner.uuid, str(email_data["banner"].uuid))
        self.assertIsNone(None, email_data["logo"])
        self.assertEqual(
            self.profile.status_updated_at.strftime("%d.%m.%Y %H:%M"),
            email_data["updated_at"],
        )

    @mock.patch("utils.send_email.EmailMultiAlternatives")
    @mock.patch("utils.send_email.render_to_string")
    @mock.patch(
        "utils.send_email.attach_image",
        new_callable=mock.mock_open,
        read_data=b"image",
    )
    def test_send_moderation_email_only_logo(
        self, mock_file, mock_render_to_string, mock_email_multi_alternatives
    ):
        self.client.force_authenticate(self.user)
        response = self.client.patch(
            path="/api/profiles/{profile_id}".format(
                profile_id=self.profile.id
            ),
            data={
                "logo": self.logo.uuid,
            },
        )

        mock_email_multi_alternatives.assert_called_once()
        mock_render_to_string.assert_called_once()
        email_instance = mock_email_multi_alternatives.return_value
        mock_file.assert_called()
        email_instance.send.assert_called_once()
        self.assertEqual(status.HTTP_200_OK, response.status_code)

        email_data = mock_render_to_string.call_args[0][1]
        self.assertEqual(self.profile.name, email_data["profile_name"])
        self.assertIsNone(email_data["banner"])
        self.assertEqual(self.logo.uuid, str(email_data["logo"].uuid))
        self.assertEqual(
            self.profile.status_updated_at.strftime("%d.%m.%Y %H:%M"),
            email_data["updated_at"],
        )


class TestSendModerationManager(APITestCase):
    def setUp(self):
        self.banner_path = os.path.join(
            os.getcwd(), "images/tests/img/img_2mb.png"
        )
        self.logo_path = os.path.join(
            os.getcwd(), "images/tests/img/img_300kb.png"
        )

        self.banner = ProfileimageFactory(image_path=self.banner_path)
        self.logo = ProfileimageFactory(image_path=self.logo_path)
        self.user = UserFactory(email="test1@test.com")
        self.profile = ProfileStartupFactory.create(
            person=self.user,
            official_name="Test Official Startup",
            phone="380100102034",
            edrpou="99999999",
        )
        self.manager = ModerationManager(self.profile)

    def test_needs_moderation(self):
        self.assertTrue(self.manager.needs_moderation(self.banner))
        self.assertTrue(self.manager.needs_moderation(self.logo))

    def test_needs_moderation_approved_image(self):
        self.banner.is_approved = True
        self.logo.is_approved = True
        self.assertFalse(self.manager.needs_moderation(self.banner))
        self.assertFalse(self.manager.needs_moderation(self.logo))

    def test_needs_moderation_deleted_image(self):
        self.banner.is_deleted = True
        self.logo.is_deleted = True
        self.assertFalse(self.manager.needs_moderation(self.banner))
        self.assertFalse(self.manager.needs_moderation(self.logo))

    @mock.patch("utils.image_moderation.now", return_value=now())
    def test_update_status(self, mock_now):
        self.manager.update_status()
        self.assertEqual(self.profile.status, "pending")
        self.assertEqual(self.profile.status_updated_at, mock_now.return_value)
        self.assertTrue(self.manager.moderation_is_needed)

    @mock.patch("utils.image_moderation.now", return_value=now())
    def test_check_for_moderation(self, mock_now):
        self.profile.banner = self.banner
        self.profile.logo = self.logo
        self.manager.check_for_moderation()
        self.assertEqual(self.profile.status, "pending")
        self.assertEqual(self.profile.status_updated_at, mock_now.return_value)
        self.assertTrue(self.manager.moderation_is_needed)
        self.assertEqual(
            self.manager.banner_logo,
            {"banner": self.banner, "logo": self.logo},
        )

    @mock.patch("utils.image_moderation.now", return_value=now())
    def test_check_for_moderation_deleted_banner(self, mock_now):
        self.banner.is_deleted = True
        self.profile.banner = self.banner
        self.profile.logo = self.logo
        self.manager.check_for_moderation()
        self.assertEqual(self.profile.status, "pending")
        self.assertEqual(self.profile.status_updated_at, mock_now.return_value)
        self.assertTrue(self.manager.moderation_is_needed)
        self.assertEqual(
            self.manager.banner_logo, {"banner": None, "logo": self.logo}
        )

    @mock.patch("utils.image_moderation.now", return_value=now())
    def test_check_for_moderation_deleted_logo(self, mock_now):
        self.logo.is_deleted = True
        self.profile.banner = self.banner
        self.profile.logo = self.logo
        self.manager.check_for_moderation()
        self.assertEqual(self.profile.status, "pending")
        self.assertEqual(self.profile.status_updated_at, mock_now.return_value)
        self.assertTrue(self.manager.moderation_is_needed)
        self.assertEqual(
            self.manager.banner_logo, {"banner": self.banner, "logo": None}
        )

    # needs improvement for undefined status
    def test_check_for_moderation_deleted_both(self):
        self.banner.is_deleted = True
        self.profile.banner = self.banner
        self.logo.is_deleted = True
        self.profile.logo = self.logo
        self.manager.check_for_moderation()
        self.assertFalse(self.manager.moderation_is_needed)
        self.assertEqual(
            self.manager.banner_logo, {"banner": None, "logo": None}
        )
