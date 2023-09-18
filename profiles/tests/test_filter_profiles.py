from rest_framework import status
from rest_framework.test import APITestCase

from authentication.factories import UserFactory
from profiles.factories import ProfileStartupFactory, ProfileCompanyFactory, ActivityFactory
from profiles.factories import SavedCompanyFactory, SavedStartupFactory
from profiles.models import Profile
from utils.dump_response import dump  # noqa


class TestProfileFilterCompanyType(APITestCase):
    def setUp(self) -> None:
        self.user = UserFactory()
        self.company = ProfileCompanyFactory()
        self.startup = ProfileStartupFactory()

    def test_get_saved_companies_unauthorized(self):
        response = self.client.get(path="/api/profiles/?is_saved=True")
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertEqual(0, response.data["total_items"])

    def test_get_profiles_unauthorized_count(self):
        response = self.client.get(path="/api/profiles/")
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertEqual(2, response.data["total_items"])

    def test_get_profiles_unauthorized_content(self):
        response = self.client.get(path="/api/profiles/")
        ids_from_response = [prof["id"] for prof in response.data["results"]]
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertCountEqual([self.startup.id, self.company.id], ids_from_response)

    def test_get_profiles_filter_companies_unauthorized_count(self):
        response = self.client.get(
            path="/api/profiles/?is_registered=True&page=1&page_size=12")
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertEqual(1, response.data["total_items"])

    def test_get_profiles_filter_companies_unauthorized_content(self):
        response = self.client.get(
            path="/api/profiles/?is_registered=True&page=1&page_size=12")
        ids_from_response = [prof["id"] for prof in response.data["results"]]
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertEqual([self.company.id], ids_from_response)

    def test_get_profiles_filter_startups_unauthorized_count(self):
        response = self.client.get(
            path="/api/profiles/?is_startup=True&page=1&page_size=12")
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        # self.assertEqual(len(self.startup), response.data["total_items"])
        self.assertEqual(1, response.data["total_items"])

    def test_get_profiles_filter_startups_unauthorized_content(self):
        response = self.client.get(
            path="/api/profiles/?is_startup=True&page=1&page_size=12")
        ids_from_response = [prof["id"] for prof in response.data["results"]]
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertEqual([self.startup.id], ids_from_response)

    def test_get_profiles_filter_companies_authorized_count(self):
        SavedCompanyFactory(user=self.user)
        self.client.force_authenticate(self.user)

        response = self.client.get(
            path="/api/profiles/?is_registered=True&page=1&page_size=12")
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertEqual(2, response.data["total_items"], msg="Total result amount doesn't match.")
        self.assertEqual(
            1, len([company["is_saved"] for company in response.data["results"] if company["is_saved"]]),
            msg="Saved companies count doesn't match."
        )

    def test_get_profiles_filter_companies_authorized_content(self):
        saved_company = SavedCompanyFactory(user=self.user)
        self.client.force_authenticate(self.user)

        response = self.client.get(
            path="/api/profiles/?is_registered=True&page=1&page_size=12")

        saved_from_response = [company for company in response.data["results"] if company["is_saved"]]

        all_companies_ids_from_db = [saved_company.company.id, self.company.id]
        all_companies_ids_from_response = [company["id"] for company in response.data["results"]]

        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertEqual(saved_company.company.id, saved_from_response[0]["id"],
                         msg="Saved companies do not match")
        self.assertCountEqual(all_companies_ids_from_db, all_companies_ids_from_response,
                              msg="Companies do not match")

    def test_get_profiles_filter_companies_saved_authorized_count(self):
        SavedCompanyFactory(user=self.user)
        self.client.force_authenticate(self.user)

        response = self.client.get(
            path="/api/profiles/?is_registered=True&is_saved=True&page=1&page_size=12")
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertEqual(1, response.data["total_items"])

    def test_get_profiles_filter_companies_saved_authorized_content(self):
        saved_company = SavedCompanyFactory(user=self.user)
        self.client.force_authenticate(self.user)

        response = self.client.get(
            path="/api/profiles/?is_registered=True&is_saved=True&page=1&page_size=12")
        saved_from_response = [company for company in response.data["results"] if company["is_saved"]]

        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertEqual(saved_company.company.id, saved_from_response[0]["id"],
                         msg="Saved companies do not match")

    def test_get_profiles_filter_startups_authorized_count(self):
        SavedStartupFactory(user=self.user)
        self.client.force_authenticate(self.user)

        response = self.client.get(
            path="/api/profiles/?is_startup=True&page=1&page_size=12")
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertEqual(2, response.data["total_items"])
        self.assertEqual(
            1, len([startup["is_saved"] for startup in response.data["results"] if startup["is_saved"]]),
            msg="Saved startups count doesn't match."
        )

    def test_get_profiles_filter_startups_authorized_content(self):
        saved_startup = SavedStartupFactory(user=self.user)
        self.client.force_authenticate(self.user)

        response = self.client.get(
            path="/api/profiles/?is_startup=True&page=1&page_size=12")

        saved_from_response = [startup for startup in response.data["results"] if startup["is_saved"]]

        all_startups_ids_from_db = [saved_startup.company.id, self.startup.id]
        all_startups_ids_from_response = [startup["id"] for startup in response.data["results"]]

        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertEqual(saved_startup.company.id, saved_from_response[0]["id"],
                         msg="Saved startups do not match")
        self.assertCountEqual(all_startups_ids_from_db, all_startups_ids_from_response,
                              msg="Startups do not match")

    def test_get_profiles_filter_startups_saved_authorized_count(self):
        SavedStartupFactory(user=self.user)
        self.client.force_authenticate(self.user)

        response = self.client.get(
            path="/api/profiles/?is_startup=True&is_saved=True&page=1&page_size=12".format(
                company_type="startup"))
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertEqual(1, response.data["total_items"])

    def test_get_profiles_filter_startups_saved_authorized_content(self):
        saved_startup = SavedStartupFactory(user=self.user)
        self.client.force_authenticate(self.user)

        response = self.client.get(
            path="/api/profiles/?is_startup=True&is_saved=True&page=1&page_size=12".format(
                company_type="startup"))
        saved_from_response = [startup for startup in response.data["results"] if startup["is_saved"]]

        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertEqual(saved_startup.company.id, saved_from_response[0]["id"],
                         msg="Saved startups do not match")


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
            activities=(self.importer_activity,))
        self.producers = ProfileStartupFactory.create_batch(
            size=self.producers_number,
            activities=(self.producer_activity,))
        self.retailers = ProfileCompanyFactory.create_batch(
            size=self.retailers_number,
            activities=(self.retail_activity,))
        self.horecas = ProfileStartupFactory.create_batch(
            size=self.horecas_number,
            activities=(self.horeca_activity,))

    def test_get_profiles_any_user_filter_producer_count(self):
        response = self.client.get(
            path="/api/profiles/?activities__name={activity}&page=1&page_size={page_size}".format(
                activity="producer", page_size=self.page_size))
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertEqual(self.producers_number, response.data["total_items"])

    def test_get_profiles_any_user_filter_producer_content(self):
        response = self.client.get(
            path="/api/profiles/?activities__name={activity}&page=1&page_size={page_size}".format(
                activity="producer", page_size=self.page_size))
        producers_from_db = Profile.objects.filter(
            activities=self.producer_activity, is_deleted=False).order_by("id")
        self.assertEqual(producers_from_db.count(), self.producers_number)
        self.assertTrue(all(
            [self.producer_activity.id in response.data["results"][i]["activities"]
             for i in range(self.producers_number)]
        ))

    def test_get_profiles_any_user_filter_importer_count(self):
        response = self.client.get(
            path="/api/profiles/?activities__name={activity}&page=1&page_size={page_size}".format(
                activity="importer", page_size=self.page_size))
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertEqual(self.importers_number, response.data["total_items"])

    def test_get_profiles_any_user_filter_importer_content(self):
        response = self.client.get(
            path="/api/profiles/?activities__name={activity}&page=1&page_size={page_size}".format(
                activity="importer", page_size=self.page_size))
        importers_from_db = Profile.objects.filter(
            activities=self.importer_activity, is_deleted=False).order_by("id")
        self.assertEqual(importers_from_db.count(), self.importers_number)
        self.assertTrue(all(
            [self.importer_activity.id in response.data["results"][i]["activities"]
             for i in range(self.importers_number)]
        ))

    def test_get_profiles_any_user_filter_retail_count(self):
        response = self.client.get(
            path="/api/profiles/?activities__name={activity}&page=1&page_size={page_size}".format(
                activity="retail", page_size=self.page_size))
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertEqual(self.retailers_number, response.data["total_items"])

    def test_get_profiles_any_user_filter_retail_content(self):
        response = self.client.get(
            path="/api/profiles/?activities__name={activity}&page=1&page_size={page_size}".format(
                activity="retail", page_size=self.page_size))
        retailers_from_db = Profile.objects.filter(
            activities=self.retail_activity, is_deleted=False).order_by("id")
        self.assertEqual(retailers_from_db.count(), self.retailers_number)
        self.assertTrue(all(
            [self.retail_activity.id in response.data["results"][i]["activities"]
             for i in range(self.retailers_number)]
        ))

    def test_get_profiles_any_user_filter_horeca_count(self):
        response = self.client.get(
            path="/api/profiles/?activities__name={activity}&page=1&page_size={page_size}".format(
                activity="horeca", page_size=self.page_size))
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertEqual(self.horecas_number, response.data["total_items"])

    def test_get_profiles_any_user_filter_horeca_content(self):
        response = self.client.get(
            path="/api/profiles/?activities__name={activity}&page=1&page_size={page_size}".format(
                activity="horeca", page_size=self.page_size))
        horecas_from_db = Profile.objects.filter(
            activities=self.horeca_activity, is_deleted=False).order_by("id")
        self.assertEqual(horecas_from_db.count(), self.horecas_number)
        self.assertTrue(all(
            [self.horeca_activity.id in response.data["results"][i]["activities"]
             for i in range(self.horecas_number)]
        ))
