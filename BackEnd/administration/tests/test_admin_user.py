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


class TestAdminUsersListAPITests(APITestCase):
    def setUp(self):
        self.users = AdminUserFactory.create_batch(2)
        self.user = self.users[0]

    def test_get_users_sort_desc(self):
        self.client.force_authenticate(self.user)
        response = self.client.get(
            path="/api/admin/users/?sort=id&direction=desc"
        )
        data = [
            {
                "id": 47,
                "email": "test47@test.com",
                "name": "Test person 47",
                "surname": "Test person 47 surname",
                "status": {
                    "is_active": True,
                    "is_staff": True,
                    "is_superuser": False,
                    "is_deleted": False,
                },
                "company_name": "No profile",
                "registration_date": "No profile",
            },
            {
                "id": 46,
                "email": "test46@test.com",
                "name": "Test person 46",
                "surname": "Test person 46 surname",
                "status": {
                    "is_active": True,
                    "is_staff": True,
                    "is_superuser": False,
                    "is_deleted": False,
                },
                "company_name": "No profile",
                "registration_date": "No profile",
            },
        ]
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(data, response.json())

    def test_get_users_sort_asc(self):
        self.client.force_authenticate(self.user)
        response = self.client.get(
            path="/api/admin/users/?sort=id&direction=asc"
        )
        data = [
            {
                "id": 44,
                "email": "test44@test.com",
                "name": "Test person 44",
                "surname": "Test person 44 surname",
                "status": {
                    "is_active": True,
                    "is_staff": True,
                    "is_superuser": False,
                    "is_deleted": False,
                },
                "company_name": "No profile",
                "registration_date": "No profile",
            },
            {
                "id": 45,
                "email": "test45@test.com",
                "name": "Test person 45",
                "surname": "Test person 45 surname",
                "status": {
                    "is_active": True,
                    "is_staff": True,
                    "is_superuser": False,
                    "is_deleted": False,
                },
                "company_name": "No profile",
                "registration_date": "No profile",
            },
        ]
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(data, response.json())


class TestAdminUsersAPITests(APITestCase):
    def setUp(self):
        self.user = AdminUserFactory()

    def test_get_users_not_authorized(self):
        response = self.client.get(path="/api/admin/users/?page=1&page_size=1")
        self.assertEqual(status.HTTP_401_UNAUTHORIZED, response.status_code)

    def test_get_user_id_not_authorized(self):
        response = self.client.get(path=f"/api/admin/users/{self.user.id}/")
        self.assertEqual(status.HTTP_401_UNAUTHORIZED, response.status_code)

    def test_get_users_authenticated(self):
        self.client.force_authenticate(self.user)
        response = self.client.get(path="/api/admin/users/")
        data = [
            {
                "id": 39,
                "email": "test39@test.com",
                "name": "Test person 39",
                "surname": "Test person 39 surname",
                "status": {
                    "is_active": True,
                    "is_staff": True,
                    "is_superuser": False,
                    "is_deleted": False,
                },
                "company_name": "No profile",
                "registration_date": "No profile",
            }
        ]
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(data, response.json())

    def test_get_users_filter(self):
        self.client.force_authenticate(self.user)
        response = self.client.get(
            path="/api/admin/users/?sort=id&direction=asc"
        )
        data = [
            {
                "id": 40,
                "email": "test40@test.com",
                "name": "Test person 40",
                "surname": "Test person 40 surname",
                "status": {
                    "is_active": True,
                    "is_staff": True,
                    "is_superuser": False,
                    "is_deleted": False,
                },
                "company_name": "No profile",
                "registration_date": "No profile",
            }
        ]
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(data, response.json())

    def test_get_user_id_authenticated(self):
        self.client.force_authenticate(self.user)
        response = self.client.get(path=f"/api/admin/users/{self.user.id}/")

        data = {
            "name": "Test person 37",
            "surname": "Test person 37 surname",
            "email": "test37@test.com",
            "is_active": True,
            "is_staff": True,
            "is_superuser": False,
            "company_name": False,
        }
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(data, response.json())


