from rest_framework import status
from rest_framework.test import APITestCase

from administration.factories import (
    AdminUserFactory,
    AdminProfileFactory,
)

from utils.dump_response import dump  # noqa


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
            path="/api/admin/profiles/" + str(self.user.id) + "/"
        )
        self.assertEqual(status.HTTP_401_UNAUTHORIZED, response.status_code)

    def test_get_profiles(self):
        self.client.force_authenticate(self.user)
        response = self.client.get(path="/api/admin/profiles/")
        data = [
            {
                "id": self.company.id,
                "name": self.company.name,
                "is_registered": self.company.is_registered,
                "is_startup": self.company.is_startup,
                "person": {
                    "name": "Test person 6",
                    "surname": "Test person 6 surname",
                    "email": "test6@test.com",
                    "is_active": self.user.is_active,
                    "is_staff": True,
                    "is_superuser": self.user.is_superuser,
                    "company_name": True,
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

    def test_get_profile_id(self):
        self.client.force_authenticate(self.user)
        response = self.client.get(
            path="/api/admin/profiles/" + str(self.company.id) + "/"
        )
        data = {
            "name": self.company.name,
            "is_registered": self.company.is_registered,
            "is_startup": self.company.is_startup,
            "categories": [],
            "activities": [],
            "person": {
                "name": "Test person 2",
                "surname": "Test person 2 surname",
                "email": "test2@test.com",
                "is_active": True,
                "is_staff": True,
                "is_superuser": self.user.is_superuser,
                "company_name": True,
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
