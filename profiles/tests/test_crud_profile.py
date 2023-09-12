import io
import os
from PIL import Image
from rest_framework.test import APITestCase, APIClient

from authentication.models import CustomUser
from profiles.models import Profile, Category, Activity
from utils.dump_response import dump # noqa



class TestProfileDetailAPIView(APITestCase):

    @staticmethod
    def _generate_image(ext, size=(100, 100)):
        '''for mocking png and jpeg files'''
        file = io.BytesIO()
        image = Image.new("RGB", size=size)
        formatext = ext.upper()
        image.save(file, formatext)
        file.name = f"test.{formatext}"
        file.seek(0)
        return file

    def setUp(self) -> None:
        self.test_person_with_profile = CustomUser.objects.create_user(
            person_email="test1@test.com",
            password="Testing01",
            person_name="test1",
            person_surname="test1",
            is_active=True
        )
        self.test_person2_with_profile = CustomUser.objects.create_user(
            person_email="test2@test.com",
            password="Testing01",
            person_name="test2",
            person_surname="test2",
            is_active=True
        )

        self.test_person_without_profile = CustomUser.objects.create_user(
            person_email="test3@test.com",
            password="Testing01",
            person_name="test3",
            person_surname="test3",
            is_active=True
        )

        self.test_profile = Profile.objects.create(
            person=self.test_person_with_profile,
            comp_registered=True,
            comp_is_startup=False,
            comp_official_name="Test 1 official name",
            comp_name="Test 1",
            comp_region="E",
            comp_common_info="Test 1 common info",
            comp_phone_number=380990102034,
            comp_EDRPOU=10000001,
            comp_year_of_foundation=2020,
            comp_service_info="Test 1 service info",
            comp_product_info="Test 1 product info",
            comp_address="Lviv",
            startup_idea="Test 1 start up idea"
        )
        self.test_profile2 = Profile.objects.create(
            person=self.test_person2_with_profile,
            comp_registered=True,
            comp_is_startup=False,
            comp_official_name="Test 2 official name",
            comp_name="Test 2",
            comp_region="E",
            comp_common_info="Test 2 common info",
            comp_phone_number=380990102034,
            comp_EDRPOU=10000002,
            comp_year_of_foundation=2020,
            comp_service_info="Test 2 service info",
            comp_product_info="Test 2 product info",
            comp_address="Kyiv",
            startup_idea="Test 2 start up idea"
        )
        self.test_category = Category.objects.create(name='cheese')
        self.test_category2 = Category.objects.create(name="honey")
        self.test_activity = Activity.objects.create(name='importer')
        self.test_activity2 = Activity.objects.create(name='producer')

        self.right_image = self._generate_image("jpeg", (10, 10))
        self.wrong_image = self._generate_image("png", (3000, 3000))

        self.wrong_full_data_for_full_update = {
            "profile_id": self.test_profile,
            "person": self.test_person_with_profile,
            "comp_official_name": "Jannifer",
            "comp_region": 'Kyiv',
            "comp_common_info": "Good Very",
            "comp_phone_number": 167300044411,
            "comp_EDRPOU": 12345678,
            "comp_year_of_foundation": 2005,
            "comp_service_info": "very good service",
            "comp_product_info": "very good product",
            "comp_address": "Kyiv",
            "startup_idea": "very good idea",
            "is_deleted": False,
            "comp_category": [
                1
            ],
            "comp_activity": [
                2
            ]
        }
        self.right_full_data_for_full_update = {
            "profile_id": self.test_profile,
            "person": self.test_person_with_profile.id,
            "comp_official_name": "Jannifer",
            "comp_region": 'E',
            "comp_common_info": "Good Very",
            "comp_phone_number": 123456789012,
            "comp_EDRPOU": 12345678,
            "comp_year_of_foundation": 2005,
            "comp_service_info": "very good service",
            "comp_product_info": "very good product",
            "comp_address": "Kyiv",
            "comp_banner_image": self.wrong_image,
            "person_position": "director",
            "startup_idea": "very good idea",
            "is_deleted": False,
            "comp_category": [
                self.test_category.category_id
            ],
            "comp_activity": [
                self.test_activity.activity_id
            ]
        }

        self.right_data_for_create = {
            "person": self.test_person_without_profile.id,
            "comp_category": [self.test_category.category_id],
            "comp_activity": [self.test_activity.activity_id]
        }
        self.wrong_data_for_create = {
            "person": self.test_person_without_profile,
            "comp_category": 1,
            "comp_activity": 2
        }

    def tearDown(self) -> None:
        if os.path.exists(self.right_image.name):
            os.remove(self.right_image.name)
        if os.path.exists(self.wrong_image.name):
            os.remove(self.wrong_image.name)

    # GET requests section
    def test_get_profile_nonexistent(self):
        response = self.client.get("/api/profiles/{profile_id}".format(profile_id=100000000000))
        self.assertEqual(404, response.status_code)

    def test_get_profile_unauthorized(self):
        response = self.client.get("/api/profiles/{profile_id}".format(profile_id=self.test_profile2.profile_id))
        self.assertEqual(200, response.status_code, response.content)
        self.assertIsNone(response.data.get("comp_phone_number"))
        self.assertIsNone(response.data.get("email"))
        self.assertEqual({
            "comp_official_name": "Test 2 official name",
            "comp_region": "E",
            "comp_common_info": "Test 2 common info",
            "comp_EDRPOU": 10000002,
            "comp_year_of_foundation": 2020,
            "comp_address": "Kyiv",
            "startup_idea": "Test 2 start up idea",
            "comp_name": "Test 2",
            "comp_registered": True,
            "comp_is_startup": False,
            "comp_service_info": "Test 2 service info",
            "comp_product_info": "Test 2 product info",
            "comp_banner_image": None
        }, response.data
        )

    def test_get_profile_authorized_not_owner(self):
        self.client.force_authenticate(self.test_person_with_profile)
        response = self.client.get("/api/profiles/{profile_id}".format(profile_id=self.test_profile2.profile_id))
        self.assertEqual(200, response.status_code, response.content)
        self.assertIsNone(response.data.get("comp_phone_number"))
        self.assertIsNone(response.data.get("email"))
        self.assertEqual({
            "comp_official_name": "Test 2 official name",
            "comp_region": "E",
            "comp_common_info": "Test 2 common info",
            "comp_EDRPOU": 10000002,
            "comp_year_of_foundation": 2020,
            "comp_address": "Kyiv",
            "startup_idea": "Test 2 start up idea",
            "comp_name": "Test 2",
            "comp_registered": True,
            "comp_is_startup": False,
            "comp_service_info": "Test 2 service info",
            "comp_product_info": "Test 2 product info",
            "comp_banner_image": None
        }, response.data
        )

    def test_get_profile_authorized_owner(self):
        self.client.force_authenticate(self.test_person_with_profile)
        response = self.client.get("/api/profiles/{profile_id}".format(profile_id=self.test_profile.profile_id))
        self.assertEqual(200, response.status_code, response.content)
        self.assertEqual(
            {
                "profile_id": self.test_profile.profile_id,
                "person": self.test_person_with_profile.id,
                "is_saved": False,
                "comp_name": "Test 1",
                "comp_registered": True,
                "comp_is_startup": False,
                "comp_official_name": "Test 1 official name",
                "comp_region": "E",
                "comp_common_info": "Test 1 common info",
                "comp_phone_number": "380990102034",
                "comp_EDRPOU": 10000001,
                "comp_year_of_foundation": 2020,
                "comp_service_info": "Test 1 service info",
                "comp_product_info": "Test 1 product info",
                "comp_address": "Lviv",
                "comp_banner_image": None,
                "person_position": None,
                "startup_idea": "Test 1 start up idea",
                "is_deleted": False,
                "comp_category": [],
                "comp_activity": []
            }, response.data
        )

    def test_get_contact_info_unauthorized(self):
        response = self.client.get("/api/profiles/{profile_id}?with_contacts=True".format(
            profile_id=self.test_profile2.profile_id))
        self.assertEqual(401, response.status_code)

    def test_get_contact_info_authorized(self):
        self.client.force_authenticate(self.test_person_with_profile)
        response = self.client.get("/api/profiles/{profile_id}?with_contacts=True".format(
            profile_id=self.test_profile2.profile_id))
        self.assertEqual(200, response.status_code)
        self.assertEqual(
            {
                "comp_phone_number": "380990102034",
                "email": "test2@test.com"
            },
            response.data
        )

    # DELETE requests section
    def test_delete_profile_unauthorized(self):
        response = self.client.delete("/api/profiles/{profile_id}".format(profile_id=self.test_person_with_profile.id))
        self.assertEqual(404, response.status_code)

    def test_delete_profile_authorized(self):
        self.client.force_authenticate(self.test_person_with_profile)
        # get all before delete
        response = self.client.get("/api/profiles/")
        profiles_len_before_del = len(response.data["results"])
        user_profile = Profile.objects.get(person_id=self.test_person_with_profile.id)
        # del profile
        response = self.client.delete("/api/profiles/{profile_id}".format(profile_id=user_profile.profile_id))
        self.assertEqual(204, response.status_code)
        # check the profile is deleted
        response = self.client.get("/api/profiles/")
        profile_id_list = [profile['profile_id'] for profile in response.data["results"]]
        self.assertEqual(profiles_len_before_del - 1, len(response.data["results"]))
        self.assertTrue(user_profile.profile_id not in profile_id_list)
        # try access deleted profile
        response = self.client.get("/api/profiles/{profile_id}".format(profile_id=user_profile.profile_id))
        self.assertEqual(404, response.status_code, response.content)

    def test_delete_profile_of_other_user_authorized(self):
        self.client.force_authenticate(self.test_person_with_profile)
        response = self.client.delete("/api/profiles/{profile_id}".format(profile_id=self.test_profile2.profile_id))
        self.assertEqual(403, response.status_code)

    # PATCH requests section
    def test_partial_update_profile_authorized(self):
        self.client.force_authenticate(self.test_person_with_profile)
        response = self.client.patch(
            path="/api/profiles/{profile_id}".format(profile_id=self.test_profile.profile_id),
            data={
                "comp_official_name": "Test_company",
                "comp_year_of_foundation": 2005
            })
        self.assertEqual(200, response.status_code)

    def test_partial_update_authorized_not_owner(self):
        self.client.force_authenticate(self.test_person_with_profile)
        response = self.client.patch(
            path="/api/profiles/{profile_id}".format(profile_id=self.test_profile2.profile_id),
            data={
                "comp_official_name": "Test_company",
                "comp_year_of_foundation": 2005
            })
        self.assertEqual(403, response.status_code)

    def test_partial_update_profile_with_wrong_image(self):
        self.client.force_authenticate(self.test_person_with_profile)
        response = self.client.patch(
            path="/api/profiles/{profile_id}".format(profile_id=self.test_profile.profile_id),
            data={
                "comp_banner_image": f'/Forum/{self.wrong_image}',
                "comp_year_of_foundation": 2005
            })
        self.assertEqual(400, response.status_code)

    def test_partial_update_profile_unauthorized(self):
        response = self.client.patch(
            path="/api/profiles/{profile_id}".format(profile_id=self.test_profile.profile_id),
            data={
                "comp_official_name": "Test_company",
                "comp_year_of_foundation": 2005
            })
        self.assertEqual(401, response.status_code)

    def test_partial_update_profile_not_exist(self):
        self.client.force_authenticate(self.test_person_with_profile)
        response = self.client.patch(
            path="/api/profiles/{profile_id}".format(profile_id=1000000000000),
            data={
                "comp_official_name": "Test_company",
                "comp_year_of_foundation": 2005
            })
        self.assertEqual(404, response.status_code)

    def test_partial_update_profile_wrong_data(self):
        self.client.force_authenticate(self.test_person_with_profile)
        response = self.client.patch(
            path="/api/profiles/{profile_id}".format(profile_id=self.test_profile.profile_id),
            data={
                "comp_official_name": 12345,
                "comp_year_of_foundation": "Jane"
            })
        self.assertEqual(400, response.status_code)

    def test_partial_update_profile_category(self):
        self.client.force_authenticate(self.test_person_with_profile)
        response = self.client.patch(
            path="/api/profiles/{profile_id}".format(profile_id=self.test_profile.profile_id),
            data={
                "comp_category": [self.test_category.category_id, self.test_category2.category_id]
            }
        )
        self.assertEqual(200, response.status_code)
        self.assertEqual([self.test_category.category_id, self.test_category2.category_id], response.data.get('comp_category'))

    def test_partial_update_profile_activity(self):
        self.client.force_authenticate(self.test_person_with_profile)
        response = self.client.patch(
            path="/api/profiles/{profile_id}".format(profile_id=self.test_profile.profile_id),
            data={
                "comp_activity": [self.test_activity.activity_id, self.test_activity2.activity_id]
            }
        )
        self.assertEqual(200, response.status_code)
        self.assertEqual([self.test_activity.activity_id, self.test_activity2.activity_id], response.data.get('comp_activity'))

    # PUT requests section
    def test_full_update_profile_authorized_with_partial_data(self):
        self.client.force_authenticate(self.test_person_with_profile)
        response = self.client.put(
            path="/api/profiles/{profile_id}".format(profile_id=self.test_profile.profile_id),
            data=self.wrong_full_data_for_full_update)
        self.assertEqual(400, response.status_code)

    def test_full_update_profile_authorized_with_full_data(self):
        self.client.force_authenticate(self.test_person_with_profile)
        response = self.client.put(
            path="/api/profiles/{profile_id}".format(profile_id=self.test_profile.profile_id),
            data=self.right_full_data_for_full_update)
        self.assertEqual(200, response.status_code, response.content)

    def test_full_update_profile_unauthorized(self):
        response = self.client.put(
            path="/api/profiles/{profile_id}".format(profile_id=self.test_profile.profile_id),
            data=self.right_full_data_for_full_update)
        self.assertEqual(401, response.status_code)

    def test_full_update_profile_not_exist(self):
        self.client.force_authenticate(self.test_person_with_profile)
        response = self.client.put(
            path="/api/profiles/{profile_id}".format(profile_id=10000000000),
            data=self.right_full_data_for_full_update)
        self.assertEqual(404, response.status_code)

    def test_full_update_profile_wrong_data(self):
        self.client.force_authenticate(self.test_person_with_profile)
        response = self.client.put(
            path="/api/profiles/{profile_id}".format(profile_id=self.test_profile.profile_id),
            data=self.wrong_full_data_for_full_update)
        self.assertEqual(400, response.status_code)

    def test_full_update_authorized_not_owner(self):
        self.client.force_authenticate(self.test_person_with_profile)
        response = self.client.put(
            path="/api/profiles/{profile_id}".format(profile_id=self.test_profile2.profile_id),
            data=self.right_full_data_for_full_update)
        self.assertEqual(403, response.status_code, response.content)

    # POST requests section
    def test_create_profile_authorized(self):
        self.client.force_authenticate(self.test_person_without_profile)
        response = self.client.post(
            path="/api/profiles/",
            data=self.right_data_for_create)
        self.assertEqual(201, response.status_code, response.content)

    def test_create_profile_unauthorized(self):
        response = self.client.post(
            path="/api/profiles/",
            data=self.right_data_for_create)
        self.assertEqual(401, response.status_code)

    def test_create_profile_already_exist(self):
        self.client.force_authenticate(self.test_person_with_profile)
        response = self.client.post(
            path="/api/profiles/",
            data=self.right_full_data_for_full_update)
        self.assertEqual(409, response.status_code)

    def test_create_profile_wrong_data(self):
        self.client.force_authenticate(self.test_person_without_profile)
        response = self.client.post(
            path="/api/profiles/",
            data=self.wrong_data_for_create)
        self.assertEqual(400, response.status_code)
