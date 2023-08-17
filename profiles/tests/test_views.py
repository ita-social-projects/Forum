from rest_framework.test import APITestCase, APIClient
from authentication.models import CustomUser
from profiles.models import Profile


class TestProfileListDetailAPIView(APITestCase):

    @classmethod
    def setUpTestData(cls):
        test_person = CustomUser.objects.create_user(
            person_email="test@test.com",
            password="Testing01",
            person_name="test",
            person_surname="test",
            comp_name="test",
            comp_registered=True,
            comp_is_startup=False
        )
        test_person2 = CustomUser.objects.create_user(
            person_email="test2@test.com",
            password="Testing01",
            person_name="test",
            person_surname="test",
            comp_name="test",
            comp_registered=True,
            comp_is_startup=False
        )

        test_profile = Profile.objects.create(
            person=test_person,
            is_deleted=False
        )
        test_profile = Profile.objects.create(
            person=test_person2,
            is_deleted=False
        )

    def setUp(self) -> None:
        self.client = APIClient()
        self.base_url = "/api/profiles/"

        # login users & get tokens
        self.token1 = self.client.post(
            path="/api/auth/token/login/",
            data={
                "person_email": "test@test.com",
                "password": "Testing01"
            }).data["auth_token"]
        self.client.credentials(HTTP_AUTHORIZATION=f"Token {self.token1}")
        self.user1_id = self.client.get(
            path="http://127.0.0.1:8000/api/auth/users/me/").data["id"]
        self.token2 = self.client.post(
            path="/api/auth/token/login/",
            data={
                "person_email": "test2@test.com",
                "password": "Testing01"
            }).data["auth_token"]
        self.client.credentials(HTTP_AUTHORIZATION=f"Token {self.token2}")
        self.user2_id = self.client.get(
            path="http://127.0.0.1:8000/api/auth/users/me/").data["id"]
        self.client.credentials(HTTP_AUTHORIZATION=f"Token {self.token1}")

    def tearDown(self) -> None:
        self.client.logout()

    def test_get_all_profiles_authorized_no_queryparam(self):
        response = self.client.get(self.base_url)
        self.assertEqual(200, response.status_code)
        self.assertEqual(1, len(response.data))

    def test_get_all_profiles_authorized_queryparam_include_all(self):
        response = self.client.get(f"{self.base_url}?include_all=True")
        self.assertEqual(2, len(response.data))

    def test_get_profile_authorized(self):
        response = self.client.get("".join([self.base_url, str(self.user1_id)]))
        self.assertEqual(200, response.status_code)
        self.assertEqual(False, response.data["is_deleted"])

    def test_get_profile_of_other_user(self):
        response = self.client.get("".join([self.base_url, str(self.user2_id)]))
        self.assertEqual(404, response.status_code)

    def test_delete_profile_authorized(self):
        response = self.client.delete("".join([self.base_url, str(self.user1_id)]))
        self.assertEqual(204, response.status_code)
        self.assertEqual(True, response.data["is_deleted"])

        response = self.client.get(self.base_url)
        self.assertEqual(0, len(response.data))

    def test_delete_profile_of_other_user_authorized(self):
        response = self.client.delete("".join([self.base_url, str(self.user2_id)]))
        self.assertEqual(404, response.status_code)

    def test_get_user_profiles_authorized_after_delete_no_queryparam(self):
        response = self.client.get({self.base_url})
        self.assertEqual(404, response.status_code)

    def test_get_user_profiles_authorized_after_delete_queryparam_include_deleted(self):
        response = self.client.get(f"{self.base_url}?include_deleted=True")
        self.assertEqual(1, len(response.data))

    def test_get_all_profiles_unauthorized(self):
        self.client.logout()
        response = self.client.get(self.base_url)
        self.assertEqual(401, response.status_code)

    def test_get_profile_unauthorized(self):
        self.client.logout()
        response = self.client.get("".join([self.base_url, str(self.user1_id)]))
        self.assertEqual(401, response.status_code)

    def test_delete_profile_unauthorized(self):
        self.client.logout()
        response = self.client.delete("".join([self.base_url, str(self.user1_id)]))
        self.assertEqual(401, response.status_code)
