from rest_framework.test import APITestCase, APIClient
from authentication.models import CustomUser
from profiles.models import Profile, Category, Activity


class TestProfileListAPIView(APITestCase):
    @classmethod
    def setUpTestData(cls):
        from random import choice
        test_persons = []
        test_activities = []
        test_categories = []

        # setup activities
        HEADER_ACTIVITIES = ["producer", "importer", "retail", "HORACE"]
        for i in range(len(HEADER_ACTIVITIES)):
            test_activity = Activity.objects.create(
                name=HEADER_ACTIVITIES[i]
            )
            test_activities.append(test_activity)
        test_activity = Activity.objects.create(name="test")
        test_activities.append(test_activity)

        # setup categories
        categories = ["cheese", "milk", "honey", "wood"]
        for i in range(len(categories)):
            test_category = Category.objects.create(
                name=categories[i]
            )
            test_categories.append(test_category)

        # setup persons
        for i in range(12):
            if i % 2 == 0:
                test_person = CustomUser.objects.create_user(
                    person_email=f"test{i+1}@test.com",
                    password="Testing01",
                    person_name="test",
                    person_surname="test",
                    comp_name=f"test{i+1} startup",
                    comp_registered=False,
                    comp_is_startup=True
                )
            else:
                test_person = CustomUser.objects.create_user(
                    person_email=f"test{i + 1}@test.com",
                    password="Testing01",
                    person_name="test",
                    person_surname="test",
                    comp_name=f"test{i + 1} company",
                    comp_registered=True,
                    comp_is_startup=False
                )
            test_persons.append(test_person)

        # setup profiles
        for i in range(len(test_persons)):
            if test_persons[i].comp_is_startup:
                test_profile = Profile.objects.create(
                    person=test_persons[i],
                    comp_official_name=f"Startup {i}"
                )
            else:
                test_profile = Profile.objects.create(
                    person=test_persons[i],
                    comp_official_name=f"Company {i}"
                )
            test_profile.comp_activity.add(choice(test_activities))
            test_profile.comp_category.add(choice(test_categories))

    def setUp(self) -> None:
        self.client = APIClient()
        self.base_url = "/api/profiles/"

        # login user & get token
        self.token1 = self.client.post(
            path="/api/auth/token/login/",
            data={
                "person_email": "test1@test.com",
                "password": "Testing01"
            }).data["auth_token"]
        self.client.credentials(HTTP_AUTHORIZATION=f"Token {self.token1}")
        self.user1_id = self.client.get(
            path="/api/auth/users/me/").data["id"]

    def tearDown(self) -> None:
        self.client.logout()

    def test_get_all_profiles_authorized_no_filters(self):
        response = self.client.get(self.base_url)
        self.assertEqual(200, response.status_code)
        self.assertEqual(12, len(response.data))

    def test_get_all_profiles_authorized_filter_companies(self):
        response = self.client.get(f"{self.base_url}?company_type=company")
        self.assertEqual(200, response.status_code)
        self.assertEqual(6, len(response.data))
        # TODO: add check for types of the returned companied [has to be "registered"]

    def test_get_all_profiles_authorized_filter_startups(self):
        response = self.client.get(f"{self.base_url}?company_type=startup")
        self.assertEqual(200, response.status_code)
        self.assertEqual(6, len(response.data))
        # TODO: add check for types of the returned companied [has to be "startup"]

    def test_get_all_profiles_authorized_filter_activity_producer(self):
        response = self.client.get(f"{self.base_url}?activity_type=producer")
        filtered_len = len(response.data)
        self.assertEqual(200, response.status_code)
        response = self.client.get(self.base_url)
        producer_type = [response.data[i]["comp_activity"] for i in range(len(response.data)) if 1 in response.data[i]["comp_activity"]]
        self.assertEqual(len(producer_type), filtered_len)

    def test_get_all_profiles_authorized_filter_activity_importer(self):
        response = self.client.get(f"{self.base_url}?activity_type=importer")
        filtered_len = len(response.data)
        self.assertEqual(200, response.status_code)
        response = self.client.get(self.base_url)
        importer_type = [response.data[i]["comp_activity"] for i in range(len(response.data)) if 2 in response.data[i]["comp_activity"]]
        self.assertEqual(len(importer_type), filtered_len)

    def test_get_all_profiles_authorized_filter_activity_retail(self):
        response = self.client.get(f"{self.base_url}?activity_type=retail")
        filtered_len = len(response.data)
        self.assertEqual(200, response.status_code)
        response = self.client.get(self.base_url)
        retail_type = [response.data[i]["comp_activity"] for i in range(len(response.data)) if 3 in response.data[i]["comp_activity"]]
        self.assertEqual(len(retail_type), filtered_len)

    def test_get_all_profiles_authorized_filter_activity_HORACE(self):
        response = self.client.get(f"{self.base_url}?activity_type=HORACE")
        filtered_len = len(response.data)
        self.assertEqual(200, response.status_code)
        response = self.client.get(self.base_url)
        horace_type = [response.data[i]["comp_activity"] for i in range(len(response.data)) if 4 in response.data[i]["comp_activity"]]
        self.assertEqual(len(horace_type), filtered_len)

    def test_get_all_profiles_unauthorized(self):
        self.client.logout()
        response = self.client.get(self.base_url)
        self.assertEqual(200, response.status_code)

    def test_get_all_profiles_unauthorized_filter_companies(self):
        self.client.logout()
        response = self.client.get(f"{self.base_url}?company_type=company")
        self.assertEqual(200, response.status_code)
        self.assertEqual(6, len(response.data))
        # TODO: add check for types of the returned companied [has to be "registered"]

    def test_get_all_profiles_unauthorized_filter_startups(self):
        self.client.logout()
        response = self.client.get(f"{self.base_url}?company_type=startup")
        self.assertEqual(200, response.status_code)
        self.assertEqual(6, len(response.data))
        # TODO: add check for types of the returned companied [has to be "startup"]

    def test_get_all_profiles_unauthorized_filter_activity_producer(self):
        self.client.logout()
        response = self.client.get(f"{self.base_url}?activity_type=producer")
        filtered_len = len(response.data)
        self.assertEqual(200, response.status_code)
        response = self.client.get(self.base_url)
        producer_type = [response.data[i]["comp_activity"] for i in range(len(response.data)) if 1 in response.data[i]["comp_activity"]]
        self.assertEqual(len(producer_type), filtered_len)

    def test_get_all_profiles_unauthorized_filter_activity_importer(self):
        self.client.logout()
        response = self.client.get(f"{self.base_url}?activity_type=importer")
        filtered_len = len(response.data)
        self.assertEqual(200, response.status_code)
        response = self.client.get(self.base_url)
        importer_type = [response.data[i]["comp_activity"] for i in range(len(response.data)) if 2 in response.data[i]["comp_activity"]]
        self.assertEqual(len(importer_type), filtered_len)

    def test_get_all_profiles_unauthorized_filter_activity_retail(self):
        self.client.logout()
        response = self.client.get(f"{self.base_url}?activity_type=retail")
        filtered_len = len(response.data)
        self.assertEqual(200, response.status_code)
        response = self.client.get(self.base_url)
        retail_type = [response.data[i]["comp_activity"] for i in range(len(response.data)) if 3 in response.data[i]["comp_activity"]]
        self.assertEqual(len(retail_type), filtered_len)

    def test_get_all_profiles_unauthorized_filter_activity_HORACE(self):
        self.client.logout()
        response = self.client.get(f"{self.base_url}?activity_type=HORACE")
        filtered_len = len(response.data)
        self.assertEqual(200, response.status_code)
        response = self.client.get(self.base_url)
        horace_type = [response.data[i]["comp_activity"] for i in range(len(response.data)) if 4 in response.data[i]["comp_activity"]]
        self.assertEqual(len(horace_type), filtered_len)
