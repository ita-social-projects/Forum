from rest_framework.test import APITestCase
from authentication.models import CustomUser
from profiles.models import Profile, Category, Activity
from utils.dump_response import dump  # noqa


class TestProfileListAPIView(APITestCase):

    def setUp(self) -> None:
        # setup activities
        self.producer_activity = Activity.objects.create(name="producer")
        self.importer_activity = Activity.objects.create(name="importer")
        self.retail_activity = Activity.objects.create(name="retail")
        self.horeca_activity = Activity.objects.create(name="horeca")

        # setup persons & profiles
        self.user = CustomUser.objects.create_user(
            person_email="test1@test.com",
            person_name="test",
            person_surname="test",
            is_active=True)
        self.profile = Profile.objects.create(
            person=self.user,
            comp_official_name="Startup 1",
            comp_is_startup=True,
            comp_registered=False
        )
        self.profile.comp_activity.set((self.importer_activity, self.retail_activity, self.producer_activity))

        self.user2 = CustomUser.objects.create_user(
            person_email="test2@test.com",
            person_name="test",
            person_surname="test",
            is_active=True)
        self.profile2 = Profile.objects.create(
            person=self.user2,
            comp_official_name="Startup 2",
            comp_is_startup=True,
            comp_registered=False
        )
        self.profile2.comp_activity.set((self.producer_activity, self.horeca_activity))

        self.user3 = CustomUser.objects.create_user(
            person_email="test3@test.com",
            person_name="test",
            person_surname="test",
            is_active=True)
        self.profile3 = Profile.objects.create(
            person=self.user3,
            comp_official_name="Company 3",
            comp_is_startup=False,
            comp_registered=True
        )
        self.profile3.comp_activity.add(self.horeca_activity)

        self.user4 = CustomUser.objects.create_user(
            person_email="test4@test.com",
            person_name="test",
            person_surname="test",
            is_active=True)
        self.profile4 = Profile.objects.create(
            person=self.user4,
            comp_official_name="Company 4",
            comp_is_startup=False,
            comp_registered=True
        )
        self.profile4.comp_activity.set((self.importer_activity, self.retail_activity))

    def test_get_all_profiles_authorized_no_filters(self):
        self.client.force_authenticate(self.user)

        response = self.client.get("/api/profiles/?page=1&page_size=12")
        self.assertEqual(200, response.status_code)
        self.assertEqual(4, response.data["total_items"])

    def test_get_all_profiles_authorized_filter_companies(self):
        self.client.force_authenticate(self.user)

        response = self.client.get("/api/profiles/?company_type=company&page=1&page_size=12")
        self.assertEqual(200, response.status_code)
        self.assertEqual(2, response.data["total_items"])
        self.assertTrue(all(
            response.data["results"][i]["comp_is_startup"] is False and response.data["results"][i][
                "comp_registered"] is True
            for i in range(len(response.data["results"]))))

    def test_get_all_profiles_authorized_filter_startups(self):
        self.client.force_authenticate(self.user)

        response = self.client.get("/api/profiles/?company_type=startup&page=1&page_size=12")
        self.assertEqual(200, response.status_code)
        self.assertEqual(2, response.data["total_items"])
        self.assertTrue(all(
            response.data["results"][i]["comp_is_startup"] is True and response.data["results"][i][
                "comp_registered"] is False
            for i in range(len(response.data["results"]))))

    def test_get_all_profiles_authorized_filter_activity_producer(self):
        self.client.force_authenticate(self.user)

        response = self.client.get("/api/profiles/?activity_type=producer&page=1&page_size=12")
        self.assertEqual(200, response.status_code)
        self.assertEqual(2, response.data["total_items"])
        producers = Profile.objects.filter(comp_activity=self.producer_activity, is_deleted=False)
        self.assertTrue(all(
            [producers[i].profile_id == response.data["results"][i]["profile_id"] for i in range(len(producers))]
        ))

    def test_get_all_profiles_authorized_filter_activity_importer(self):
        self.client.force_authenticate(self.user)

        response = self.client.get("/api/profiles/?activity_type=importer&page=1&page_size=12")
        self.assertEqual(200, response.status_code)
        importers = Profile.objects.filter(comp_activity=self.importer_activity, is_deleted=False)
        self.assertEqual(2, response.data["total_items"])
        self.assertTrue(all(
            [importers[i].profile_id == response.data["results"][i]["profile_id"] for i in range(len(importers))]
        ))

    def test_get_all_profiles_authorized_filter_activity_retail(self):
        self.client.force_authenticate(self.user)

        response = self.client.get("/api/profiles/?activity_type=retail&page=1&page_size=12")
        self.assertEqual(200, response.status_code)
        retails = Profile.objects.filter(comp_activity=self.retail_activity, is_deleted=False)
        self.assertEqual(2, response.data["total_items"])
        self.assertTrue(all(
            [retails[i].profile_id == response.data["results"][i]["profile_id"] for i in range(len(retails))]
        ))

    def test_get_all_profiles_authorized_filter_activity_horeca(self):
        self.client.force_authenticate(self.user)

        response = self.client.get("/api/profiles/?activity_type=horeca&page=1&page_size=12")
        self.assertEqual(200, response.status_code)
        horeca = Profile.objects.filter(comp_activity=self.horeca_activity, is_deleted=False)
        self.assertEqual(2, response.data["total_items"])
        self.assertTrue(all(
            [horeca[i].profile_id == response.data["results"][i]["profile_id"] for i in range(len(horeca))]
        ))

    def test_get_all_profiles_unauthorized(self):
        response = self.client.get("/api/profiles/?page=1&page_size=12")
        self.assertEqual(200, response.status_code)
        self.assertEqual(4, response.data["total_items"])

    def test_get_all_profiles_unauthorized_filter_companies(self):
        response = self.client.get("/api/profiles/?company_type=company&page=1&page_size=12")
        self.assertEqual(200, response.status_code)
        self.assertEqual(2, response.data["total_items"])
        self.assertTrue(all(
            response.data["results"][i]["comp_is_startup"] is False and response.data["results"][i][
                "comp_registered"] is True
            for i in range(len(response.data["results"]))))

    def test_get_all_profiles_unauthorized_filter_startups(self):
        response = self.client.get("/api/profiles/?company_type=startup&page=1&page_size=12")
        self.assertEqual(200, response.status_code)
        self.assertEqual(2, response.data["total_items"])
        self.assertTrue(all(
            response.data["results"][i]["comp_is_startup"] is True and response.data["results"][i][
                "comp_registered"] is False
            for i in range(len(response.data["results"]))))

    def test_get_all_profiles_unauthorized_filter_activity_producer(self):
        response = self.client.get("/api/profiles/?activity_type=producer&page=1&page_size=12")
        self.assertEqual(200, response.status_code)
        self.assertEqual(2, response.data["total_items"])
        producers = Profile.objects.filter(comp_activity=self.producer_activity, is_deleted=False)
        self.assertTrue(all(
            [producers[i].profile_id == response.data["results"][i]["profile_id"] for i in range(len(producers))]
        ))

    def test_get_all_profiles_unauthorized_filter_activity_importer(self):
        response = self.client.get("/api/profiles/?activity_type=importer&page=1&page_size=12")
        self.assertEqual(200, response.status_code)
        importers = Profile.objects.filter(comp_activity=self.importer_activity, is_deleted=False)
        self.assertEqual(2, response.data["total_items"])
        self.assertTrue(all(
            [importers[i].profile_id == response.data["results"][i]["profile_id"] for i in range(len(importers))]
        ))


    def test_get_all_profiles_unauthorized_filter_activity_retail(self):
        response = self.client.get("/api/profiles/?activity_type=retail&page=1&page_size=12")
        self.assertEqual(200, response.status_code)
        retails = Profile.objects.filter(comp_activity=self.retail_activity, is_deleted=False)
        self.assertEqual(2, response.data["total_items"])
        self.assertTrue(all(
            [retails[i].profile_id == response.data["results"][i]["profile_id"] for i in range(len(retails))]
        ))

    def test_get_all_profiles_unauthorized_filter_activity_horeca(self):
        response = self.client.get("/api/profiles/?activity_type=horeca&page=1&page_size=12")
        self.assertEqual(200, response.status_code)
        horeca = Profile.objects.filter(comp_activity=self.horeca_activity, is_deleted=False)
        self.assertEqual(2, response.data["total_items"])
        self.assertTrue(all(
            [horeca[i].profile_id == response.data["results"][i]["profile_id"] for i in range(len(horeca))]
        ))
