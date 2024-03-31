from django.utils import timezone
from rest_framework import status
from rest_framework.test import APITestCase
from datetime import timedelta

from authentication.factories import UserFactory
from profiles.factories import (
    ProfileStartupFactory,
    ProfileCompanyFactory,
)

from profiles.factories import SavedCompanyFactory, SavedStartupFactory
from utils.dump_response import dump  # noqa


class TestProfileOrdering(APITestCase):
    def setUp(self) -> None:
        self.user = UserFactory()
        self.company_retail = ProfileCompanyFactory(name="Retail company")
        self.company_winery = ProfileCompanyFactory(name="Winery")
        self.company_delivery = ProfileCompanyFactory(name="Delivery company")
        self.startup_catering = ProfileStartupFactory(name="Catering service")
        self.startup_brewery = ProfileStartupFactory(name="Brewery")
        self.startup_bakery = ProfileStartupFactory(name="Bakery")

        self.saved_company_first = SavedCompanyFactory(user=self.user, company=self.company_delivery, added_at=(timezone.now() - timedelta(days=1)))
        self.saved_company_second = SavedCompanyFactory(user=self.user, company=self.company_winery, added_at=timezone.now())

        self.saved_startup_first = SavedStartupFactory(user=self.user, company=self.startup_bakery, added_at=(timezone.now() - timedelta(days=1)))
        self.saved_startup_second = SavedStartupFactory(user=self.user, company=self.startup_catering, added_at=timezone.now())

    def test_get_list_of_companies_alphabetical_order(self):
        response = self.client.get(path="/api/profiles/?is_registered=True&ordering=name&page=1&page_size=12")
        companies_names = [company["name"] for company in response.data["results"]]
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertEqual(["Delivery company", "Retail company", "Winery"], companies_names)

    def test_get_list_of_startups_alphabetical_order(self):
        response = self.client.get(path="/api/profiles/?is_startup=True&ordering=name&page=1&page_size=12")
        startups_names = [company["name"] for company in response.data["results"]]
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertEqual(["Bakery", "Brewery", "Catering service"], startups_names)

    def test_get_list_of_saved_companies_desc_added_at_order(self):
        self.client.force_authenticate(self.user)
        response = self.client.get(path="/api/profiles/?is_registered=True&is_saved=True&ordering=-saved_at&page=1&page_size=12")
        saved_companies_names = [company["name"] for company in response.data["results"]]
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertEqual(["Winery", "Delivery company"], saved_companies_names)

    def test_get_list_of_saved_startups_desc_added_at_order(self):
        self.client.force_authenticate(self.user)
        response = self.client.get(path="/api/profiles/?is_startup=True&is_saved=True&ordering=-saved_at&page=1&page_size=12")
        saved_startups_names = [company["name"] for company in response.data["results"]]
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertEqual(["Catering service", "Bakery"], saved_startups_names)
