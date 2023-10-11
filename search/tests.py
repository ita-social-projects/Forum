from rest_framework import status
from rest_framework.test import APITestCase

from authentication.factories import UserFactory
from profiles.factories import (
    ProfileStartupFactory,
    ProfileCompanyFactory,
    ActivityFactory,
)
from profiles.factories import SavedCompanyFactory, SavedStartupFactory
from profiles.models import Profile
from utils.dump_response import dump  # noqa


class TestCompanyFilter(APITestCase):
    def setUp(self) -> None:
        self.user = UserFactory()
        self.company = ProfileCompanyFactory(name='Kyivbud', region='Kyiv')
        self.startup = ProfileStartupFactory(name='Dniprotrans', region='Dnipro')

    def test_get_profile_filtered_by_name_unauthorized(self):
        response = self.client.get(path="/api/search/?name=Kyivbud")
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertEqual(1, response.data["total_items"])
        self.assertEqual("Kyivbud", response.data.name)

    def test_get_profile_filtered_by_region_unauthorized(self):
        response = self.client.get(path="/api/search/?region=Dnipro")
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertEqual(1, response.data["total_items"])
        self.assertEqual("Dniprotrans", response.data.name)

    def test_get_profile_filtered_by_name_authorized(self):
        self.client.force_authenticate(self.user)
        response = self.client.get(path="/api/search/?name=Kyivbud")
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertEqual(1, response.data["total_items"])
        self.assertEqual("Kyivbud", response.data.name)

    def test_get_profile_filtered_by_region_authorized(self):
        self.client.force_authenticate(self.user)
        response = self.client.get(path="/api/search/?region=Dnipro")
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertEqual(1, response.data["total_items"])
        self.assertEqual("Dniprotrans", response.data.name)

    def test_get_profiles_without_filter_unauthorized(self):
        response = self.client.get(path="/api/search/")
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertEqual(2, response.data["total_items"])

    def test_get_profiles_without_filter_authorized(self):
        self.client.force_authenticate(self.user)
        response = self.client.get(path="/api/search/")
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertEqual(2, response.data["total_items"])

    def test_get_profiles_filter_wrong_name_authorized(self):
        self.client.force_authenticate(self.user)
        response = self.client.get(path="/api/search/?name=Chernovcimilk")
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertEqual(0, response.data["total_items"])

    def test_get_profiles_filter_wrong_name_unauthorized(self):
        response = self.client.get(path="/api/search/?name=Chernovcimilk")
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertEqual(0, response.data["total_items"])

    def test_get_profile_filtered_by_name_and_region_unauthorized(self):
        response = self.client.get(path="/api/search/?name=Kyivbud&region=Kyiv")
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertEqual(1, response.data["total_items"])
        self.assertEqual("Kyivbud", response.data.name)

    def test_get_profile_filtered_by_name_and_region_authorized(self):
        self.client.force_authenticate(self.user)
        response = self.client.get(path="/api/search/?name=Kyivbud&region=Kyiv")
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertEqual(1, response.data["total_items"])
        self.assertEqual("Kyivbud", response.data.name)

    def test_get_profile_filtered_by_wrong_name_and_region_authorized(self):
        self.client.force_authenticate(self.user)
        response = self.client.get(path="/api/search/?name=Pizza&region=Kyiv")
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertEqual(0, response.data["total_items"])

    def test_get_profile_filtered_by_wrong_name_and_region_unauthorized(self):
        response = self.client.get(path="/api/search/?name=Pizza&region=Kyiv")
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertEqual(0, response.data["total_items"])

    def test_get_profile_filtered_by_name_and_wrong_region_authorized(self):
        self.client.force_authenticate(self.user)
        response = self.client.get(path="/api/search/?name=Kyivbud&region=Ghernigiv")
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertEqual(0, response.data["total_items"])

    def test_get_profile_filtered_by_name_and_wrong_region_unauthorized(self):
        response = self.client.get(path="/api/search/?name=Kyivbud&region=Ghernigiv")
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertEqual(0, response.data["total_items"])

    def test_get_profile_filtered_by_wrong_name_and_wrong_region_authorized(self):
        self.client.force_authenticate(self.user)
        response = self.client.get(path="/api/search/?name=Pizza&region=Ghernigiv")
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertEqual(0, response.data["total_items"])

    def test_get_profile_filtered_by_wrong_name_and_wrong_region_unauthorized(self):
        response = self.client.get(path="/api/search/?name=Pizza&region=Ghernigiv")
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertEqual(0, response.data["total_items"])