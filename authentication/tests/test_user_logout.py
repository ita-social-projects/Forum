from rest_framework import status
from rest_framework.test import APITestCase

from authentication.factories import UserFactory
from utils.dump_response import dump  # noqa


class UserLogoutAPITests(APITestCase):
    def setUp(self):
        self.user = UserFactory(email="test@test.com")

    def test_logout_successful(self):
        self.user.set_password("Test1234")
        self.user.save()

        self.test_user_token = self.client.post(
            path="/api/auth/token/login/",
            data={
                "email": "test@test.com",
                "password": "Test1234",
            }
        ).data["auth_token"]
        self.client.credentials(
            HTTP_AUTHORIZATION=f"Token {self.test_user_token}")
        response = self.client.post(path="/api/auth/token/logout/")
        self.assertEqual(response.status_code,
                         status.HTTP_204_NO_CONTENT)

    def test_logout_not_logged_in(self):
        response = self.client.post(path="/api/auth/token/logout/")
        self.assertEqual(response.status_code,
                         status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(
            {"detail": "Authentication credentials were not provided."}, response.json())
