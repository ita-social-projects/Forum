from rest_framework import status
from rest_framework.test import APITestCase

from authentication.factories import UserFactory
from utils.dump_response import dump  # noqa
from utils.unittest_helper import AnyStr


class UserLoginAPITests(APITestCase):
    def setUp(self):
        self.user = UserFactory(email="test@test.com")

    def test_login_successful(self):
        self.user.set_password("Test1234")
        self.user.save()

        response = self.client.post(
            path="/api/auth/token/login/",
            data={
                "email": "test@test.com",
                "password": "Test1234",
            }
        )
        self.assertEqual(response.status_code,
                         status.HTTP_200_OK)
        self.assertEqual(
            {
                "auth_token": AnyStr()
            },
            response.json()
        )
        self.assertContains(response, "auth_token")

    def test_login_email_incorrect(self):
        self.user.set_password("Test1234")
        self.user.save()

        response = self.client.post(
            path="/api/auth/token/login/",
            data={
                "email": "tost@test.com",
                "password": "Test1234",
            }
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(
            {
                "error": [
                    "Email or password is incorrect"
                ]
            },
            response.json(),
        )

    def test_login_password_incorrect(self):
        self.user.set_password("Test1234")
        self.user.save()

        response = self.client.post(
            path="/api/auth/token/login/",
            data={
                "email": "test@test.com",
                "password": "Test5678",
            }
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(
            {
                "error": [
                    "Email or password is incorrect"
                ]
            },
            response.json(),
        )
