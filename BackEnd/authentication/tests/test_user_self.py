from rest_framework import status
from rest_framework.test import APITestCase

from authentication.factories import UserFactory
from profiles.factories import ProfileCompanyFactory
from utils.dump_response import dump  # noqa
from utils.unittest_helper import AnyInt


class UserSelfAPITests(APITestCase):
    def setUp(self):
        self.user = UserFactory(
            email="test@test.com",
            name="Test",
            surname="Test",
        )
        self.profile = ProfileCompanyFactory.create(
            person=self.user,
            official_name="Test Official Startup",
        )

    def test_user_retreive_data_successful(self):
        self.client.force_authenticate(self.user)
        response = self.client.get(path="/api/auth/users/me/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(
            {
                "id": AnyInt(),
                "email": "test@test.com",
                "name": "Test",
                "surname": "Test",
                "profile_id": AnyInt(),
                "is_staff": False,
                "is_superuser": False,
            },
            response.json(),
        )

    def test_user_retreive_data_not_logged_in(self):
        response = self.client.get(path="/api/auth/users/me/")
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(
            {"detail": "Authentication credentials were not provided."},
            response.json(),
        )

    def test_user_update_all_fields_successful(self):
        self.client.force_authenticate(self.user)
        response = self.client.put(
            path="/api/auth/users/me/",
            data={
                "id": AnyInt(),
                "email": "test@test.com",
                "name": "Ivan",
                "surname": "Ivanenko",
                "profile_id": AnyInt(),
                "is_staff": False,
                "is_superuser": False,
            },
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(
            {
                "id": AnyInt(),
                "email": "test@test.com",
                "name": "Ivan",
                "surname": "Ivanenko",
                "profile_id": AnyInt(),
                "is_staff": False,
                "is_superuser": False,
            },
            response.json(),
        )

    def test_user_update_one_field_successful(self):
        self.client.force_authenticate(self.user)
        response = self.client.patch(
            path="/api/auth/users/me/",
            data={
                "surname": "Petrenko",
            },
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(
            {
                "id": AnyInt(),
                "email": "test@test.com",
                "name": "Test",
                "surname": "Petrenko",
                "profile_id": AnyInt(),
                "is_staff": False,
                "is_superuser": False,
            },
            response.json(),
        )

    def test_user_delete(self):
        response = self.client.get(
            path="/api/auth/users/me/", data={"password": "Test1234"}
        )
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(
            {"detail": "Authentication credentials were not provided."},
            response.json(),
        )
