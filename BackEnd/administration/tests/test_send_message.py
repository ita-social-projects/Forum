from rest_framework import status
from rest_framework.test import APITestCase
from authentication.factories import UserFactory


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
