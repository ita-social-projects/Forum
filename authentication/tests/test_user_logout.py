from rest_framework import status
from rest_framework.test import APITestCase

from authentication.models import CustomUser


class UserLogoutAPITests(APITestCase):
    def setUp(self):
        self.test_user = CustomUser.objects.create_user(
            person_email="test@test.com",
            password="Test1234",
            person_name="Test",
            person_surname="Test",
        )
        self.test_user.is_active = True
        self.test_user.save()

    def test_logout_successful(self):
        self.test_user_token = self.client.post(
            "/api/auth/token/login/",
            data={
                "person_email": "test@test.com",
                "password": "Test1234",
            }
        ).data["auth_token"]
        self.client.credentials(
            HTTP_AUTHORIZATION=f"Token {self.test_user_token}")
        response = self.client.post("/api/auth/token/logout/")
        self.assertEqual(response.status_code,
                         status.HTTP_204_NO_CONTENT)

    def test_logout_not_logged_in(self):
        response = self.client.post("/api/auth/token/logout/")
        self.assertEqual(response.status_code,
                         status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(
            {"detail": "Authentication credentials were not provided."}, response.json())