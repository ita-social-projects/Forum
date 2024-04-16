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
        self.company = AdminProfileFactory()

    def test_get_profiles_not_staff(self):
        self.client.force_authenticate(self.user)
        response = self.client.get(path="/api/admin/profiles/")
        self.assertEqual(status.HTTP_403_FORBIDDEN, response.status_code)

    def test_get_profile_id_not_staff(self):
        self.client.force_authenticate(self.user)
        response = self.client.get(
            path=f"/api/admin/profiles/{self.company.id}/"
        )
        self.assertEqual(status.HTTP_403_FORBIDDEN, response.status_code)


class TestAdminProfilesAPITests(APITestCase):
    def setUp(self):
        self.user = AdminUserFactory()
        self.company = AdminProfileFactory()

    def test_get_profiles_not_authorized(self):
        response = self.client.get(
            path="/api/admin/profiles/?page=1&page_size=1"
        )
        self.assertEqual(status.HTTP_401_UNAUTHORIZED, response.status_code)

    def test_get_profile_id_not_authorized(self):
        response = self.client.get(
            path=f"/api/admin/profiles/{self.company.id}/"
        )
        self.assertEqual(status.HTTP_401_UNAUTHORIZED, response.status_code)

    def test_get_profiles_structure_json(self):
        self.client.force_authenticate(self.user)
        response = self.client.get(path="/api/admin/profiles/")
        auto_data_user = response.json()[0]["person"]
        data = [
            {
                "id": self.company.id,
                "name": self.company.name,
                "is_registered": self.company.is_registered,
                "is_startup": self.company.is_startup,
                "person": {
                    "name": auto_data_user["name"],
                    "surname": auto_data_user["surname"],
                    "email": auto_data_user["email"],
                    "is_active": auto_data_user["is_active"],
                    "is_staff": auto_data_user["is_staff"],
                    "is_superuser": auto_data_user["is_superuser"],
                    "company_name": auto_data_user["company_name"],
                },
                "person_position": self.company.person_position,
                "regions": [],
                "official_name": self.company.official_name,
                "phone": self.company.phone,
                "edrpou": self.company.edrpou,
                "address": self.company.address,
                "is_deleted": self.company.is_deleted,
            }
        ]
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertEqual(data, response.json())

    def test_get_profile_id_authenticated(self):
        self.client.force_authenticate(self.user)
        response = self.client.get(
            path=f"/api/admin/profiles/{self.company.id}/"
        )
        auto_data_user = response.json()["person"]
        data = {
            "name": self.company.name,
            "is_registered": self.company.is_registered,
            "is_startup": self.company.is_startup,
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
            "person_position": self.company.person_position,
            "official_name": self.company.official_name,
            "regions": [],
            "common_info": self.company.common_info,
            "phone": self.company.phone,
            "edrpou": self.company.edrpou,
            "founded": self.company.founded,
            "service_info": self.company.service_info,
            "product_info": self.company.product_info,
            "address": self.company.address,
            "startup_idea": self.company.startup_idea,
            "banner_image": self.company.banner_image,
            "is_deleted": self.company.is_deleted,
        }
        self.assertEqual(data, response.json())


class TestDeleteProfile(APITestCase):
    def setUp(self):
        self.company = AdminProfileFactory()
        self.user = AdminUserFactory()

    def test_delete_Profile(self):
        self.client.force_authenticate(self.user)
        response = self.client.delete(
            path=f"/api/admin/profiles/{self.company.id}/"
        )
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_delete_profile_not_authorized(self):
        response = self.client.delete(
            path=f"/api/admin/profiles/{self.company.id}/"
        )
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class TestPutProfile(APITestCase):
    def setUp(self):
        self.company = AdminProfileFactory()
        self.user = AdminUserFactory()


class TestPatchProfile(APITestCase):
    def setUp(self):
        self.company = AdminProfileFactory()
        self.user = AdminUserFactory()
