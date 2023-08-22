from rest_framework.test import APITestCase, APIClient
from authentication.models import CustomUser
from profiles.models import Activity, Category, Profile
from rest_framework import status


class SavedCompaniesListCreateDestroyAPITest(APITestCase):

    @classmethod
    def setUpTestData(cls):
        test_user = CustomUser.objects.create_user(
            person_email="testuser1@test.com",
            password="testuser1",
            person_name="testuser1",
            person_surname="testuser1",
            comp_name="testuser1",
            comp_registered=True,
            comp_is_startup=False
        )

        test_user2 = CustomUser.objects.create_user(
            person_email="testuser2@test.com",
            password="testuser2",
            person_name="testuser2",
            person_surname="testuser2",
            comp_name="testuser2",
            comp_registered=True,
            comp_is_startup=False
        )

        test_activity = Activity.objects.create(activity_id=1, name="Test Activity")
        test_category = Category.objects.create(category_id=1, name="Test Category")
        test_company1 = Profile.objects.create(
            comp_official_name="Test Company",
            comp_region="Test Region",
            comp_common_info="Test Common Info",
            comp_phone_number="1234567890",
            comp_EDRPOU=1234567890,
            comp_year_of_foundation=2020,
            comp_service_info="Test Service Info",
            comp_product_info="Test Product Info",
            comp_address="Test Address",
            comp_banner_image=None,
            person=test_user,
            person_position="Test Position",
            startup_idea="Test Startup Idea"
            )
        test_company2 = Profile.objects.create(
            comp_official_name="Test Company2",
            comp_region="Test Region2",
            comp_common_info="Test Common Info2",
            comp_phone_number="1234527890",
            comp_EDRPOU=1234527890,
            comp_year_of_foundation=2022,
            comp_service_info="Test Service Info2",
            comp_product_info="Test Product Info2",
            comp_address="Test Address2",
            comp_banner_image=None,
            person=test_user2,
            person_position="Test Position2",
            startup_idea="Test Startup Idea2"
            )

    def setUp(self):
        self.client = APIClient()
        self.url = '/api/saved-list/'

        # login users & get tokens
        self.token1 = self.client.post(
            path="/api/auth/token/login/",
            data={
                "person_email": "testuser1@test.com",
                "password": "testuser1"
            }).data["auth_token"]
        self.client.credentials(HTTP_AUTHORIZATION=f"Token {self.token1}")
        self.user1_id = self.client.get(
            path="http://127.0.0.1:8000/api/auth/users/me/").data["id"]

        self.token2 = self.client.post(
            path="/api/auth/token/login/",
            data={
                "person_email": "testuser2@test.com",
                "password": "testuser2"
            }).data["auth_token"]
        self.client.credentials(HTTP_AUTHORIZATION=f"Token {self.token2}")
        self.user2_id = self.client.get(
            path="http://127.0.0.1:8000/api/auth/users/me/").data["id"]


    def test_add_test_company1_to_saved_list_by_test_user2(self):
        response = self.client.post(
            self.url,
            data={
                'company_pk': 1,
                'Authentication': self.token2
            }
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        expected_company_value = 1
        company_added_info = response.data['Company added']
        self.assertEqual(company_added_info['user'], self.user2_id)
        self.assertEqual(company_added_info['company'], expected_company_value)

    def test_add_test_company2_to_saved_list_by_test_user2(self):
        response = self.client.post(
            self.url,
            data={
                'company_pk': 2,
                'Authentication': self.token2
            }
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        expected_company_value = 2
        company_added_info = response.data['Company added']
        self.assertEqual(company_added_info['user'], self.user2_id)
        self.assertEqual(company_added_info['company'], expected_company_value)


    def test_get_test_user2_company_saved_list(self):
        self.client.post(self.url, data={'company_pk': 1, 'Authentication': self.token2})
        self.client.post(self.url, data={'company_pk': 2, 'Authentication': self.token2})
        response = self.client.get(self.url,
            data={
                'Authentication': self.token2
            }
        )
        companies_info = response.data['Companies']
        self.assertEqual(200, response.status_code)
        self.assertEqual(2, len(companies_info))

    def test_delete_test_user2_company_saved_list_item(self):
        self.client.post(self.url, data={'company_pk': 1, 'Authentication': self.token2})
        self.client.post(self.url, data={'company_pk': 2, 'Authentication': self.token2})
        response = self.client.delete(self.url + '2/',
            data={
                'Authentication': self.token2
            }
        )
        self.assertEqual(204, response.status_code)
        response = self.client.get(self.url,
            data={
                'Authentication': self.token2
            }
        )
        companies_info = response.data['Companies']
        self.assertEqual(200, response.status_code)
        self.assertEqual(1, len(companies_info))

    def test_add_non_existing_company_to_saved_list(self):
        response = self.client.post(
            self.url,
            data={
                'company_pk': 999,
                'Authentication': self.token1
            }
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


    def test_get_saved_companies_without_authentication(self):
        self.client.logout()
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
