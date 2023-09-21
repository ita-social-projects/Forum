from rest_framework import status
from rest_framework.test import APITestCase

from authentication.factories import UserFactory
from profiles.models import Profile
from utils.dump_response import dump  # noqa


class UserRegistrationAPITests(APITestCase):
    def setUp(self):
        self.user = UserFactory(email="test@test.com")

    def test_register_user_successful(self):
        response = self.client.post(
            path="/api/auth/users/",
            data={
                "email": "jane@test.com",
                "password": "Test1234",
                "re_password": "Test1234",
                "name": "Jane",
                "surname": "Smith",
                "company": {
                    "name": "My Company",
                    "is_registered": True,
                    "is_startup": False,
                }
            },
            format="json"
        )

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(
            {
                "name": "Jane",
                "surname": "Smith",
            },
            response.json(),
        )
        self.assertEqual(Profile.objects.get().person.email, "jane@test.com")
        self.assertEqual(Profile.objects.get().name, "My Company")

    def test_register_user_email_incorrect(self):
        response = self.client.post(
            path="/api/auth/users/",
            data={
                "email": "jane@testcom",
                "password": "Test1234",
                "re_password": "Test1234",
                "name": "Jane",
                "surname": "Smith",
                "company": {
                    "name": "My Company",
                    "is_registered": True,
                    "is_startup": False,
                }
            },
            format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(
            {
                "email": [
                    "Enter a valid email address."
                ]
            },
            response.json(),
        )

    def test_register_user_email_exists(self):
        response = self.client.post(
            path="/api/auth/users/",
            data={
                "email": "test@test.com",
                "password": "Test1234",
                "re_password": "Test1234",
                "name": "Test",
                "surname": "Test",
                "company": {
                    "name": "Test Company",
                    "is_registered": True,
                    "is_startup": False,
                }
            },
            format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(
            {
                "email": ["Email is already registered"]
            },
            response.json(),
        )

    def test_register_user_password_incorrect(self):
        response = self.client.post(
            path="/api/auth/users/",
            data={
                "email": "jane@test.com",
                "password": "test",
                "re_password": "tess",
                "name": "Jane",
                "surname": "Smith",
                "company": {
                    "name": "My Company",
                    "is_registered": True,
                    "is_startup": False,
                }
            },
            format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(
            {
                "password": [
                    "Password must be at least 8 characters long.",
                    "Password must include at least one uppercase letter (A-Z), one lowercase letter (a-z) and one digit (0-9).",
                    "Passwords don't match."
                ]
            },
            response.json(),
        )

    def test_register_user_who_represent_empty_fields(self):
        response = self.client.post(
            path="/api/auth/users/",
            data={
                "email": "jane@test.com",
                "password": "Test1234",
                "re_password": "Test1234",
                "name": "Jane",
                "surname": "Smith",
                "company": {
                    "name": "My Company",
                    "is_registered": False,
                    "is_startup": False,
                }
            },
            format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(
            {
                "comp_status": ["Please choose who you represent."]
            },
            response.json(),
        )

    def test_register_user_who_represent_both_chosen(self):
        response = self.client.post(
            path="/api/auth/users/",
            data={
                "email": "jane@test.com",
                "password": "Test1234",
                "re_password": "Test1234",
                "name": "Jane",
                "surname": "Smith",
                "company": {
                    "name": "My Company",
                    "is_registered": True,
                    "is_startup": True,
                }
            },
            format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(
            {
                "comp_status": ["Please choose either registered or startup."]
            },
            response.json(),
        )
