from datetime import timedelta
from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework.authtoken.models import Token

from authentication.models import CustomUser
from .unittest_helper import AnyInt


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

    def test_user_autologout_after_14_days(self):
        self.test_user_token = self.client.post(
            "/api/auth/token/login/",
            data={
                "person_email": "test@test.com",
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
        response = self.client.get("/api/auth/users/me/")
        self.assertEqual(response.status_code,
                         status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(
            {   "detail": "Your session has expired. Please login again."
             }, 
             response.json()
        )

    def test_user_autologout_after_10_days(self):
        self.test_user_token = self.client.post(
            "/api/auth/token/login/",
            data={
                "person_email": "test@test.com",
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
        response = self.client.get("/api/auth/users/me/")
        self.assertEqual(response.status_code,
                         status.HTTP_200_OK)
        self.assertEqual(
            {   "id": AnyInt(), 
                "person_email": "test@test.com", 
                "person_name": "Test", 
                "person_surname": "Test"
            }, 
                response.json()
        )

  