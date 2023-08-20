from rest_framework import status
from rest_framework.test import APITestCase

from authentication.models import CustomUser


class UserLoginAPITests(APITestCase):

    @classmethod
    def setUpTestData(cls):
        test_user = CustomUser.objects.create_user(
            person_email="test@test.com",
            password="Test1234",
            person_name="Test",
            person_surname="Test",
        )
        test_user.is_active = True
        test_user.save()

    def test_login_successful(self):
        url = "/api/auth/token/login/"
        data = {
            "person_email": "test@test.com",
            "password": "Test1234",
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code,
                         status.HTTP_200_OK)
        self.assertContains(response, "auth_token")

    def test_login_email_incorrect(self):
        url = "/api/auth/token/login/"
        data = {
            "person_email": "tost@test.com",
            "password": "Test1234",
        }
        response = self.client.post(url, data)

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
        url = "/api/auth/token/login/"
        data = {
            "person_email": "test@test.com",
            "password": "Test5678",
        }
        response = self.client.post(url, data)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(
            {
                "error": [
                    "Email or password is incorrect"
                ]
            },
            response.json(),
        )
