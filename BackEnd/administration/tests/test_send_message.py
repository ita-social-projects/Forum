from django.core import mail
from django.conf import settings
from rest_framework import status
from rest_framework.test import APITestCase
from authentication.factories import UserFactory
from utils.administration.send_email_notification import send_email_to_user


class TestSendMessageView(APITestCase):
    def setUp(self):
        self.admin = UserFactory(is_staff=True, is_active=True)
        self.user = UserFactory(is_active=True)
        self.client.force_authenticate(self.admin)
        self.url = f"/api/admin/users/{self.user.id}/send_message/"

    def test_send_message_success(self):
        data = {
            "email": self.user.email,
            "category": "Інше",
            "message": "Valid message for testing.",
        }
        response = self.client.post(self.url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_send_message_invalid_data(self):
        data = {
            "email": self.user.email,
            "category": "Iнше",
            "message": "Short",
        }
        response = self.client.post(self.url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_send_message_unauthorized(self):
        self.client.logout()
        data = {
            "email": self.user.email,
            "category": "Інше",
            "message": "Valid message for testing.",
        }
        response = self.client.post(self.url, data)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_send_message_user_not_found(self):
        url = "/api/admin/users/9999/send_message/"
        data = {
            "email": "nonexistent@test.com",
            "category": "Інше",
            "message": "Valid message for testing.",
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


class TestSendEmailFunctionality(APITestCase):
    def setUp(self):
        self.user = UserFactory(
            name="Test", surname="User", email="test_user@example.com"
        )

    def send_email(self, category, message_content, email=None):
        email = email if email else self.user.email
        return send_email_to_user(
            user=self.user,
            category=category,
            message_content=message_content,
            email=email,
        )

    def test_send_email_success(self):
        self.send_email(
            category="Інше",
            message_content="This is a test message.",
            email="test_user@example.com",
        )

        self.assertEqual(len(mail.outbox), 1)
        email = mail.outbox[0]
        self.assertEqual(email.subject, "Адміністратор CraftMerge - Інше")
        self.assertIn("This is a test message.", email.body)
        self.assertEqual(email.to, ["test_user@example.com"])
        self.assertEqual(email.from_email, settings.EMAIL_HOST_USER)

    def test_send_email_empty_message(self):
        with self.assertRaises(ValueError) as e:
            self.send_email(
                category="Інше",
                message_content="",
                email="test_user@example.com",
            )
        self.assertEqual(str(e.exception), "Message content cannot be empty.")

    def test_send_email_invalid_email(self):
        with self.assertRaises(ValueError) as e:
            self.send_email(
                category="Інше",
                message_content="Test message",
                email="invalid_email",
            )
        self.assertEqual(str(e.exception), "Invalid email address.")

    def test_send_email_missing_category(self):
        with self.assertRaises(ValueError) as e:
            self.send_email(
                category="",
                message_content="Test message",
                email="test_user@example.com",
            )
        self.assertEqual(str(e.exception), "Category is required.")
