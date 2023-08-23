from rest_framework import status
from rest_framework.test import APITestCase

from authentication.models import CustomUser
from profiles.models import Profile


class UserRegistrationAPITests(APITestCase):
    def setUp(self):
        CustomUser.objects.create_user(
            person_email="test@test.com",
            password="Test1234",
            person_name="Test",
            person_surname="Test",
        )

    def test_register_user_successful(self):
        response = self.client.post(
            "/api/auth/users/", 
            data={
                "person_email": "jane@test.com",
                "password": "Test1234",
                "re_password": "Test1234",
                "person_name": "Jane",
                "person_surname": "Smith",
                "company": {
                    "comp_name": "My Company",
                    "comp_registered": True,
                    "comp_is_startup": False,
                }
            },
            format="json"
        )

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(
            {
                "person_name": "Jane",
                "person_surname": "Smith",
            },
            response.json(),
        )
        self.assertEqual(Profile.objects.get().person.person_email, "jane@test.com")
        self.assertEqual(Profile.objects.get().comp_name, "My Company")


    def test_register_user_email_incorrect(self):
        response = self.client.post(
            "/api/auth/users/", 
            data={
                "person_email": "jane@testcom",
                "password": "Test1234",
                "re_password": "Test1234",
                "person_name": "Jane",
                "person_surname": "Smith",
                "company": {
                    "comp_name": "My Company",
                    "comp_registered": True,
                    "comp_is_startup": False,
                }
            },
            format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(
            {
                "person_email": [
                    "Enter a valid email address."
                ]
            },
            response.json(),
        )

    def test_register_user_email_exists(self):
        response = self.client.post(
            "/api/auth/users/", 
            data={
                "person_email": "test@test.com",
                "password": "Test1234",
                "re_password": "Test1234",
                "person_name": "Test",
                "person_surname": "Test",
                "company": {
                    "comp_name": "Test Company",
                    "comp_registered": True,
                    "comp_is_startup": False,
                }
            },
            format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(
            {
                "person_email": ["Email is already registered"]
            },
            response.json(),
        )

    def test_register_user_password_incorrect(self):
        response = self.client.post(
            "/api/auth/users/", 
            data={
                "person_email": "jane@test.com",
                "password": "test",
                "re_password": "tess",
                "person_name": "Jane",
                "person_surname": "Smith",
                "company": {
                    "comp_name": "My Company",
                    "comp_registered": True,
                    "comp_is_startup": False,
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
            "/api/auth/users/", 
            data={
                "person_email": "jane@test.com",
                "password": "Test1234",
                "re_password": "Test1234",
                "person_name": "Jane",
                "person_surname": "Smith",
                "company": {
                    "comp_name": "My Company",
                    "comp_registered": False,
                    "comp_is_startup": False,
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

    def test_register_user_who_represent_both_choosen(self):
        response = self.client.post(
            "/api/auth/users/", 
            data={
                "person_email": "jane@test.com",
                "password": "Test1234",
                "re_password": "Test1234",
                "person_name": "Jane",
                "person_surname": "Smith",
                "company": {
                    "comp_name": "My Company",
                    "comp_registered": True,
                    "comp_is_startup": True,
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
