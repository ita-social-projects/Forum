from rest_framework import status
from rest_framework.test import APITestCase

from administration.factories import AdminUserFactory
from utils.dump_response import dump  # noqa


class TestAdminUsersAPITests(APITestCase):
    def setUp(self):
        self.user = AdminUserFactory()

    def test_get_users_not_authorized(self):
        response = self.client.get(path="/api/admin/users/?page=1&page_size=1")
        self.assertEqual(status.HTTP_401_UNAUTHORIZED, response.status_code)

    def test_get_user_id_not_authorized(self):
        response = self.client.get(
            path="/api/admin/users/" + str(self.user.id) + "/"
        )
        self.assertEqual(status.HTTP_401_UNAUTHORIZED, response.status_code)

    def test_get_users_structure_json(self):
        self.client.force_authenticate(self.user)
        response = self.client.get(path="/api/admin/users/")

        data = [
            {
                "id": self.user.id,
                "email": self.user.email,
                "name": self.user.name,
                "surname": self.user.surname,
            }
        ]

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(data, response.json())

    def test_get_user_id_structure_json(self):
        self.client.force_authenticate(self.user)
        response = self.client.get(
            path="/api/admin/users/" + str(self.user.id) + "/"
        )

        data = {
            "name": self.user.name,
            "surname": self.user.surname,
            "email": self.user.email,
            "is_active": self.user.is_active,
            "is_staff": self.user.is_staff,
            "is_superuser": self.user.is_superuser,
            "company_name": response.json()["company_name"],
        }

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(data, response.json())
