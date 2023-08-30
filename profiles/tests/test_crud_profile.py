from rest_framework.test import APITestCase, APIClient
from authentication.models import CustomUser
from profiles.models import Profile, Category, Activity
from utils.dump_response import dump # noqa
import io
from PIL import Image
import os



class TestProfileDetailAPIView(APITestCase):

    @classmethod
    def setUpTestData(cls):
        cls.test_person = CustomUser.objects.create_user(
            person_email="test@test.com",
            password="Testing01",
            person_name="test",
            person_surname="test",
            is_active=True
        )
        cls.test_person2 = CustomUser.objects.create_user(
            person_email="test2@test.com",
            password="Testing01",
            person_name="test",
            person_surname="test",
            is_active=True
        )

        cls.test_person3 = CustomUser.objects.create_user(
            person_email="test3@test.com",
            password="Testing01",
            person_name="test",
            person_surname="test",
            is_active=True
        )

        cls.test_profile = Profile.objects.create(
            person=cls.test_person,
            comp_is_startup=True,
            comp_registered=False
        )
        cls.test_profile2 = Profile.objects.create(
            person=cls.test_person2,
            comp_registered=True,
            comp_is_startup=False
        )

        Category.objects.create(category_id=1,
                                name='cheese')
        Activity.objects.create(activity_id=1,
                                name='importer')

    @staticmethod
    def _generate_image(ext, size=(100, 100)):
        '''for mocking png and jpeg files'''
        file = io.BytesIO()
        image = Image.new('RGB', size=size)
        formatext = ext.upper()
        image.save(file, formatext)
        file.name = f'test.{formatext}'
        file.seek(0)
        return file

    def setUp(self) -> None:
        self.client = APIClient()
        self.base_url = "/api/profiles/"
        self.update_url = "/api/profiles/2"
        self.not_exist_profile_url = "/api/profiles/15"

        # login users & get tokens
        self.token1 = self.client.post(
            path="/api/auth/token/login/",
            data={
                "person_email": "test@test.com",
                "password": "Testing01"
            }).data["auth_token"]
        self.client.credentials(HTTP_AUTHORIZATION=f"Token {self.token1}")

        self.right_image = self._generate_image('jpeg', (10, 10))
        self.wrong_image = self._generate_image('png', (3000, 3000))

        self.wrong_full_data_for_full_update = {
            "profile_id": self.test_profile,
            "person": self.test_person3,
            "comp_official_name": "Jannifer",
            "comp_region": 'Kyiv',
            "comp_common_info": "Good Very",
            "comp_phone_number": 167300044411,
            "comp_EDRPOU": 12345678,
            "comp_year_of_foundation": 2005,
            "comp_service_info": 'very good service',
            "comp_product_info": 'very good product',
            "comp_address": 'Kyiv',
            "startup_idea": 'very good idea',
            "is_deleted": False,
            "comp_category": [
                2
            ],
            "comp_activity": [
                2
            ]
        }
        self.right_full_data_for_full_update = {
            "profile_id": self.test_profile,
            "person": self.test_person.id,
            "comp_official_name": "Jannifer",
            "comp_region": 'E',
            "comp_common_info": "Good Very",
            "comp_phone_number": 123456789012,
            "comp_EDRPOU": 12345678,
            "comp_year_of_foundation": 2005,
            "comp_service_info": 'very good service',
            "comp_product_info": 'very good product',
            "comp_address": 'Kyiv',
            "comp_banner_image": self.wrong_image,
            "person_position": 'director',
            "startup_idea": 'very good idea',
            "is_deleted": False,
            "comp_category": [
                1
            ],
            "comp_activity": [
                1
            ]
        }

        self.right_data_for_create = {
            "person": self.test_person3.id,
            "comp_category": [1],
            "comp_activity": [1]
        }
        self.wrong_data_for_create = {
            "person": self.test_person3,
            "comp_category": 1,
            "comp_activity": 2
        }

    def tearDown(self) -> None:
        self.client.logout()
        if os.path.exists(self.right_image.name):
            os.remove(self.right_image.name)
        if os.path.exists(self.wrong_image.name):
            os.remove(self.wrong_image.name)

    def test_get_profile_unauthorized(self):
        self.client.logout()
        response = self.client.get("/api/profiles/{user1_id}".format(user1_id=1))
        self.assertEqual(401, response.status_code)

    def test_delete_profile_unauthorized(self):
        self.client.logout()
        response = self.client.delete("/api/profiles/{user1_id}".format(user1_id=1))
        self.assertEqual(401, response.status_code)

    def test_get_profile_authorized(self):
        response = self.client.get(f"/api/profiles/{self.test_profile.profile_id}")#{user1_id}".format(user1_id=1))
        self.assertEqual(200, response.status_code, response.content)
        self.assertEqual(False, response.data["is_deleted"])

    def test_get_profile_of_other_user(self):
        response = self.client.get(f"/api/profiles/{self.test_profile2.profile_id}")#{user2_id}".format(user2_id=1))
        self.assertEqual(200, response.status_code, response.content)

    def test_delete_profile_authorized(self):
        # get all before delete
        response = self.client.get("/api/profiles/")
        profiles_len_before_del = len(response.data)
        pk = Profile.objects.get(person_id=self.test_person.id)
        # del profile
        response = self.client.delete(f"/api/profiles/{pk.profile_id}")
        self.assertEqual(204, response.status_code, response.content)
        # check the profile is deleted
        response = self.client.get("/api/profiles/")
        persons = [response.data[i]["person"] for i in range(len(response.data))]
        self.assertEqual(profiles_len_before_del-1, len(response.data))
        self.assertTrue(1 not in persons)
        # try access deleted profile
        response = self.client.get(f"/api/profiles/{pk.profile_id}")
        self.assertEqual(404, response.status_code, response.content)

    def test_delete_profile_of_other_user_authorized(self):
        response = self.client.delete(f"/api/profiles/{self.test_profile2.profile_id}")
        self.assertEqual(404, response.status_code, response.content)

    def test_partial_update_profile_authorized(self):
        response = self.client.patch(
            path=self.update_url,
            data={
                "comp_official_name": "Test_company",
                "comp_year_of_foundation": 2005
            })
        self.assertEqual(200, response.status_code)

    def test_partial_update_profile_with_wrong_image(self):
        response = self.client.patch(
            path=self.update_url,
            data={
                "comp_banner_image": f'/Forum/{self.wrong_image}',
                "comp_year_of_foundation": 2005
            })
        self.assertEqual(400, response.status_code)

    def test_partial_update_profile_unauthorized(self):
        self.client.logout()
        response = self.client.patch(
            path=self.update_url,
            data={
                "comp_official_name": "Test_company",
                "comp_year_of_foundation": 2005
            })
        self.assertEqual(401, response.status_code)

    def test_partial_update_profile_not_exist(self):
        response = self.client.patch(
            path=self.not_exist_profile_url,
            data={
                "comp_official_name": "Test_company",
                "comp_year_of_foundation": 2005
            })
        self.assertEqual(404, response.status_code)

    def test_partial_update_profile_wrong_data(self):
        response = self.client.patch(
            path=self.update_url,
            data={
                "comp_official_name": 12345,
                "comp_year_of_foundation": 'Jane'
            })
        self.assertEqual(400, response.status_code)

    def test_full_update_profile_authorized_with_partial_data(self):
        response = self.client.put(
            path=self.update_url,
            data=self.wrong_full_data_for_full_update)
        self.assertEqual(400, response.status_code)

    def test_full_update_profile_authorized_with_full_data(self):
        response = self.client.put(
            path=self.update_url,
            data=self.right_full_data_for_full_update)
        self.assertEqual(200, response.status_code, response.content)

    def test_full_update_profile_unauthorized(self):
        self.client.logout()
        response = self.client.put(
            path=self.update_url,
            data=self.right_full_data_for_full_update)
        self.assertEqual(401, response.status_code)

    def test_full_update_profile_not_exist(self):
        response = self.client.put(
            path=self.not_exist_profile_url,
            data=self.right_full_data_for_full_update)
        self.assertEqual(404, response.status_code)

    def test_full_update_profile_wrong_data(self):
        response = self.client.put(
            path=self.update_url,
            data=self.wrong_full_data_for_full_update)
        self.assertEqual(400, response.status_code)

    def test_create_profile_authorized(self):
        self.client.logout()
        self.token3 = self.client.post(
            path="/api/auth/token/login/",
            data={
                "person_email": "test3@test.com",
                "password": "Testing01"
            }).data["auth_token"]
        self.client.credentials(HTTP_AUTHORIZATION=f"Token {self.token3}")
        response = self.client.post(
            path=self.base_url,
            data=self.right_data_for_create)
        self.assertEqual(201, response.status_code, response.content)

    def test_create_profile_unauthorized(self):
        self.client.logout()
        response = self.client.post(
            path=self.base_url,
            data=self.right_data_for_create)
        self.assertEqual(401, response.status_code)

    def test_create_profile_already_exist(self):
        response = self.client.post(
            path=self.base_url,
            data=self.right_full_data_for_full_update)
        self.assertEqual(409, response.status_code)

    def test_create_profile_wrong_data(self):
        self.client.logout()
        self.token3 = self.client.post(
            path="/api/auth/token/login/",
            data={
                "person_email": "test3@test.com",
                "password": "Testing01"
            }).data["auth_token"]
        self.client.credentials(HTTP_AUTHORIZATION=f"Token {self.token3}")
        response = self.client.post(
            path=self.base_url,
            data=self.wrong_data_for_create)
        self.assertEqual(400, response.status_code)
