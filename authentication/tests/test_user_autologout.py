from datetime import timedelta

from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase

from authentication.factories import UserFactory
from utils.dump_response import dump  # noqa
from utils.unittest_helper import AnyInt


class UserLogoutAPITests(APITestCase):
    def setUp(self):
        self.user = UserFactory(
            email="test@test.com",
            name="Test",
            surname="Test")

    def test_user_autologout_after_14_days(self):
        self.user.set_password("Test1234")
        self.user.save()

        self.test_user_token = self.client.post(
            path="/api/auth/token/login/",
            data={
                "email": "test@test.com",
                "password": "Test1234",
            }
        ).data["auth_token"]
        token = Token.objects.get(
            key=self.test_user_token
        )
        token.created -= timedelta(days=15)
        token.save()
        self.client.credentials(
            HTTP_AUTHORIZATION=f"Token {self.test_user_token}")
        response = self.client.get(path="/api/auth/users/me/")
        self.assertEqual(response.status_code,
                         status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(
            {"detail": "Your session has expired. Please login again."
             },
            response.json()
        )

    def test_user_autologout_after_10_days(self):
        self.user.set_password("Test1234")
        self.user.save()

        self.test_user_token = self.client.post(
            path="/api/auth/token/login/",
            data={
                "email": "test@test.com",
                "password": "Test1234",
            }
        ).data["auth_token"]
        token = Token.objects.get(
            key=self.test_user_token
        )
        token.created -= timedelta(days=10)
        token.save()
        self.client.credentials(
            HTTP_AUTHORIZATION=f"Token {self.test_user_token}")
        response = self.client.get(path="/api/auth/users/me/")
        self.assertEqual(response.status_code,
                         status.HTTP_200_OK)
        self.assertEqual(
            {"id": AnyInt(),
             "email": "test@test.com",
             "name": "Test",
             "surname": "Test"
             },
            response.json()
        )