class TestDeleteUser(APITestCase):
    def test_delete_user_with_company(self):
        self.user = AdminUserFactory()
        self.client.force_authenticate(self.user)
        self.profile = AdminProfileFactory(person_id=self.user.id)
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
        self.profile = AdminProfileFactory(person_id=self.user.id)
        response = self.client.delete(path=f"/api/admin/users/{self.user.id}/")
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_delete_user_no_company_not_authorized(self):
        self.user = AdminUserFactory()
        response = self.client.delete(path=f"/api/admin/users/{self.user.id}/")
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class TestPutUser(APITestCase):
    def setUp(self):
        self.user = AdminUserFactory()

    def test_put_user(self):
        self.client.force_authenticate(self.user)
        data = {
            "name": "string",
            "surname": "string",
            "email": "user@example.com",
            "is_active": True,
            "is_staff": True,
            "is_superuser": True,
        }
        response = self.client.put(
            path=f"/api/admin/users/{self.user.id}/",
            data=data,
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_put_reverese_bool_user(self):
        self.client.force_authenticate(self.user)
        data = {
            "name": "string",
            "surname": "string",
            "email": "user@example.com",
            "is_active": False,
            "is_staff": False,
            "is_superuser": False,
        }
        response = self.client.put(
            path=f"/api/admin/users/{self.user.id}/",
            data=data,
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_put_user_not_authorized(self):
        data = {"name": "Test string"}
        response = self.client.put(
            path=f"/api/admin/users/{self.user.id}/",
            data=data,
        )
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_put_user_not_exist(self):
        data = {"name": "Test string"}
        self.client.force_authenticate(self.user)
        response = self.client.put(
            path=f"/api/admin/users/0/",
            data=data,
        )
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


class TestPatchUser(APITestCase):
    def setUp(self):
        self.user = AdminUserFactory()

    def test_patch_user(self):
        self.client.force_authenticate(self.user)
        data = {
            "name": "string",
            "surname": "string",
            "email": "user@example.com",
            "is_active": True,
            "is_staff": True,
            "is_superuser": True,
        }
        response = self.client.patch(
            path=f"/api/admin/users/{self.user.id}/",
            data=data,
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_patch_change_role_user(self):
        self.client.force_authenticate(self.user)
        data = {
            "name": "string",
            "surname": "string",
            "email": "user@example.com",
            "is_active": False,
            "is_staff": False,
            "is_superuser": False,
        }
        response = self.client.patch(
            path=f"/api/admin/users/{self.user.id}/",
            data=data,
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_patch_user_not_authorized(self):
        data = {"name": "Test string"}
        response = self.client.patch(
            path=f"/api/admin/users/{self.user.id}/",
            data=data,
        )
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_patch_user_not_exist(self):
        data = {"name": "Test string"}
        self.client.force_authenticate(self.user)
        response = self.client.patch(
            path=f"/api/admin/users/0/",
            data=data,
        )
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


class TestPostUser(APITestCase):
    def setUp(self):
        self.user = AdminUserFactory()

    def test_create_user_authorized_full_data(self):
        new_user_data = {
            "name": "string",
            "surname": "string",
            "email": "user@example.com",
            "is_active": False,
            "is_staff": False,
            "is_superuser": False,
        }

        self.client.force_authenticate(self.user)
        response = self.client.post(
            path=f"/api/admin/users/", data=new_user_data
        )
        self.assertEqual(
            status.HTTP_405_METHOD_NOT_ALLOWED, response.status_code
        )

    def test_create_user_not_authorized_full_data(self):
        new_user_data = {
            "name": "string",
            "surname": "string",
            "email": "user@example.com",
            "is_active": False,
            "is_staff": False,
            "is_superuser": False,
        }
        response = self.client.post(
            path=f"/api/admin/users/", data=new_user_data
        )
        self.assertEqual(status.HTTP_401_UNAUTHORIZED, response.status_code)
