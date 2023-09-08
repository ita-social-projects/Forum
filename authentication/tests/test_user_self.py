from rest_framework import status
from rest_framework.test import APITestCase

from authentication.factories import UserFactory
from utils.unittest_helper import AnyInt
from utils.dump_response import dump # noqa


class UserSelfAPITests(APITestCase):
    def setUp(self):
        self.user = UserFactory(
            person_email="test@test.com",
            person_name="Test",
            person_surname="Test",
        )

    def test_user_retreive_data_successful(self):
        self.client.force_authenticate(self.user)
        response = self.client.get(path="/api/auth/users/me/")
        self.assertEqual(response.status_code,
                         status.HTTP_200_OK)
        self.assertEqual(
            {"id": AnyInt(),
             "person_email": "test@test.com",
             "person_name": "Test",
             "person_surname": "Test"
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
                "person_email": "test@test.com",
                "person_name": "Ivan",
                "person_surname": "Ivanenko",
            }
        )
        self.assertEqual(response.status_code,
                         status.HTTP_200_OK)
        self.assertEqual(
            {"id": AnyInt(),
             "person_email": "test@test.com",
             "person_name": "Ivan",
             "person_surname": "Ivanenko"
             },
            response.json()
        )

    def test_user_update_one_field_successful(self):
        self.client.force_authenticate(self.user)
        response = self.client.patch(
            path="/api/auth/users/me/",
            data={
                "person_surname": "Petrenko",
            }
        )
        self.assertEqual(response.status_code,
                         status.HTTP_200_OK)
        self.assertEqual(
            {"id": AnyInt(),
             "person_email": "test@test.com",
             "person_name": "Test",
             "person_surname": "Petrenko"
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
