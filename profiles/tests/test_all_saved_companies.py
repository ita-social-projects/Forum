from rest_framework import status
from rest_framework.test import APITestCase

from authentication.models import CustomUser
from profiles.models import Profile, SavedCompany


class TestAllSavedCompaniesListAPIView(APITestCase):
    def setUp(self) -> None:
        self.user = CustomUser.objects.create_user(
            person_email="test1@test.com",
            person_name="test",
            person_surname="test",
            is_active=True)
        self.profile = Profile.objects.create(
            person=self.user,
            comp_name="Company 1",
            comp_is_startup=True,
            comp_registered=False
        )

        self.user2 = CustomUser.objects.create_user(
            person_email="test2@test.com",
            person_name="test",
            person_surname="test",
            is_active=True)
        self.profile2 = Profile.objects.create(
            person=self.user2,
            comp_name="Company 2",
            comp_is_startup=True,
            comp_registered=False
        )

        self.user3 = CustomUser.objects.create_user(
            person_email="test3@test.com",
            person_name="test",
            person_surname="test",
            is_active=True)
        self.profile3 = Profile.objects.create(
            person=self.user3,
            comp_name="Company 3",
            comp_is_startup=False,
            comp_registered=True
        )

        self.saved_company = SavedCompany.objects.create(
            user=self.user, 
            company=self.profile2
        )

        self.saved_company2 = SavedCompany.objects.create(
            user=self.user, 
            company=self.profile3
        )

        self.saved_companies_id = SavedCompany.objects.filter(user=self.user).values_list("company_id", flat=True)

    def test_get_saved_companies(self):
        self.client.force_authenticate(self.user)
        response = self.client.get("/api/profiles/?filters=is_saved")
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertEqual(2, response.data["total_items"])
        self.assertEqual(
            [{
                "profile_id": self.profile2.profile_id,
                "person": self.user2.id,
                "is_saved": True,
                "comp_name": "Company 2",
                "comp_registered": False,
                "comp_is_startup": True,
                "comp_official_name": None,
                "comp_region": None,
                "comp_common_info": None,
                "comp_phone_number": None,
                "comp_EDRPOU": None,
                "comp_year_of_foundation": None,
                "comp_service_info": None,
                "comp_product_info": None,
                "comp_address": None,
                "comp_banner_image": None,
                "person_position": None,
                "startup_idea": None,
                "is_deleted": False,
                "comp_category": [],
                "comp_activity": []
            },
            {
                "profile_id": self.profile3.profile_id,
                "person": self.user3.id,
                "is_saved": True,
                "comp_name": "Company 3",
                "comp_registered": True,
                "comp_is_startup": False,
                "comp_official_name": None,
                "comp_region": None,
                "comp_common_info": None,
                "comp_phone_number": None,
                "comp_EDRPOU": None,
                "comp_year_of_foundation": None,
                "comp_service_info": None,
                "comp_product_info": None,
                "comp_address": None,
                "comp_banner_image": None,
                "person_position": None,
                "startup_idea": None,
                "is_deleted": False,
                "comp_category": [],
                "comp_activity": []
            }
            ], response.data["results"])

    def test_get_all_companies_and_saved_marked(self):
        self.client.force_authenticate(self.user) 
        response = self.client.get("/api/profiles/")
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertEqual(3, response.data["total_items"])
        self.assertEqual(2, len([i for i in response.data["results"] if i["is_saved"]]))
        self.assertTrue(all(i["is_saved"] for i in response.data["results"] if i["profile_id"] in self.saved_companies_id))

    def test_get_registered_companies_and_saved_marked(self):
        self.client.force_authenticate(self.user)
        response = self.client.get("/api/profiles/?company_type=company")
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertEqual(1, response.data["total_items"])
        self.assertEqual(1, len([i for i in response.data["results"] if i["is_saved"]]))
        self.assertTrue(all(i["is_saved"] for i in response.data["results"] if i["profile_id"] in self.saved_companies_id))

    def test_get_startup_companies_and_saved_marked(self):
        self.client.force_authenticate(self.user)
        response = self.client.get("/api/profiles/?company_type=startup")
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertEqual(2, response.data["total_items"])
        self.assertEqual(1, len([i for i in response.data["results"] if i["is_saved"]]))
        self.assertTrue(all(i["is_saved"] for i in response.data["results"] if i["profile_id"] in self.saved_companies_id))

    def test_get_saved_companies_unauthorized(self):
        response = self.client.get("/api/profiles/?filters=is_saved")
        self.assertEqual(status.HTTP_401_UNAUTHORIZED, response.status_code)
