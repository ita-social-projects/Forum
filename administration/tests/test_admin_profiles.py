from rest_framework import status
from rest_framework.test import APITestCase

from administration.factories import (
    AdminUserFactory,
    AdminProfileFactory,
)

from utils.dump_response import dump  # noqa


class TestAdminProfilesAPITestsNotStaff(APITestCase):
    def setUp(self):
        self.user = AdminUserFactory(
            is_staff=False,
            is_active=True,
        )
        self.profile = AdminProfileFactory()

    def test_get_profiles_not_staff(self):
        self.client.force_authenticate(self.user)
        response = self.client.get(path="/api/admin/profiles/")
        self.assertEqual(status.HTTP_403_FORBIDDEN, response.status_code)

    def test_get_profile_id_not_staff(self):
        self.client.force_authenticate(self.user)
        response = self.client.get(
            path=f"/api/admin/profiles/{self.profile.id}/"
        )
        self.assertEqual(status.HTTP_403_FORBIDDEN, response.status_code)


class TestAdminProfilesAPITests(APITestCase):
    def setUp(self):
        self.user = AdminUserFactory()
        self.profile = AdminProfileFactory()

    def test_get_profiles_not_authorized(self):
        response = self.client.get(
            path="/api/admin/profiles/?page=1&page_size=1"
        )
        self.assertEqual(status.HTTP_401_UNAUTHORIZED, response.status_code)

    def test_get_profile_id_not_authorized(self):
        response = self.client.get(
            path=f"/api/admin/profiles/{self.profile.id}/"
        )
        self.assertEqual(status.HTTP_401_UNAUTHORIZED, response.status_code)

    def test_get_profiles_structure_json(self):
        self.client.force_authenticate(self.user)
        response = self.client.get(path="/api/admin/profiles/")
        auto_data_user = response.json()[0]["person"]
        data = [
            {
                "id": self.profile.id,
                "name": self.profile.name,
                "is_registered": self.profile.is_registered,
                "is_startup": self.profile.is_startup,
                "person": {
                    "name": auto_data_user["name"],
                    "surname": auto_data_user["surname"],
                    "email": auto_data_user["email"],
                    "is_active": auto_data_user["is_active"],
                    "is_staff": auto_data_user["is_staff"],
                    "is_superuser": auto_data_user["is_superuser"],
                    "company_name": auto_data_user["company_name"],
                },
                "person_position": self.profile.person_position,
                "regions": [],
                "official_name": self.profile.official_name,
                "phone": self.profile.phone,
                "edrpou": self.profile.edrpou,
                "address": self.profile.address,
                "is_deleted": self.profile.is_deleted,
            }
        ]
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertEqual(data, response.json())

    def test_get_profile_id_authenticated(self):
        self.client.force_authenticate(self.user)
        response = self.client.get(
            path=f"/api/admin/profiles/{self.profile.id}/"
        )
        auto_data_user = response.json()["person"]
        data = {
            "name": self.profile.name,
            "is_registered": self.profile.is_registered,
            "is_startup": self.profile.is_startup,
            "categories": [],
            "activities": [],
            "person": {
                "name": auto_data_user["name"],
                "surname": auto_data_user["surname"],
                "email": auto_data_user["email"],
                "is_active": auto_data_user["is_active"],
                "is_staff": auto_data_user["is_staff"],
                "is_superuser": auto_data_user["is_superuser"],
                "company_name": auto_data_user["company_name"],
            },
            "person_position": self.profile.person_position,
            "official_name": self.profile.official_name,
            "regions": [],
            "common_info": self.profile.common_info,
            "phone": self.profile.phone,
            "edrpou": self.profile.edrpou,
            "founded": self.profile.founded,
            "service_info": self.profile.service_info,
            "product_info": self.profile.product_info,
            "address": self.profile.address,
            "startup_idea": self.profile.startup_idea,
            "banner_image": self.profile.banner_image,
            "is_deleted": self.profile.is_deleted,
        }
        self.assertEqual(data, response.json())


class TestDeleteProfile(APITestCase):
    def setUp(self):
        self.profile = AdminProfileFactory()
        self.user = AdminUserFactory()

    def test_delete_Profile(self):
        self.client.force_authenticate(self.user)
        response = self.client.delete(
            path=f"/api/admin/profiles/{self.profile.id}/"
        )
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_delete_profile_not_authorized(self):
        response = self.client.delete(
            path=f"/api/admin/profiles/{self.profile.id}/"
        )
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class TestPutProfile(APITestCase):
    def setUp(self):
        self.profile = AdminProfileFactory()
        self.user = AdminUserFactory()


class TestPatchProfile(APITestCase):
    def setUp(self):
        self.profile = AdminProfileFactory()
        self.user = AdminUserFactory()

    def test_update_Profile(self):
        self.client.force_authenticate(self.user)
        data = {
            "name": "Test string",
            "is_registered": True,
            "is_startup": True,
            "person_position": "Test string",
            "official_name": "Test string",
            "common_info": "Test string",
            "phone": 123456789012,
            "edrpou": 12345678,
            "founded": 2024,
            "service_info": "Test string",
            "product_info": "Test string",
            "address": "Test string",
            "startup_idea": "Test string",
            "is_deleted": True,
        }
        response = self.client.patch(
            path=f"/api/admin/profiles/{self.profile.id}/",
            data=data,
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_Reverese_Bool_Profile(self):
        self.client.force_authenticate(self.user)
        data = {
            "name": "Test string",
            "is_registered": False,
            "is_startup": False,
            "person_position": "Test string",
            "official_name": "Test string",
            "common_info": "Test string",
            "phone": 123456789012,
            "edrpou": 12345678,
            "founded": 2024,
            "service_info": "Test string",
            "product_info": "Test string",
            "address": "Test string",
            "startup_idea": "Test string",
            "is_deleted": False,
        }
        response = self.client.patch(
            path=f"/api/admin/profiles/{self.profile.id}/",
            data=data,
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_Profile_Not_authorized(self):
        data = {"name": "Test string", "is_deleted": True}
        response = self.client.patch(
            path=f"/api/admin/profiles/{self.profile.id}/",
            data=data,
        )
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
