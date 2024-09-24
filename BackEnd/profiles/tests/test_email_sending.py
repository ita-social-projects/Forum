import os
from rest_framework.test import APITestCase
from unittest import mock
from django.utils.timezone import now
from django.core import mail
from utils.moderation.handle_approved_images import ApprovedImagesDeleter
from utils.moderation.send_email import send_moderation_email
from utils.moderation.image_moderation import ModerationManager
from authentication.factories import UserFactory
from profiles.factories import ProfileStartupFactory
from images.factories import ProfileimageFactory
from administration.models import ModerationEmail


class TestSendModerationEmail(APITestCase):
    def setUp(self):
        self.banner = ProfileimageFactory(image_type="banner")
        self.previously_approved_banner = ProfileimageFactory(
            image_type="banner",
            hash_md5="0dc41dd9dcbc75e730642dbfb87cd1d5",
            is_approved=True,
        )
        self.logo = ProfileimageFactory(image_type="logo")
        self.previously_approved_logo = ProfileimageFactory(
            image_type="banner",
            hash_md5="b4094f9fa6e298a6e25c1dba791868fe",
            is_approved=True,
        )
        self.user = UserFactory(email="test1@test.com")
        self.profile = ProfileStartupFactory.create(
            person=self.user,
            official_name="Test Official Startup",
            phone="380100102034",
            edrpou="99999999",
        )
        self.moderation_email = ModerationEmail.objects.create(
            email_moderation="test_moderation@example.com"
        )

    # tests for new images
    def test_send_moderation_email(self):
        self.profile.banner = self.banner
        self.profile.logo = self.logo
        manager = ModerationManager(self.profile)
        manager.check_for_moderation()
        banner = manager.images["banner"]
        logo = manager.images["logo"]
        content_is_deleted = manager.content_deleted
        send_moderation_email(self.profile, banner, logo, content_is_deleted)

        self.assertEqual(len(mail.outbox), 1)
        email_data = mail.outbox[0]
        self.assertEqual(
            email_data.subject,
            f"{self.profile.name} - {self.profile.status_updated_at.strftime('%d.%m.%Y')}: Запит на затвердження змін в обліковому записі компанії",
        )
        self.assertIn(self.moderation_email, email_data.to)
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

        manager = ModerationManager(self.profile)
        manager.check_for_moderation()
        banner = manager.images["banner"]
        logo = manager.images["logo"]
        content_is_deleted = manager.content_deleted
        send_moderation_email(self.profile, banner, logo, content_is_deleted)

        self.assertEqual(len(mail.outbox), 1)
        email_data = mail.outbox[0]
        self.assertEqual(
            email_data.subject,
            f"{self.profile.name} - {self.profile.status_updated_at.strftime('%d.%m.%Y')}: Запит на затвердження змін в обліковому записі компанії",
        )
        self.assertIn(self.moderation_email, email_data.to)
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

        manager = ModerationManager(self.profile)
        manager.check_for_moderation()
        banner = manager.images["banner"]
        logo = manager.images["logo"]
        content_is_deleted = manager.content_deleted
        send_moderation_email(self.profile, banner, logo, content_is_deleted)

        self.assertEqual(len(mail.outbox), 1)
        email_data = mail.outbox[0]
        self.assertEqual(
            email_data.subject,
            f"{self.profile.name} - {self.profile.status_updated_at.strftime('%d.%m.%Y')}: Запит на затвердження змін в обліковому записі компанії",
        )
        self.assertIn(self.moderation_email, email_data.to)
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

    def test_send_moderation_email_new_banner_approved_logo(self):
        self.profile.banner = self.banner
        self.profile.logo = self.logo
        self.profile.logo.is_approved = True

        manager = ModerationManager(self.profile)
        manager.check_for_moderation()
        banner = manager.images["banner"]
        logo = manager.images["logo"]
        content_is_deleted = manager.content_deleted
        send_moderation_email(self.profile, banner, logo, content_is_deleted)

        self.assertEqual(len(mail.outbox), 1)
        email_data = mail.outbox[0]
        self.assertEqual(
            email_data.subject,
            f"{self.profile.name} - {self.profile.status_updated_at.strftime('%d.%m.%Y')}: Запит на затвердження змін в обліковому записі компанії",
        )
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

    def test_send_moderation_email_previously_approved_banner(self):
        new_banner = ProfileimageFactory(
            image_type="banner", hash_md5="0dc41dd9dcbc75e730642dbfb87cd1d5"
        )
        self.profile.banner = new_banner
        self.profile.logo = self.logo

        manager = ModerationManager(self.profile)
        manager.check_for_moderation()
        banner = manager.images["banner"]
        logo = manager.images["logo"]
        content_is_deleted = manager.content_deleted
        send_moderation_email(self.profile, banner, logo, content_is_deleted)

        self.assertEqual(len(mail.outbox), 1)
        email_data = mail.outbox[0]
        self.assertEqual(
            email_data.subject,
            f"{self.profile.name} - {self.profile.status_updated_at.strftime('%d.%m.%Y')}: Запит на затвердження змін в обліковому записі компанії",
        )
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

    def test_send_moderation_email_previously_approved_logo(self):
        new_logo = ProfileimageFactory(
            image_type="logo", hash_md5="b4094f9fa6e298a6e25c1dba791868fe"
        )
        self.profile.banner = self.banner
        self.profile.logo = new_logo

        manager = ModerationManager(self.profile)
        manager.check_for_moderation()
        banner = manager.images["banner"]
        logo = manager.images["logo"]
        content_is_deleted = manager.content_deleted
        send_moderation_email(self.profile, banner, logo, content_is_deleted)

        self.assertEqual(len(mail.outbox), 1)
        email_data = mail.outbox[0]
        self.assertEqual(
            email_data.subject,
            f"{self.profile.name} - {self.profile.status_updated_at.strftime('%d.%m.%Y')}: Запит на затвердження змін в обліковому записі компанії",
        )
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

    # test for deleted images
    def test_content_deleted_email_with_pending_status(self):
        self.profile.status = self.profile.PENDING
        manager = ModerationManager(self.profile)
        manager.check_for_moderation()
        banner = manager.images["banner"]
        logo = manager.images["logo"]
        content_is_deleted = manager.content_deleted
        send_moderation_email(self.profile, banner, logo, content_is_deleted)

        self.assertIn(
            "Інформуємо про те що попередньо доданий контент було видалено користувачем.",
            mail.outbox[0].body,
        )
        self.assertEqual(self.profile.status, self.profile.UNDEFINED)
        self.assertIsNone(self.profile.banner)
        self.assertIsNone(self.profile.logo)

    def test_remove_pending_image_keep_approved_image(self):
        self.profile.banner = self.banner
        self.profile.banner.is_approved = True
        self.profile.status = self.profile.PENDING
        manager = ModerationManager(self.profile)
        manager.check_for_moderation()
        banner = manager.images["banner"]
        logo = manager.images["logo"]
        content_is_deleted = manager.content_deleted
        send_moderation_email(self.profile, banner, logo, content_is_deleted)

        self.assertIn(
            "Інформуємо про те що попередньо доданий контент було видалено користувачем.",
            mail.outbox[0].body,
        )
        self.assertEqual(self.profile.status, self.profile.APPROVED)
        self.assertTrue(self.profile.banner.is_approved)
        self.assertIsNone(self.profile.logo)

    def test_content_deleted_previously_approved_banner(self):
        self.profile.banner = self.banner
        self.profile.status = self.profile.PENDING
        new_banner = ProfileimageFactory(
            image_type="banner", hash_md5="0dc41dd9dcbc75e730642dbfb87cd1d5"
        )
        self.profile.banner = new_banner
        manager = ModerationManager(self.profile)
        manager.check_for_moderation()
        banner = manager.images["banner"]
        logo = manager.images["logo"]
        content_is_deleted = manager.content_deleted
        send_moderation_email(self.profile, banner, logo, content_is_deleted)

        self.assertIn(
            "Інформуємо про те що попередньо доданий контент було видалено користувачем.",
            mail.outbox[0].body,
        )
        self.assertEqual(self.profile.status, self.profile.APPROVED)
        self.assertEqual(self.profile.banner, new_banner)
        self.assertIsNone(self.profile.logo)

    def test_content_deleted_previously_approved_logo(self):
        self.profile.logo = self.logo
        self.profile.status = self.profile.PENDING
        new_logo = ProfileimageFactory(
            image_type="logo", hash_md5="b4094f9fa6e298a6e25c1dba791868fe"
        )
        self.profile.logo = new_logo
        manager = ModerationManager(self.profile)
        manager.check_for_moderation()
        banner = manager.images["banner"]
        logo = manager.images["logo"]
        content_is_deleted = manager.content_deleted
        send_moderation_email(self.profile, banner, logo, content_is_deleted)

        self.assertIn(
            "Інформуємо про те що попередньо доданий контент було видалено користувачем.",
            mail.outbox[0].body,
        )
        self.assertEqual(self.profile.status, self.profile.APPROVED)
        self.assertEqual(self.profile.logo, new_logo)
        self.assertIsNone(self.profile.banner)

    def test_content_deleted_previously_approved_both(self):
        self.profile.banner = self.banner
        self.profile.logo = self.logo
        self.profile.status = self.profile.PENDING
        new_logo = ProfileimageFactory(
            image_type="logo", hash_md5="b4094f9fa6e298a6e25c1dba791868fe"
        )
        new_banner = ProfileimageFactory(
            image_type="banner", hash_md5="0dc41dd9dcbc75e730642dbfb87cd1d5"
        )
        self.profile.logo = new_logo
        self.profile.banner = new_banner
        manager = ModerationManager(self.profile)
        manager.check_for_moderation()
        banner = manager.images["banner"]
        logo = manager.images["logo"]
        content_is_deleted = manager.content_deleted
        send_moderation_email(self.profile, banner, logo, content_is_deleted)

        self.assertIn(
            "Інформуємо про те що попередньо доданий контент було видалено користувачем.",
            mail.outbox[0].body,
        )
        self.assertEqual(self.profile.status, self.profile.APPROVED)
        self.assertEqual(self.profile.logo, new_logo)
        self.assertEqual(self.profile.banner, new_banner)


