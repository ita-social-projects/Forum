import os
from io import BytesIO

from PIL import Image
from rest_framework import status
from rest_framework.test import APITestCase

from authentication.factories import UserFactory
from profiles.factories import ProfileStartupFactory, CategoryFactory, ActivityFactory
from profiles.models import Region
from utils.dump_response import dump  # noqa
from utils.unittest_helper import AnyInt


class TestProfileDetailAPIView(APITestCase):

    @staticmethod
    def _generate_image(ext, size=(100, 100)):
        """for mocking png and jpeg files"""
        file = BytesIO()
        image = Image.new("RGB", size=size)
        formatext = ext.upper()
        image.save(file, formatext)
        file.name = f"test.{formatext}"
        file.seek(0)
        return file

    def setUp(self) -> None:
        self.right_image = self._generate_image("jpeg", (10, 10))
        self.wrong_image = self._generate_image("png", (3000, 3000))
        self.user = UserFactory(email="test1@test.com")
        self.profile = ProfileStartupFactory.create(
            person=self.user,
            official_name="Test Official Startup",
            phone='380100102034',
            edrpou=99999999
        )

    def tearDown(self) -> None:
        if os.path.exists(self.right_image.name):
            os.remove(self.right_image.name)
        if os.path.exists(self.wrong_image.name):
            os.remove(self.wrong_image.name)

    # GET requests section
    def test_get_profile_nonexistent(self):
        response = self.client.get(path="/api/profiles/{profile_id}".format(profile_id=0))
        self.assertEqual(status.HTTP_404_NOT_FOUND, response.status_code)

    def test_get_profile_unauthorized(self):
        response = self.client.get(path="/api/profiles/{profile_id}".format(profile_id=self.profile.id))
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertIsNone(response.data.get("phone"))
        self.assertIsNone(response.data.get("email"))

        # fields check
        self.assertEqual(self.profile.official_name, response.data.get("official_name"),
                         msg="Official names do not match.")
        self.assertEqual(self.profile.region, response.data.get("region"),
                         msg="Regions do not match.")
        self.assertEqual(self.profile.common_info, response.data.get("common_info"),
                         msg="Common info do not match.")
        self.assertEqual(self.profile.edrpou, response.data.get("edrpou"),
                         msg="EDRPOUs do not match.")
        self.assertEqual(self.profile.founded, response.data.get("founded"),
                         msg="Years of foundation do not match.")
        self.assertEqual(self.profile.address, response.data.get("address"),
                         msg="Addresses do not match.")
        self.assertEqual(self.profile.startup_idea, response.data.get("startup_idea"),
                         msg="Startup ideas do not match.")
        self.assertEqual(self.profile.name, response.data.get("name"),
                         msg="Company names do not match")
        self.assertEqual(self.profile.is_registered, response.data.get("is_registered"),
                         msg="Company is registered fields do not match.")
        self.assertEqual(self.profile.is_startup, response.data.get("is_startup"),
                         msg="Company is startup fields do not match.")
        self.assertEqual(self.profile.service_info, response.data.get("service_info"),
                         msg="Service info do not match.")
        self.assertEqual(self.profile.product_info, response.data.get("product_info"),
                         msg="Product info do not match.")
        self.assertEqual(self.profile.banner_image, response.data.get("banner_image"),
                         msg="Banner images do not match.")
        self.assertIsNone(response.data.get("categories"),
                          msg="Categories do not match.")
        self.assertIsNone(response.data.get("activities"),
                          msg="Activities do not match.")

    def test_get_profile_authorized_not_owner(self):
        profile2 = ProfileStartupFactory(official_name="Test Official Startup from test case")
        self.client.force_authenticate(self.user)

        response = self.client.get(path="/api/profiles/{profile_id}".format(profile_id=profile2.id))
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertIsNone(response.data.get("phone"))
        self.assertIsNone(response.data.get("email"))

        # fields check
        self.assertEqual(profile2.official_name, response.data.get("official_name"),
                         msg="Official names do not match.")
        self.assertEqual(profile2.region, response.data.get("region"),
                         msg="Regions do not match.")
        self.assertEqual(profile2.common_info, response.data.get("common_info"),
                         msg="Common info do not match.")
        self.assertEqual(profile2.edrpou, response.data.get("edrpou"),
                         msg="EDRPOUs do not match.")
        self.assertEqual(profile2.founded, response.data.get("founded"),
                         msg="Years of foundation do not match.")
        self.assertEqual(profile2.address, response.data.get("address"),
                         msg="Addresses do not match.")
        self.assertEqual(profile2.startup_idea, response.data.get("startup_idea"),
                         msg="Startup ideas do not match.")
        self.assertEqual(profile2.name, response.data.get("name"),
                         msg="Company names do not match")
        self.assertEqual(profile2.is_registered, response.data.get("is_registered"),
                         msg="Company is registered fields do not match.")
        self.assertEqual(profile2.is_startup, response.data.get("is_startup"),
                         msg="Company is startup fields do not match.")
        self.assertEqual(profile2.service_info, response.data.get("service_info"),
                         msg="Service info do not match.")
        self.assertEqual(profile2.product_info, response.data.get("product_info"),
                         msg="Product info do not match.")
        self.assertEqual(self.profile.banner_image, response.data.get("banner_image"),
                         msg="Banner images do not match.")
        self.assertIsNone(response.data.get("categories"),
                          msg="Categories do not match.")
        self.assertIsNone(response.data.get("activities"),
                          msg="Activities do not match.")

    def test_get_profile_authorized_owner(self):
        self.client.force_authenticate(self.user)

        response = self.client.get("/api/profiles/{profile_id}".format(profile_id=self.profile.id))
        self.assertEqual(status.HTTP_200_OK, response.status_code)

        # fields check
        self.assertEqual(self.profile.id, response.data.get("id"),
                         msg="IDs do not match.")
        self.assertEqual(self.profile.person.id, response.data.get("person"),
                         msg="Persons do not match.")
        self.assertFalse(response.data.get("is_saved"), msg="is_saved shouldn't be True.")
        self.assertEqual(self.profile.official_name, response.data.get("official_name"),
                         msg="Official names do not match.")
        self.assertEqual(self.profile.region, response.data.get("region"),
                         msg="Regions do not match.")
        self.assertEqual(self.profile.common_info, response.data.get("common_info"),
                         msg="Common info do not match.")
        self.assertEqual(self.profile.phone, response.data.get("phone"),
                         msg="Phone numbers do not match.")
        self.assertEqual(self.profile.edrpou, response.data.get("edrpou"),
                         msg="EDRPOUs do not match.")
        self.assertEqual(self.profile.founded, response.data.get("founded"),
                         msg="Years of foundation do not match.")
        self.assertEqual(self.profile.address, response.data.get("address"),
                         msg="Addresses do not match.")
        self.assertEqual(self.profile.startup_idea, response.data.get("startup_idea"),
                         msg="Startup ideas do not match.")
        self.assertEqual(self.profile.name, response.data.get("name"),
                         msg="Company names do not match")
        self.assertEqual(self.profile.is_registered, response.data.get("is_registered"),
                         msg="Company is registered fields do not match.")
        self.assertEqual(self.profile.is_startup, response.data.get("is_startup"),
                         msg="Company is startup fields do not match.")
        self.assertEqual(self.profile.service_info, response.data.get("service_info"),
                         msg="Service info do not match.")
        self.assertEqual(self.profile.product_info, response.data.get("product_info"),
                         msg="Product info do not match.")
        self.assertEqual(self.profile.banner_image, response.data.get("banner_image"),
                         msg="Banner images do not match.")
        self.assertEqual(list(self.profile.categories.all()), response.data.get("categories"),
                         msg="Categories do not match.")
        self.assertEqual(list(self.profile.activities.all()), response.data.get("activities"),
                         msg="Activities do not match.")

    def test_get_contact_info_unauthorized(self):
        response = self.client.get(
            path="/api/profiles/{profile_id}?with_contacts=True".format(profile_id=self.profile.id))
        self.assertEqual(status.HTTP_401_UNAUTHORIZED, response.status_code)

    def test_get_contact_info_authorized(self):
        user2 = UserFactory()
        self.client.force_authenticate(user2)

        response = self.client.get(
            path="/api/profiles/{profile_id}?with_contacts=True".format(profile_id=self.profile.id))
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertEqual(self.profile.phone, response.data.get("phone"),
                         msg="Phone numbers do not match.")
        self.assertEqual(self.profile.person.email, response.data.get("email"),
                         msg="Emails do not match.")

    # DELETE requests section
    def test_delete_profile_unauthorized(self):
        response = self.client.delete(
            path="/api/profiles/{profile_id}".format(profile_id=self.profile.id))
        self.assertEqual(status.HTTP_401_UNAUTHORIZED, response.status_code)

    def test_delete_profile_authorized(self):
        self.client.force_authenticate(self.user)

        # del profile
        response = self.client.delete(path="/api/profiles/{profile_id}".format(profile_id=self.profile.id))
        self.assertEqual(204, response.status_code)

        # check the profile is deleted
        response = self.client.get(path="/api/profiles/")
        self.assertEqual(0, response.data["total_items"])
        self.profile.refresh_from_db()
        self.assertTrue(self.profile.is_deleted)

        # try access deleted profile
        response = self.client.get("/api/profiles/{profile_id}".format(profile_id=self.profile.id))
        self.assertEqual(status.HTTP_404_NOT_FOUND, response.status_code)

    def test_delete_profile_of_other_user_authorized(self):
        profile2 = ProfileStartupFactory()
        self.client.force_authenticate(self.user)

        response = self.client.delete(path="/api/profiles/{profile_id}".format(profile_id=profile2.id))
        self.assertEqual(403, response.status_code)

    # # PATCH requests section
    def test_partial_update_profile_authorized(self):
        self.client.force_authenticate(self.user)

        response = self.client.patch(
            path="/api/profiles/{profile_id}".format(profile_id=self.profile.id),
            data={
                "official_name": "Test_company",
                "founded": 2005
            })
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertEqual(2005, response.data.get("founded"))
        self.assertEqual("Test_company", response.data.get("official_name"))

    def test_partial_update_authorized_not_owner(self):
        profile2 = ProfileStartupFactory()
        self.client.force_authenticate(self.user)

        response = self.client.patch(
            path="/api/profiles/{profile_id}".format(profile_id=profile2.id),
            data={
                "official_name": "Test_company",
                "founded": 2005
            })
        self.assertEqual(status.HTTP_403_FORBIDDEN, response.status_code)

    def test_partial_update_profile_with_wrong_image(self):
        self.client.force_authenticate(self.user)

        response = self.client.patch(
            path="/api/profiles/{profile_id}".format(profile_id=self.profile.id),
            data={
                "banner_image": f'/Forum/{self.wrong_image}',
                "founded": 2005
            })
        self.assertEqual(status.HTTP_400_BAD_REQUEST, response.status_code)

    def test_partial_update_profile_unauthorized(self):
        response = self.client.patch(
            path="/api/profiles/{profile_id}".format(profile_id=self.profile.id),
            data={
                "official_name": "Test_company",
                "founded": 2005
            })
        self.assertEqual(status.HTTP_401_UNAUTHORIZED, response.status_code)

    def test_partial_update_profile_not_exist(self):
        self.client.force_authenticate(self.user)

        response = self.client.patch(
            path="/api/profiles/{profile_id}".format(profile_id=0),
            data={
                "official_name": "Test_company",
                "founded": 2005
            })
        self.assertEqual(status.HTTP_404_NOT_FOUND, response.status_code)

    def test_partial_update_profile_wrong_data(self):
        self.client.force_authenticate(self.user)

        response = self.client.patch(
            path="/api/profiles/{profile_id}".format(profile_id=self.profile.id),
            data={
                "official_name": 12345,
                "founded": "Jane"
            })
        self.assertEqual(status.HTTP_400_BAD_REQUEST, response.status_code)

    def test_partial_update_profile_category(self):
        category = CategoryFactory()
        self.client.force_authenticate(self.user)

        response = self.client.patch(
            path="/api/profiles/{profile_id}".format(profile_id=self.profile.id),
            data={
                "categories": [category.id]
            }
        )
        self.assertEqual(200, response.status_code)
        self.assertEqual([category.id], response.data.get('categories'))

    def test_partial_update_profile_activity(self):
        activity = ActivityFactory()
        self.client.force_authenticate(self.user)

        response = self.client.patch(
            path="/api/profiles/{profile_id}".format(profile_id=self.profile.id),
            data={
                "activities": [activity.id]
            }
        )
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertEqual([activity.id], response.data.get('activities'))

    # # PUT requests section
    def test_full_update_profile_authorized_with_partial_data(self):
        self.client.force_authenticate(self.user)

        response = self.client.put(
            path="/api/profiles/{profile_id}".format(profile_id=self.profile.id),
            data={
                "region": Region.DNIPRO_REGION,
                "phone": '380100109934'
            })
        self.assertEqual(status.HTTP_400_BAD_REQUEST, response.status_code)

    def test_full_update_profile_authorized_with_full_data(self):
        category = CategoryFactory()
        activity = ActivityFactory()
        self.client.force_authenticate(self.user)

        response = self.client.put(
            path="/api/profiles/{profile_id}".format(profile_id=self.profile.id),
            data={
                "person": self.user.id,
                "official_name": "Official name from test case",
                "region": Region.KYIV,
                "common_info": "Common info from test case",
                "phone": '123456789012',
                "edrpou": 12345678,
                "founded": 2005,
                "service_info": "Service info from test case",
                "product_info": "Product info from test case",
                "address": "Kyiv",
                "banner_image": self.right_image,
                "person_position": "director",
                "startup_idea": "StartUp idea from test case",
                "is_startup": True,
                "is_registered": False,
                "name": "Comp name from test case",
                "categories": [
                    category.id
                ],
                "activities": [
                    activity.id
                ]
            })
        self.assertEqual(status.HTTP_200_OK, response.status_code)

    def test_full_update_profile_unauthorized(self):
        category = CategoryFactory()
        activity = ActivityFactory()

        response = self.client.put(
            path="/api/profiles/{profile_id}".format(profile_id=self.profile.id),
            data={
                "person": self.user.id,
                "official_name": "Official name from test case",
                "region": Region.KYIV,
                "common_info": "Common info from test case",
                "phone": '123456789012',
                "edrpou": 12345678,
                "founded": 2005,
                "service_info": "Service info from test case",
                "product_info": "Product info from test case",
                "address": "Kyiv",
                "banner_image": self.right_image,
                "person_position": "director",
                "startup_idea": "StartUp idea from test case",
                "is_startup": True,
                "is_registered": False,
                "name": "Comp name from test case",
                "categories": [
                    category.id
                ],
                "activities": [
                    activity.id
                ]
            })
        self.assertEqual(status.HTTP_401_UNAUTHORIZED, response.status_code)

    def test_full_update_profile_not_exist(self):
        self.client.force_authenticate(self.user)

        response = self.client.put(
            path="/api/profiles/{profile_id}".format(profile_id=0),
            data={
                "person": self.user.id,
                "official_name": "Official name from test case",
                "region": Region.KYIV,
                "common_info": "Common info from test case",
                "phone": '123456789012',
                "edrpou": 12345678,
                "founded": 2005,
                "service_info": "Service info from test case",
                "product_info": "Product info from test case",
                "address": "Kyiv",
                "banner_image": self.right_image,
                "person_position": "director",
                "startup_idea": "StartUp idea from test case",
                "is_startup": True,
                "is_registered": False,
                "name": "Comp name from test case",
            })
        self.assertEqual(status.HTTP_404_NOT_FOUND, response.status_code)

    def test_full_update_profile_wrong_data(self):
        self.client.force_authenticate(self.user)

        response = self.client.put(
            path="/api/profiles/{profile_id}".format(profile_id=self.profile.id),
            data={
                "person": self.user.id,
                "official_name": "Official name from test case",
                "region": Region.KYIV,
                "common_info": "Common info from test case",
                "phone": '123456789012',
                "edrpou": 12345678,
                "founded": 2005,
                "service_info": "Service info from test case",
                "product_info": "Product info from test case",
                "address": "Kyiv",
                "banner_image": self.wrong_image,
                "person_position": "director",
                "startup_idea": "StartUp idea from test case",
                "is_startup": True,
                "is_registered": False,
                "name": "Comp name from test case",
                "categories": [
                    "5"
                ],
                "activities": [
                    "39"
                ]
            })
        self.assertEqual(status.HTTP_400_BAD_REQUEST, response.status_code)

    def test_full_update_authorized_not_owner(self):
        user2 = UserFactory()
        self.client.force_authenticate(user2)
        response = self.client.put(
            path="/api/profiles/{profile_id}".format(profile_id=self.profile.id),
            data={
                "person": self.user.id,
                "official_name": "Official name from test case",
                "region": Region.KYIV,
                "common_info": "Common info from test case",
                "phone": '123456789012',
                "edrpou": 12345678,
                "founded": 2005,
                "service_info": "Service info from test case",
                "product_info": "Product info from test case",
                "address": "Kyiv",
                "banner_image": self.right_image,
                "person_position": "director",
                "startup_idea": "StartUp idea from test case",
                "is_startup": True,
                "is_registered": False,
                "name": "Comp name from test case",
                "categories": [
                    1
                ],
                "activities": [
                    2
                ]
            })
        self.assertEqual(status.HTTP_403_FORBIDDEN, response.status_code)

    # # POST requests section
    def test_create_profile_authorized_required_data_only(self):
        user2 = UserFactory()
        category = CategoryFactory()
        activity = ActivityFactory()
        new_profile_data = {
            "person": user2.id,
            "categories": [category.id],
            "activities": [activity.id]
        }
        self.client.force_authenticate(user2)

        response = self.client.post(
            path="/api/profiles/",
            data=new_profile_data)

        self.assertEqual(status.HTTP_201_CREATED, response.status_code, response.content)

        self.assertEqual(AnyInt(), response.data.get("id"),
                         msg="IDs do not match.")
        self.assertEqual(user2.id, response.data.get("person"),
                         msg="Persons do not match.")
        self.assertEqual(new_profile_data.get("comp_name"), response.data.get("comp_name"),
                         msg="Company names do not match")
        self.assertEqual(new_profile_data.get("categories"), response.data.get("categories"),
                         msg="Categories do not match.")
        self.assertEqual(new_profile_data.get("activities"), response.data.get("activities"),
                         msg="Activities do not match.")

    def test_create_profile_authorized_full_data(self):
        user2 = UserFactory()
        category = CategoryFactory()
        activity = ActivityFactory()
        new_profile_data = {
            "person": user2.id,
            "official_name": "Official name from test case",
            "region": Region.KYIV,
            "common_info": "Common info from test case",
            "phone": '123456789012',
            "edrpou": 12345678,
            "founded": 2005,
            "service_info": "Service info from test case",
            "product_info": "Product info from test case",
            "address": "Kyiv",
            "person_position": "director",
            "startup_idea": "StartUp idea from test case",
            "is_startup": True,
            "is_registered": False,
            "name": "Comp name from test case",
            "categories": [
                category.id
            ],
            "activities": [
                activity.id
            ]
        }

        self.client.force_authenticate(user2)

        response = self.client.post(
            path="/api/profiles/",
            data=new_profile_data)
        self.assertEqual(status.HTTP_201_CREATED, response.status_code)

        self.assertEqual(AnyInt(), response.data.get("id"),
                         msg="IDs do not match.")
        self.assertEqual(user2.id, response.data.get("person"),
                         msg="Persons do not match.")
        self.assertFalse(response.data.get("is_saved"), msg="is_saved shouldn't be True.")
        self.assertEqual(new_profile_data.get("official_name"), response.data.get("official_name"),
                         msg="Official names do not match.")
        self.assertEqual(new_profile_data.get("region"), response.data.get("region"),
                         msg="Regions do not match.")
        self.assertEqual(new_profile_data.get("common_info"), response.data.get("common_info"),
                         msg="Common info do not match.")
        self.assertEqual(new_profile_data.get("phone"), response.data.get("phone"),
                         msg="Phone numbers do not match.")
        self.assertEqual(new_profile_data.get("edrpou"), response.data.get("edrpou"),
                         msg="EDRPOUs do not match.")
        self.assertEqual(new_profile_data.get("founded"), response.data.get("founded"),
                         msg="Years of foundation do not match.")
        self.assertEqual(new_profile_data.get("address"), response.data.get("address"),
                         msg="Addresses do not match.")
        self.assertEqual(new_profile_data.get("startup_idea"), response.data.get("startup_idea"),
                         msg="Startup ideas do not match.")
        self.assertEqual(new_profile_data.get("name"), response.data.get("name"),
                         msg="Company names do not match")
        self.assertEqual(new_profile_data.get("is_registered"), response.data.get("is_registered"),
                         msg="Company is registered fields do not match.")
        self.assertEqual(new_profile_data.get("is_startup"), response.data.get("is_startup"),
                         msg="Company is startup fields do not match.")
        self.assertEqual(new_profile_data.get("service_info"), response.data.get("service_info"),
                         msg="Service info do not match.")
        self.assertEqual(new_profile_data.get("product_info"), response.data.get("product_info"),
                         msg="Product info do not match.")
        self.assertEqual(new_profile_data.get("categories"), response.data.get("categories"),
                         msg="Categories do not match.")
        self.assertEqual(new_profile_data.get("activities"), response.data.get("activities"),
                         msg="Activities do not match.")

    def test_create_profile_unauthorized(self):
        user2 = UserFactory()
        category = CategoryFactory()
        activity = ActivityFactory()

        response = self.client.post(
            path="/api/profiles/",
            data={
                "person": user2.id,
                "categories": [category.id],
                "activities": [activity.id]
            })
        self.assertEqual(status.HTTP_401_UNAUTHORIZED, response.status_code)

    def test_create_profile_already_exists(self):
        category = CategoryFactory()
        activity = ActivityFactory()
        self.client.force_authenticate(self.user)

        response = self.client.post(
            path="/api/profiles/",
            data={
                "person": self.user.id,
                "categories": [category.id],
                "activities": [activity.id]
            })
        self.assertEqual(status.HTTP_409_CONFLICT, response.status_code)

    def test_create_profile_wrong_data(self):
        user2 = UserFactory()
        self.client.force_authenticate(user2)

        response = self.client.post(
            path="/api/profiles/",
            data={
                "person": user2.id,
                "categories": ['1'],
                "activities": ['2']
            })
        self.assertEqual(400, response.status_code)
