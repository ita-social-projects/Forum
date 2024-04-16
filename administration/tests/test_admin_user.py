from rest_framework import status
from rest_framework.test import APITestCase

from administration.factories import AdminUserFactory, AdminProfileFactory
from utils.dump_response import dump  # noqa


class TestAdminUsersAPITestsNotStaff(APITestCase):
    def setUp(self):
        self.user = AdminUserFactory(
            is_staff=False,
            is_active=True,
        )

    def test_get_users_not_staff(self):
        self.client.force_authenticate(self.user)
        response = self.client.get(path="/api/admin/users/?page=1&page_size=1")
        self.assertEqual(status.HTTP_403_FORBIDDEN, response.status_code)

    def test_get_user_id_not_staff(self):
        self.client.force_authenticate(self.user)
        response = self.client.get(path=f"/api/admin/users/{self.user.id}/")
        self.assertEqual(status.HTTP_403_FORBIDDEN, response.status_code)


class TestAdminUsersAPITests(APITestCase):
    def setUp(self):
        self.user = AdminUserFactory()

    def test_get_users_not_authorized(self):
        response = self.client.get(path="/api/admin/users/?page=1&page_size=1")
        self.assertEqual(status.HTTP_401_UNAUTHORIZED, response.status_code)

    def test_get_user_id_not_authorized(self):
        response = self.client.get(path=f"/api/admin/users/{self.user.id}/")
        self.assertEqual(status.HTTP_401_UNAUTHORIZED, response.status_code)

    def test_get_users_authenticated_structure_json(self):
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

    def test_get_user_id_authenticated_structure_json(self):
        self.client.force_authenticate(self.user)
        response = self.client.get(path=f"/api/admin/users/{self.user.id}/")

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


class TestDeleteUser(APITestCase):
    def test_delete_user_with_company(self):
        self.user = AdminUserFactory()
        self.client.force_authenticate(self.user)
        self.company = AdminProfileFactory(person_id=self.user.id)
        response = self.client.delete(path=f"/api/admin/users/{self.user.id}/")
        self.assertEqual(
            response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED
        )

    def test_delete_user_no_company(self):
        self.user = AdminUserFactory()
        self.client.force_authenticate(self.user)
        response = self.client.delete(path=f"/api/admin/users/{self.user.id}/")
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_delete_user_with_company_not_authorized(self):
        self.user = AdminUserFactory()
        self.company = AdminProfileFactory(person_id=self.user.id)
        response = self.client.delete(path=f"/api/admin/users/{self.user.id}/")
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_delete_user_no_company_not_authorized(self):
        self.user = AdminUserFactory()
        response = self.client.delete(path=f"/api/admin/users/{self.user.id}/")
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class TestPutUser(APITestCase):
    def setUp(self):
        self.company = AdminProfileFactory()
        self.user = AdminUserFactory()


class TestPatchUser(APITestCase):
    def setUp(self):
        self.company = AdminProfileFactory()
        self.user = AdminUserFactory()
