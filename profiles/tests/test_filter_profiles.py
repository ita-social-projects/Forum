from rest_framework import status
from rest_framework.test import APITestCase

from profiles.factories import ProfileStartupFactory, ProfileCompanyFactory, ActivityFactory
from profiles.models import Profile
from utils.dump_response import dump  # noqa


class TestProfileFilterCompanyType(APITestCase):
    def setUp(self) -> None:
        self.company = ProfileCompanyFactory.create_batch(3)
        self.startups = ProfileStartupFactory.create_batch(4)

    def test_get_all_profiles_any_user_no_filters(self):
        response = self.client.get(path="/api/profiles/?page=1&page_size=12")
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertEqual(7, response.data["total_items"])

    def test_get_all_profiles_any_user_filter_companies(self):
        response = self.client.get(
            path="/api/profiles/?company_type={company_type}&page=1&page_size=12".format(company_type="company"))
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertEqual(3, response.data["total_items"])
        self.assertTrue(all(
            response.data["results"][i]["comp_is_startup"] is False and response.data["results"][i][
                "comp_registered"] is True
            for i in range(len(response.data["results"]))))

    def test_get_all_profiles_any_user_filter_startups(self):
        response = self.client.get(
            path="/api/profiles/?company_type={company_type}&page=1&page_size=12".format(company_type="startup"))
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertEqual(4, response.data["total_items"])
        self.assertTrue(all(
            response.data["results"][i]["comp_is_startup"] is True and response.data["results"][i][
                "comp_registered"] is False
            for i in range(len(response.data["results"]))))


class TestProfileFilterActivityType(APITestCase):
    def setUp(self) -> None:
        self.producer_activity = ActivityFactory(name="producer")
        self.importer_activity = ActivityFactory(name="importer")
        self.retail_activity = ActivityFactory(name="retail")
        self.horeca_activity = ActivityFactory(name="horeca")

        self.producers_number = 3
        self.importers_number = 2
        self.retailers_number = 4
        self.horecas_number = 5

        self.page_size = 14

        self.importers = ProfileCompanyFactory.create_batch(
            size=self.importers_number,
            comp_activity=(self.importer_activity,))
        self.producers = ProfileStartupFactory.create_batch(
            size=self.producers_number,
            comp_activity=(self.producer_activity,))
        self.retailers = ProfileCompanyFactory.create_batch(
            size=self.retailers_number,
            comp_activity=(self.retail_activity,))
        self.horecas = ProfileStartupFactory.create_batch(
            size=self.horecas_number,
            comp_activity=(self.horeca_activity,))

    def test_get_profiles_any_user_filter_producer_count(self):
        response = self.client.get(
            path="/api/profiles/?activity_type={activity}&page=1&page_size={page_size}".format(
                activity="producer", page_size=self.page_size))
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertEqual(self.producers_number, response.data["total_items"])

    def test_get_profiles_any_user_filter_producer_content(self):
        response = self.client.get(
            path="/api/profiles/?activity_type={activity}&page=1&page_size={page_size}".format(
                activity="producer", page_size=self.page_size))
        producers_from_db = Profile.objects.filter(
            comp_activity=self.producer_activity, is_deleted=False).order_by("profile_id")
        self.assertEqual(producers_from_db.count(), self.producers_number)
        self.assertTrue(all(
            [self.producer_activity.activity_id in response.data["results"][i]["comp_activity"]
             for i in range(self.producers_number)]
        ))

    def test_get_profiles_any_user_filter_importer_count(self):
        response = self.client.get(
            path="/api/profiles/?activity_type={activity}&page=1&page_size={page_size}".format(
                activity="importer", page_size=self.page_size))
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertEqual(self.importers_number, response.data["total_items"])

    def test_get_profiles_any_user_filter_importer_content(self):
        response = self.client.get(
            path="/api/profiles/?activity_type={activity}&page=1&page_size={page_size}".format(
                activity="importer", page_size=self.page_size))
        importers_from_db = Profile.objects.filter(
            comp_activity=self.importer_activity, is_deleted=False).order_by("profile_id")
        self.assertEqual(importers_from_db.count(), self.importers_number)
        self.assertTrue(all(
            [self.importer_activity.activity_id in response.data["results"][i]["comp_activity"]
             for i in range(self.importers_number)]
        ))

    def test_get_profiles_any_user_filter_retail_count(self):
        response = self.client.get(
            path="/api/profiles/?activity_type={activity}&page=1&page_size={page_size}".format(
                activity="retail", page_size=self.page_size))
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertEqual(self.retailers_number, response.data["total_items"])

    def test_get_profiles_any_user_filter_retail_content(self):
        response = self.client.get(
            path="/api/profiles/?activity_type={activity}&page=1&page_size={page_size}".format(
                activity="retail", page_size=self.page_size))
        retailers_from_db = Profile.objects.filter(
            comp_activity=self.retail_activity, is_deleted=False).order_by("profile_id")
        self.assertEqual(retailers_from_db.count(), self.retailers_number)
        self.assertTrue(all(
            [self.retail_activity.activity_id in response.data["results"][i]["comp_activity"]
             for i in range(self.retailers_number)]
        ))

    def test_get_profiles_any_user_filter_horeca_count(self):
        response = self.client.get(
            path="/api/profiles/?activity_type={activity}&page=1&page_size={page_size}".format(
                activity="horeca", page_size=self.page_size))
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertEqual(self.horecas_number, response.data["total_items"])

    def test_get_profiles_any_user_filter_horeca_content(self):
        response = self.client.get(
            path="/api/profiles/?activity_type={activity}&page=1&page_size={page_size}".format(
                activity="horeca", page_size=self.page_size))
        horecas_from_db = Profile.objects.filter(
            comp_activity=self.horeca_activity, is_deleted=False).order_by("profile_id")
        self.assertEqual(horecas_from_db.count(), self.horecas_number)
        self.assertTrue(all(
            [self.horeca_activity.activity_id in response.data["results"][i]["comp_activity"]
             for i in range(self.horecas_number)]
        ))
