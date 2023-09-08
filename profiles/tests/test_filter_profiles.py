from rest_framework.test import APITestCase

from utils.dump_response import dump  # noqa
from rest_framework import status
from profiles.factories import ProfileStartupFactory, ProfileCompanyFactory, ActivityFactory
from authentication.factories import UserFactory


class TestProfileListAPIView(APITestCase):
    # @classmethod
    # def setUpTestData(cls):
    #     from random import choice, sample
    #     test_persons = []
    #     test_activities = []
    #     test_categories = []
    #
    #     # setup activities
    #     HEADER_ACTIVITIES = ["producer", "importer", "retail", "horeca"]
    #     for i in range(len(HEADER_ACTIVITIES)):
    #         test_activity = Activity.objects.create(
    #             name=HEADER_ACTIVITIES[i]
    #         )
    #         test_activities.append(test_activity)
    #     test_activity = Activity.objects.create(name="test")
    #     test_activities.append(test_activity)
    #
    #     # setup categories
    #     categories = ["cheese", "milk", "honey", "wood"]
    #     for i in range(len(categories)):
    #         test_category = Category.objects.create(
    #             name=categories[i]
    #         )
    #         test_categories.append(test_category)
    #
    #     # setup persons
    #     for i in range(12):
    #         if i % 2 == 0:
    #             test_person = CustomUser.objects.create_user(
    #                 person_email=f"test{i + 1}@test.com",
    #                 password="Testing01",
    #                 person_name="test",
    #                 person_surname="test",
    #                 is_active=True
    #             )
    #             test_profile = Profile.objects.create(
    #                 person=test_person,
    #                 comp_official_name=f"Startup {i}",
    #                 comp_is_startup=True,
    #                 comp_registered=False
    #             )
    #
    #         else:
    #             test_person = CustomUser.objects.create_user(
    #                 person_email=f"test{i + 1}@test.com",
    #                 password="Testing01",
    #                 person_name="test",
    #                 person_surname="test",
    #                 is_active=True
    #             )
    #             test_profile = Profile.objects.create(
    #                 person=test_person,
    #                 comp_official_name=f"Company {i}",
    #                 comp_is_startup=False,
    #                 comp_registered=True
    #             )
    #         test_profile.comp_activity.set(sample(test_activities, 2))
    #         test_profile.comp_category.add(choice(test_categories))
    #         test_persons.append(test_person)

    def setUp(self) -> None:
        self.user = UserFactory()

        self.producer_activity = ActivityFactory(name="producer")
        self.importer_activity = ActivityFactory(name="importer")
        self.retail_activity = ActivityFactory(name="retail")
        self.horeca_activity = ActivityFactory(name="horeca")

        self.company = ProfileCompanyFactory(
            person=self.user,
            comp_activity=(self.importer_activity, self.retail_activity, self.horeca_activity))
        self.startups = ProfileStartupFactory.create_batch(2,
                                                           comp_activity=(self.producer_activity, self.horeca_activity))

        self.importers = ProfileCompanyFactory.create_batch(3, comp_activity=(self.importer_activity,))
        self.producers = ProfileStartupFactory.create_batch(2, comp_activity=(self.producer_activity,))
        self.retailers = ProfileCompanyFactory.create_batch(2, comp_activity=(self.retail_activity,))
        self.horecas = ProfileStartupFactory.create_batch(1, comp_activity=(self.horeca_activity,))

    def test_get_all_profiles_authorized_no_filters(self):
        response = self.client.get("/api/profiles/?page=1&page_size=12")
        self.assertEqual(200, response.status_code)
        self.assertEqual(12, len(response.data["results"]))

    def test_get_all_profiles_authorized_filter_companies(self):
        response = self.client.get("/api/profiles/?company_type=company&page=1&page_size=12")
        self.assertEqual(200, response.status_code)
        self.assertEqual(6, len(response.data["results"]))
        self.assertTrue(all(
            response.data["results"][i]["comp_is_startup"] is False and response.data["results"][i]["comp_registered"] is True
            for i in range(len(response.data["results"]))))

    def test_get_all_profiles_authorized_filter_startups(self):
        response = self.client.get("/api/profiles/?company_type=startup&page=1&page_size=12")
        self.assertEqual(200, response.status_code)
        self.assertEqual(6, len(response.data["results"]))
        self.assertTrue(all(
            response.data["results"][i]["comp_is_startup"] is True and response.data["results"][i]["comp_registered"] is False
            for i in range(len(response.data["results"]))))

    def test_get_all_profiles_authorized_filter_activity_producer(self):
        response = self.client.get("/api/profiles/?activity_type=producer&page=1&page_size=12")
        filtered_len = len(response.data["results"])
        self.assertEqual(200, response.status_code)
        response = self.client.get("/api/profiles/?page=1&page_size=12")
        producer_type = [response.data["results"][i]["comp_activity"] for i in range(len(response.data["results"])) if
                         1 in response.data["results"][i]["comp_activity"]]
        self.assertEqual(len(producer_type), filtered_len)

    def test_get_all_profiles_authorized_filter_activity_importer(self):
        response = self.client.get("/api/profiles/?activity_type=importer&page=1&page_size=12")
        filtered_len = len(response.data["results"])
        self.assertEqual(200, response.status_code)
        response = self.client.get("/api/profiles/?page=1&page_size=12")
        importer_type = [response.data["results"][i]["comp_activity"] for i in range(len(response.data["results"])) if
                         2 in response.data["results"][i]["comp_activity"]]
        self.assertEqual(len(importer_type), filtered_len)

    def test_get_all_profiles_authorized_filter_activity_retail(self):
        response = self.client.get("/api/profiles/?activity_type=retail&page=1&page_size=12")
        filtered_len = len(response.data["results"])
        self.assertEqual(200, response.status_code)
        response = self.client.get("/api/profiles/?page=1&page_size=12")
        retail_type = [response.data["results"][i]["comp_activity"] for i in range(len(response.data["results"])) if
                       3 in response.data["results"][i]["comp_activity"]]
        self.assertEqual(len(retail_type), filtered_len)

    def test_get_all_profiles_authorized_filter_activity_horeca(self):
        response = self.client.get("/api/profiles/?activity_type=horeca&page=1&page_size=12")
        filtered_len = len(response.data["results"])
        self.assertEqual(200, response.status_code)
        response = self.client.get("/api/profiles/?page=1&page_size=12")
        horeca_type = [response.data["results"][i]["comp_activity"] for i in range(len(response.data["results"])) if
                       4 in response.data["results"][i]["comp_activity"]]
        self.assertEqual(len(horeca_type), filtered_len)

    def test_get_all_profiles_unauthorized(self):
        self.client.logout()
        response = self.client.get("/api/profiles/?page=1&page_size=12")
        self.assertEqual(200, response.status_code)

    def test_get_all_profiles_unauthorized_filter_companies(self):
        self.client.logout()
        response = self.client.get("/api/profiles/?company_type=company&page=1&page_size=12")
        self.assertEqual(200, response.status_code)
        self.assertEqual(6, len(response.data["results"]))
        self.assertTrue(all(
            response.data["results"][i]["comp_is_startup"] is False and response.data["results"][i]["comp_registered"] is True
            for i in range(len(response.data["results"]))))

    def test_get_all_profiles_unauthorized_filter_startups(self):
        self.client.logout()
        response = self.client.get("/api/profiles/?company_type=startup&page=1&page_size=12")
        self.assertEqual(200, response.status_code)
        self.assertEqual(6, len(response.data["results"]))
        self.assertTrue(all(
            response.data["results"][i]["comp_is_startup"] is True and response.data["results"][i]["comp_registered"] is False
            for i in range(len(response.data["results"]))))

    def test_get_all_profiles_unauthorized_filter_activity_producer(self):
        self.client.logout()
        response = self.client.get("/api/profiles/?activity_type=producer&page=1&page_size=12")
        filtered_len = len(response.data["results"])
        self.assertEqual(200, response.status_code)
        response = self.client.get("/api/profiles/?page=1&page_size=12")
        producer_type = [response.data["results"][i]["comp_activity"] for i in range(len(response.data["results"])) if
                         1 in response.data["results"][i]["comp_activity"]]
        self.assertEqual(len(producer_type), filtered_len)

    def test_get_all_profiles_unauthorized_filter_activity_importer(self):
        self.client.logout()
        response = self.client.get("/api/profiles/?activity_type=importer&page=1&page_size=12")
        filtered_len = len(response.data["results"])
        self.assertEqual(200, response.status_code)
        response = self.client.get("/api/profiles/?page=1&page_size=12")
        importer_type = [response.data["results"][i]["comp_activity"] for i in range(len(response.data["results"])) if
                         2 in response.data["results"][i]["comp_activity"]]
        self.assertEqual(len(importer_type), filtered_len)

    def test_get_all_profiles_unauthorized_filter_activity_retail(self):
        self.client.logout()
        response = self.client.get("/api/profiles/?activity_type=retail&page=1&page_size=12")
        filtered_len = len(response.data["results"])
        self.assertEqual(200, response.status_code)
        response = self.client.get("/api/profiles/?page=1&page_size=12")
        retail_type = [response.data["results"][i]["comp_activity"] for i in range(len(response.data["results"])) if
                       3 in response.data["results"][i]["comp_activity"]]
        self.assertEqual(len(retail_type), filtered_len)

    def test_get_all_profiles_unauthorized_filter_activity_horeca(self):
        self.client.logout()
        response = self.client.get("/api/profiles/?activity_type=horeca&page=1&page_size=12")
        filtered_len = len(response.data["results"])
        self.assertEqual(200, response.status_code)
        response = self.client.get("/api/profiles/?page=1&page_size=12")
        horeca_type = [response.data["results"][i]["comp_activity"] for i in range(len(response.data["results"])) if
                    4 in response.data["results"][i]["comp_activity"]]
        self.assertEqual(len(horeca_type), filtered_len)