class TestSendModerationManager(APITestCase):
    def setUp(self):
        self.banner = ProfileimageFactory(image_type="banner")
        self.previously_approved_banner = ProfileimageFactory(
            image_type="banner",
            hash_md5="0dc41dd9dcbc75e730642dbfb87cd1d5",
            is_approved=True,
        )
        self.logo = ProfileimageFactory(image_type="logo")
        self.previously_approved_logo = ProfileimageFactory(
            image_type="banner",
            hash_md5="b4094f9fa6e298a6e25c1dba791868fe",
            is_approved=True,
        )
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
        self.assertFalse(
            self.manager.needs_moderation(self.previously_approved_banner)
        )
        self.assertFalse(
            self.manager.needs_moderation(self.previously_approved_logo)
        )

    def test_needs_moderation_deleted_image(self):
        self.assertFalse(self.manager.needs_moderation(self.profile.banner))
        self.assertFalse(self.manager.needs_moderation(self.profile.logo))

    @mock.patch("utils.moderation.image_moderation.now", return_value=now())
    def test_update_pending_status(self, mock_now):
        self.profile.banner = self.banner
        self.manager.update_pending_status("banner", self.profile.banner)
        self.assertEqual(self.profile.status, self.profile.PENDING)
        self.assertEqual(self.profile.status_updated_at, mock_now.return_value)
        self.assertTrue(self.manager.moderation_is_needed)

    @mock.patch("utils.moderation.image_moderation.now", return_value=now())
    def test_update_pending_status_previously_approved_banner(self, mock_now):
        new_banner = ProfileimageFactory(
            image_type="banner", hash_md5="0dc41dd9dcbc75e730642dbfb87cd1d5"
        )
        self.profile.banner = new_banner
        self.manager.update_pending_status("banner", self.profile.banner)
        self.assertEqual(self.profile.status, self.profile.APPROVED)
        self.assertEqual(self.profile.status_updated_at, mock_now.return_value)
        self.assertFalse(self.manager.moderation_is_needed)

    @mock.patch("utils.moderation.image_moderation.now", return_value=now())
    def test_update_pending_status_previously_approved_logo(self, mock_now):
        new_logo = ProfileimageFactory(
            image_type="logo", hash_md5="b4094f9fa6e298a6e25c1dba791868fe"
        )
        self.profile.logo = new_logo
        self.manager.update_pending_status("logo", self.profile.logo)
        self.assertEqual(self.profile.status, self.profile.APPROVED)
        self.assertEqual(self.profile.status_updated_at, mock_now.return_value)
        self.assertFalse(self.manager.moderation_is_needed)

    def test_previously_approved_content_pending_status(self):
        self.profile.banner = self.banner
        self.profile.status = self.profile.PENDING
        new_logo = ProfileimageFactory(
            image_type="logo", hash_md5="b4094f9fa6e298a6e25c1dba791868fe"
        )
        self.profile.logo = new_logo
        self.manager.update_pending_status("logo", self.profile.logo)
        self.assertEqual(self.profile.status, self.profile.PENDING)
        self.assertFalse(self.manager.moderation_is_needed)

    # cases for moderation is needed
    @mock.patch("utils.moderation.image_moderation.now", return_value=now())
    def test_check_for_moderation(self, mock_now):
        self.profile.banner = self.banner
        self.profile.logo = self.logo
        self.manager.check_for_moderation()
        self.assertEqual(self.profile.status, self.profile.PENDING)
        self.assertEqual(self.profile.status_updated_at, mock_now.return_value)
        self.assertTrue(self.manager.moderation_is_needed)
        self.assertEqual(
            self.manager.images,
            {"banner": self.banner, "logo": self.logo},
        )

    @mock.patch("utils.moderation.image_moderation.now", return_value=now())
    def test_check_for_moderation_previously_approved_banner(self, mock_now):
        new_banner = ProfileimageFactory(
            image_type="banner", hash_md5="0dc41dd9dcbc75e730642dbfb87cd1d5"
        )
        self.profile.banner = new_banner
        self.profile.logo = self.logo
        self.manager.check_for_moderation()
        self.assertEqual(self.profile.status, self.profile.PENDING)
        self.assertEqual(self.profile.status_updated_at, mock_now.return_value)
        self.assertTrue(self.manager.moderation_is_needed)
        self.assertEqual(
            self.manager.images,
            {"banner": None, "logo": self.logo},
        )

    @mock.patch("utils.moderation.image_moderation.now", return_value=now())
    def test_check_for_moderation_previously_approved_logo(self, mock_now):
        self.profile.banner = self.banner
        new_logo = ProfileimageFactory(
            image_type="logo", hash_md5="b4094f9fa6e298a6e25c1dba791868fe"
        )
        self.profile.logo = new_logo
        self.manager.check_for_moderation()
        self.assertEqual(self.profile.status, self.profile.PENDING)
        self.assertEqual(self.profile.status_updated_at, mock_now.return_value)
        self.assertTrue(self.manager.moderation_is_needed)
        self.assertEqual(
            self.manager.images,
            {"banner": self.banner, "logo": None},
        )

    @mock.patch("utils.moderation.image_moderation.now", return_value=now())
    def test_check_for_moderation_empty_banner(self, mock_now):
        self.profile.logo = self.logo
        self.manager.check_for_moderation()
        self.assertEqual(self.profile.status, self.profile.PENDING)
        self.assertEqual(self.profile.status_updated_at, mock_now.return_value)
        self.assertTrue(self.manager.moderation_is_needed)
        self.assertEqual(
            self.manager.images, {"banner": None, "logo": self.logo}
        )

    @mock.patch("utils.moderation.image_moderation.now", return_value=now())
    def test_check_for_moderation_empty_logo(self, mock_now):
        self.profile.banner = self.banner
        self.manager.check_for_moderation()
        self.assertEqual(self.profile.status, self.profile.PENDING)
        self.assertEqual(self.profile.status_updated_at, mock_now.return_value)
        self.assertTrue(self.manager.moderation_is_needed)
        self.assertEqual(
            self.manager.images, {"banner": self.banner, "logo": None}
        )

    @mock.patch("utils.moderation.image_moderation.now", return_value=now())
    def test_check_for_moderation_with_approved_image(self, mock_now):
        self.profile.banner = self.banner
        self.profile.banner.is_approved = True
        self.profile.logo = self.logo
        self.manager.check_for_moderation()
        self.assertEqual(self.profile.status, self.profile.PENDING)
        self.assertEqual(self.profile.status_updated_at, mock_now.return_value)
        self.assertTrue(self.manager.moderation_is_needed)
        self.assertEqual(
            self.manager.images,
            {"banner": None, "logo": self.logo},
        )

    def test_previously_approved_banner_empty_logo(self):
        new_banner = ProfileimageFactory(
            image_type="banner", hash_md5="0dc41dd9dcbc75e730642dbfb87cd1d5"
        )
        self.profile.banner = new_banner
        self.manager.check_for_moderation()
        self.assertEqual(self.profile.status, self.profile.APPROVED)
        self.assertFalse(self.manager.moderation_is_needed)
        self.assertEqual(
            self.manager.images,
            {"banner": None, "logo": None},
        )

    def test_previously_approved_logo_empty_banner(self):
        new_logo = ProfileimageFactory(
            image_type="logo", hash_md5="b4094f9fa6e298a6e25c1dba791868fe"
        )
        self.profile.logo = new_logo
        self.manager.check_for_moderation()
        self.assertEqual(self.profile.status, self.profile.APPROVED)
        self.assertFalse(self.manager.moderation_is_needed)
        self.assertEqual(
            self.manager.images,
            {"banner": None, "logo": None},
        )

    # handle the deletion of a new image
    @mock.patch("utils.moderation.image_moderation.now", return_value=now())
    def test_handle_approved_image_status_pending(self, mock_now):
        self.profile.banner = self.banner
        self.profile.banner.is_approved = True
        self.profile.status = self.profile.PENDING
        self.manager.check_for_moderation()
        self.assertEqual(self.profile.status, self.profile.APPROVED)
        self.assertEqual(self.profile.status_updated_at, mock_now.return_value)
        self.assertFalse(self.manager.moderation_is_needed)
        self.assertTrue(self.manager.content_deleted)
        self.assertEqual(
            self.manager.images,
            {"banner": None, "logo": None},
        )

    # handle the deletion one of an approved images
    def test_handle_approved_image_status_approved(self):
        self.profile.banner = self.banner
        self.profile.banner.is_approved = True
        self.profile.status = self.profile.APPROVED
        self.manager.check_for_moderation()
        self.assertEqual(self.profile.status, self.profile.APPROVED)
        self.assertFalse(self.manager.moderation_is_needed)
        self.assertEqual(
            self.manager.images,
            {"banner": None, "logo": None},
        )

    def test_handle_undefined_status(self):
        self.profile.status = self.profile.PENDING
        self.manager.check_for_moderation()
        self.assertEqual(self.profile.status, self.profile.UNDEFINED)
        self.assertFalse(self.manager.moderation_is_needed)
        self.assertTrue(self.manager.content_deleted)
        self.assertEqual(self.manager.images, {"banner": None, "logo": None})

    def test_undefined_status_after_approved_images_deleted(self):
        self.profile.status = self.profile.APPROVED
        self.manager.check_for_moderation()
        self.assertEqual(self.profile.status, self.profile.UNDEFINED)
        self.assertFalse(self.manager.moderation_is_needed)
        self.assertFalse(self.manager.content_deleted)
        self.assertEqual(self.manager.images, {"banner": None, "logo": None})

    @mock.patch("utils.moderation.image_moderation.now", return_value=now())
    def test_handle_both_approved(self, mock_now):
        self.profile.status = self.profile.PENDING
        new_logo = ProfileimageFactory(
            image_type="logo", hash_md5="b4094f9fa6e298a6e25c1dba791868fe"
        )
        new_banner = ProfileimageFactory(
            image_type="banner", hash_md5="0dc41dd9dcbc75e730642dbfb87cd1d5"
        )
        self.profile.logo = new_logo
        self.profile.banner = new_banner
        self.manager.check_for_moderation()
        self.assertEqual(self.profile.status, self.profile.APPROVED)
        self.assertFalse(self.manager.moderation_is_needed)
        self.assertTrue(self.manager.content_deleted)
        self.assertEqual(self.profile.status_updated_at, mock_now.return_value)
        self.assertEqual(self.manager.images, {"banner": None, "logo": None})

    @mock.patch("utils.moderation.image_moderation.now", return_value=now())
    def test_handle_both_approved_pending_status(self, mock_now):
        new_logo = ProfileimageFactory(
            image_type="logo", hash_md5="b4094f9fa6e298a6e25c1dba791868fe"
        )
        new_banner = ProfileimageFactory(
            image_type="banner", hash_md5="0dc41dd9dcbc75e730642dbfb87cd1d5"
        )
        self.profile.logo = new_logo
        self.profile.banner = new_banner
        self.manager.check_for_moderation()
        self.assertEqual(self.profile.status, self.profile.APPROVED)
        self.assertFalse(self.manager.moderation_is_needed)
        self.assertFalse(self.manager.content_deleted)
        self.assertEqual(self.profile.status_updated_at, mock_now.return_value)
        self.assertEqual(self.manager.images, {"banner": None, "logo": None})


