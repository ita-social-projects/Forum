from rest_framework import status
from rest_framework.test import APITestCase

from authentication.models import CustomUser
from .unittest_helper import AnyStr


class UserLoginAPITests(APITestCase):
    def setUp(self):
        self.test_user = CustomUser.objects.create_user(
            person_email="test@test.com",
            password="Test1234",
            person_name="Test",
            person_surname="Test",
            is_active = True
        )

    def test_login_successful(self):
        response = self.client.post(
            "/api/auth/token/login/",
            data={
                "person_email": "test@test.com",
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
        response = self.client.post(
            "/api/auth/token/login/",
            data={
                "person_email": "tost@test.com",
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
        response = self.client.post(
            "/api/auth/token/login/",
            data={
                "person_email": "test@test.com",
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
