from rest_framework import status
from rest_framework.test import APITestCase

from authentication.factories import UserFactory
from utils.dump_response import dump  # noqa
from utils.unittest_helper import AnyInt


class UserSelfAPITests(APITestCase):
    def setUp(self):
        self.user = UserFactory(
            email="test@test.com",
            name="Test",
            surname="Test",
        )

    def test_user_retreive_data_successful(self):
        self.client.force_authenticate(self.user)
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

    def test_user_retreive_data_not_logged_in(self):
        response = self.client.get(path="/api/auth/users/me/")
        self.assertEqual(response.status_code,
                         status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(
            {
                "detail": "Authentication credentials were not provided."
            },
            response.json()
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
            }
        )
        self.assertEqual(response.status_code,
                         status.HTTP_200_OK)
        self.assertEqual(
            {"id": AnyInt(),
             "email": "test@test.com",
             "name": "Ivan",
             "surname": "Ivanenko"
             },
            response.json()
        )

    def test_user_update_one_field_successful(self):
        self.client.force_authenticate(self.user)
        response = self.client.patch(
            path="/api/auth/users/me/",
            data={
                "surname": "Petrenko",
            }
        )
        self.assertEqual(response.status_code,
                         status.HTTP_200_OK)
        self.assertEqual(
            {"id": AnyInt(),
             "email": "test@test.com",
             "name": "Test",
             "surname": "Petrenko"
             },
            response.json()
        )

    def test_user_delete(self):
        response = self.client.get(
            path="/api/auth/users/me/",
            data={
                "password": "Test1234"
            }
        )
        self.assertEqual(response.status_code,
                         status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(
            {
                "detail": "Authentication credentials were not provided."
            },
            response.json()
        )