class TestApprovedImagesDeleter(APITestCase):
    def setUp(self):
        self.banner = ProfileimageFactory(image_type="banner")
        self.logo = ProfileimageFactory(image_type="logo")
        self.banner_approved = ProfileimageFactory(
            image_type="banner", is_approved=True
        )
        self.logo_approved = ProfileimageFactory(
            image_type="logo", is_approved=True
        )
        self.user = UserFactory(email="test1@test.com")
        self.profile = ProfileStartupFactory.create(
            person=self.user,
            official_name="Test Official Startup",
            phone="380100102034",
            edrpou="99999999",
            banner=self.banner,
            logo=self.logo,
            banner_approved=self.banner_approved,
            logo_approved=self.logo_approved,
        )
        self.deletion_checker = ApprovedImagesDeleter(self.profile)

    # user removes banner from profile
    def test_handle_potential_deletion_banner(self):
        self.profile.banner = None
        self.profile.banner_approved = self.banner
        self.profile.status = self.profile.PENDING
        self.deletion_checker.handle_potential_deletion()
        self.assertTrue(self.profile.banner_approved.is_deleted)

    # user removes logo from profile
    def test_handle_potential_deletion_logo(self):
        self.profile.logo = None
        self.profile.logo_approved = self.logo
        self.profile.status = self.profile.PENDING
        self.deletion_checker.handle_potential_deletion()
        self.assertTrue(self.profile.logo_approved.is_deleted)
