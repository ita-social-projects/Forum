from rest_framework.test import APITestCase, APIClient
from authentication.models import CustomUser
from profiles.models import Profile
from utils.dump_response import dump # noqa


class TestProfileDetailAPIView(APITestCase):

    @classmethod
    def setUpTestData(cls):
        test_person = CustomUser.objects.create_user(
            person_email="test@test.com",
            password="Testing01",
            person_name="test",
            person_surname="test",
            is_active=True
        )
        test_person2 = CustomUser.objects.create_user(
            person_email="test2@test.com",
            password="Testing01",
            person_name="test",
            person_surname="test",
            is_active=True
        )

        test_profile = Profile.objects.create(
            person=test_person,
            comp_is_startup=True,
            comp_registered=False
        )
        test_profile = Profile.objects.create(
            person=test_person2,
            comp_registered=True,
            comp_is_startup=False
        )

    def setUp(self) -> None:
        self.client = APIClient()

        # login users & get tokens
        self.token1 = self.client.post(
            path="/api/auth/token/login/",
            data={
                "person_email": "test@test.com",
                "password": "Testing01"
            }).data["auth_token"]
        self.client.credentials(HTTP_AUTHORIZATION=f"Token {self.token1}")
        self.token2 = self.client.post(
            path="/api/auth/token/login/",
            data={
                "person_email": "test2@test.com",
                "password": "Testing01"
            }).data["auth_token"]

    def tearDown(self) -> None:
        self.client.logout()

    def test_get_profile_unauthorized(self):
        self.client.logout()
        response = self.client.get("/api/profiles/{user1_id}".format(user1_id=1))
        self.assertEqual(401, response.status_code)

    def test_delete_profile_unauthorized(self):
        self.client.logout()
        response = self.client.delete("/api/profiles/{user1_id}".format(user1_id=1))
        self.assertEqual(401, response.status_code)

    def test_get_profile_authorized(self):
        response = self.client.get("/api/profiles/{user1_id}".format(user1_id=1))
        self.assertEqual(200, response.status_code)
        self.assertEqual(False, response.data["is_deleted"])

    def test_get_profile_of_other_user(self):
        response = self.client.get("/api/profiles/{user2_id}".format(user2_id=1))
        self.assertEqual(200, response.status_code)

    def test_delete_profile_authorized(self):
        # get all before delete
        response = self.client.get("/api/profiles/")
        profiles_len_before_del = len(response.data)
        # del profile
        response = self.client.delete("/api/profiles/{user1_id}".format(user1_id=1))
        self.assertEqual(204, response.status_code)
        # check the profile is deleted
        response = self.client.get("/api/profiles/")
        persons = [response.data[i]["person"] for i in range(len(response.data))]
        self.assertEqual(profiles_len_before_del-1, len(response.data))
        self.assertTrue(1 not in persons)
        # try access deleted profile
        response = self.client.get("/api/profiles/{user1_id}".format(user1_id=1))
        self.assertEqual(404, response.status_code)

    def test_delete_profile_of_other_user_authorized(self):
        response = self.client.delete("/api/profiles/{user2_id}".format(user2_id=2))
        self.assertEqual(404, response.status_code)
