import os
from django.conf import settings
from rest_framework.test import APITestCase
from unittest import mock
from django.utils.timezone import now
from django.core import mail
from administration.models import AutoModeration
from utils.send_email import send_moderation_email
from utils.image_moderation import ModerationManager
from authentication.factories import UserFactory
from profiles.factories import ProfileStartupFactory
from images.factories import ProfileimageFactory


class TestSendModerationEmail(APITestCase):
    def setUp(self):
        self.banner = ProfileimageFactory(image_type="banner")
        self.logo = ProfileimageFactory(image_type="logo")
        self.user = UserFactory(email="test1@test.com")
        self.profile = ProfileStartupFactory.create(
            person=self.user,
            official_name="Test Official Startup",
            phone="380100102034",
            edrpou="99999999",
        )

    def test_send_moderation_email_no_banner_no_logo(self):
        send_moderation_email(self.profile)
        self.assertEqual(len(mail.outbox), 0)

    def test_send_moderation_email(self):
        self.profile.banner = self.banner
        self.profile.logo = self.logo

        send_moderation_email(self.profile)

        self.assertEqual(len(mail.outbox), 1)
        email_data = mail.outbox[0]
        self.assertEqual(
            email_data.subject,
            f"{self.profile.name} - {self.profile.status_updated_at.strftime('%d.%m.%Y')}: Запит на затвердження змін в обліковому записі компанії",
        )
        self.assertIn(settings.EMAIL_HOST_USER, email_data.to)
        self.assertIn(self.profile.name, email_data.body)
        self.assertIn(
            self.profile.status_updated_at.strftime("%d.%m.%Y %H:%M"),
            email_data.body,
        )

        self.assertEqual(len(email_data.attachments), 2)
        self.assertEqual(
            email_data.attachments[0].get_filename(),
            os.path.basename(self.banner.image_path.name),
        )
        self.assertEqual(
            email_data.attachments[1].get_filename(),
            os.path.basename(self.logo.image_path.name),
        )

    def test_send_moderation_email_only_banner(self):
        self.profile.banner = self.banner

        send_moderation_email(self.profile)

        self.assertEqual(len(mail.outbox), 1)
        email_data = mail.outbox[0]
        self.assertEqual(
            email_data.subject,
            f"{self.profile.name} - {self.profile.status_updated_at.strftime('%d.%m.%Y')}: Запит на затвердження змін в обліковому записі компанії",
        )
        self.assertIn(settings.EMAIL_HOST_USER, email_data.to)
        self.assertIn(self.profile.name, email_data.body)
        self.assertIn(
            self.profile.status_updated_at.strftime("%d.%m.%Y %H:%M"),
            email_data.body,
        )

        self.assertEqual(len(email_data.attachments), 1)
        self.assertEqual(
            email_data.attachments[0].get_filename(),
            os.path.basename(self.banner.image_path.name),
        )

    def test_send_moderation_email_only_logo(self):
        self.profile.logo = self.logo

        send_moderation_email(self.profile)

        self.assertEqual(len(mail.outbox), 1)
        email_data = mail.outbox[0]
        self.assertEqual(
            email_data.subject,
            f"{self.profile.name} - {self.profile.status_updated_at.strftime('%d.%m.%Y')}: Запит на затвердження змін в обліковому записі компанії",
        )
        self.assertIn(settings.EMAIL_HOST_USER, email_data.to)
        self.assertIn(self.profile.name, email_data.body)
        self.assertIn(
            self.profile.status_updated_at.strftime("%d.%m.%Y %H:%M"),
            email_data.body,
        )

        self.assertEqual(len(email_data.attachments), 1)
        self.assertEqual(
            email_data.attachments[0].get_filename(),
            os.path.basename(self.logo.image_path.name),
        )


class TestSendModerationManager(APITestCase):
    def setUp(self):
        self.banner = ProfileimageFactory(image_type="banner")
        self.logo = ProfileimageFactory(image_type="logo")
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
