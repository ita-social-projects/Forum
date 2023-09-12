from io import BytesIO
import os
from PIL import Image
from rest_framework.test import APITestCase
from rest_framework import status

from profiles.factories import ProfileStartupFactory, CategoryFactory, ActivityFactory
from authentication.factories import UserFactory

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
        self.user = UserFactory(person_email="test1@test.com")
        self.profile = ProfileStartupFactory.create(
            person=self.user,
            comp_official_name="Test Official Startup",
            comp_phone_number='380100102034',
            comp_EDRPOU=99999999
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
        response = self.client.get(path="/api/profiles/{profile_id}".format(profile_id=self.profile.profile_id))
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertIsNone(response.data.get("comp_phone_number"))
        self.assertIsNone(response.data.get("email"))
        self.assertEqual({
            "comp_official_name": "Test Official Startup",
            "comp_region": "E",
            "comp_common_info": "test common info",
            "comp_EDRPOU": 99999999,
            "comp_year_of_foundation": 2022,
            "comp_address": "Test Country, Test City, St. Test, 1",
            "startup_idea": "Test startup idea",
            "comp_name": "Test Comp name",
            "comp_registered": False,
            "comp_is_startup": True,
            "comp_service_info": "test service info",
            "comp_product_info": "test product info",
            "comp_banner_image": None
        }, response.data
        )

    def test_get_profile_authorized_not_owner(self):
        profile2 = ProfileStartupFactory()
        self.client.force_authenticate(self.user)

        response = self.client.get(path="/api/profiles/{profile_id}".format(profile_id=profile2.profile_id))
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertIsNone(response.data.get("comp_phone_number"))
        self.assertIsNone(response.data.get("email"))

    def test_get_profile_authorized_owner(self):
        self.client.force_authenticate(self.user)

        response = self.client.get("/api/profiles/{profile_id}".format(profile_id=self.profile.profile_id))
        self.assertEqual(200, response.status_code, response.content)
        self.assertEqual(
            {
                "profile_id": self.profile.profile_id,
                "person": self.user.id,
                "is_saved": False,
                "comp_name": "Test Comp name",
                "comp_registered": False,
                "comp_is_startup": True,
                "comp_official_name": "Test Official Startup",
                "comp_region": "E",
                "comp_common_info": "test common info",
                "comp_phone_number": "380100102034",
                "comp_EDRPOU": 99999999,
                "comp_year_of_foundation": 2022,
                "comp_service_info": "test service info",
                "comp_product_info": "test product info",
                "comp_address": "Test Country, Test City, St. Test, 1",
                "comp_banner_image": None,
                "person_position": "Test",
                "startup_idea": "Test startup idea",
                "is_deleted": False,
                "comp_category": [],
                "comp_activity": []
            }, response.data
        )
        self.client.force_authenticate(self.user)
        response = self.client.get(
            path="/api/profiles/{profile_id}".format(profile_id=self.profile.profile_id))
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertIsNotNone(response.data.get("comp_phone_number"))

    def test_get_contact_info_unauthorized(self):
        response = self.client.get(
            path="/api/profiles/{profile_id}?with_contacts=True".format(profile_id=self.profile.profile_id))
        self.assertEqual(status.HTTP_401_UNAUTHORIZED, response.status_code)

    def test_get_contact_info_authorized(self):
        user2 = UserFactory()
        self.client.force_authenticate(user2)
        response = self.client.get(
            path="/api/profiles/{profile_id}?with_contacts=True".format(profile_id=self.profile.profile_id))
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertEqual(
            {
                "comp_phone_number": "380100102034",
                "email": 'test1@test.com'
            },
            response.data
        )

    # DELETE requests section
    def test_delete_profile_unauthorized(self):
        response = self.client.delete(
            path="/api/profiles/{profile_id}".format(profile_id=self.profile.profile_id))
        self.assertEqual(status.HTTP_401_UNAUTHORIZED, response.status_code)

    def test_delete_profile_authorized(self):
        self.client.force_authenticate(self.user)

        # del profile
        response = self.client.delete(path="/api/profiles/{profile_id}".format(profile_id=self.profile.profile_id))
        self.assertEqual(204, response.status_code)

        # check the profile is deleted
        response = self.client.get(path="/api/profiles/")
        self.assertEqual(0, response.data["total_items"])
        self.profile.refresh_from_db()
        self.assertTrue(self.profile.is_deleted)

        # try access deleted profile
        response = self.client.get("/api/profiles/{profile_id}".format(profile_id=self.profile.profile_id))
        self.assertEqual(status.HTTP_404_NOT_FOUND, response.status_code)

    def test_delete_profile_of_other_user_authorized(self):
        profile2 = ProfileStartupFactory()
        self.client.force_authenticate(self.user)

        response = self.client.delete(path="/api/profiles/{profile_id}".format(profile_id=profile2.profile_id))
        self.assertEqual(403, response.status_code)

    # PATCH requests section
    def test_partial_update_profile_authorized(self):
        self.client.force_authenticate(self.user)

        response = self.client.patch(
            path="/api/profiles/{profile_id}".format(profile_id=self.profile.profile_id),
            data={
                "comp_official_name": "Test_company",
                "comp_year_of_foundation": 2005
            })
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertEqual(2005, response.data.get("comp_year_of_foundation"))
        self.assertEqual("Test_company", response.data.get("comp_official_name"))

    def test_partial_update_authorized_not_owner(self):
        profile2 = ProfileStartupFactory()
        self.client.force_authenticate(self.user)

        response = self.client.patch(
            path="/api/profiles/{profile_id}".format(profile_id=profile2.profile_id),
            data={
                "comp_official_name": "Test_company",
                "comp_year_of_foundation": 2005
            })
        self.assertEqual(status.HTTP_403_FORBIDDEN, response.status_code)

    def test_partial_update_profile_with_wrong_image(self):
        self.client.force_authenticate(self.user)

        response = self.client.patch(
            path="/api/profiles/{profile_id}".format(profile_id=self.profile.profile_id),
            data={
                "comp_banner_image": f'/Forum/{self.wrong_image}',
                "comp_year_of_foundation": 2005
            })
        self.assertEqual(status.HTTP_400_BAD_REQUEST, response.status_code)

    def test_partial_update_profile_unauthorized(self):
        response = self.client.patch(
            path="/api/profiles/{profile_id}".format(profile_id=self.profile.profile_id),
            data={
                "comp_official_name": "Test_company",
                "comp_year_of_foundation": 2005
            })
        self.assertEqual(status.HTTP_401_UNAUTHORIZED, response.status_code)

    def test_partial_update_profile_not_exist(self):
        self.client.force_authenticate(self.user)

        response = self.client.patch(
            path="/api/profiles/{profile_id}".format(profile_id=0),
            data={
                "comp_official_name": "Test_company",
                "comp_year_of_foundation": 2005
            })
        self.assertEqual(status.HTTP_404_NOT_FOUND, response.status_code)

    def test_partial_update_profile_wrong_data(self):
        self.client.force_authenticate(self.user)

        response = self.client.patch(
            path="/api/profiles/{profile_id}".format(profile_id=self.profile.profile_id),
            data={
                "comp_official_name": 12345,
                "comp_year_of_foundation": "Jane"
            })
        self.assertEqual(status.HTTP_400_BAD_REQUEST, response.status_code)

    def test_partial_update_profile_category(self):
        category = CategoryFactory()
        self.client.force_authenticate(self.user)

        response = self.client.patch(
            path="/api/profiles/{profile_id}".format(profile_id=self.profile.profile_id),
            data={
                "comp_category": [category.category_id]
            }
        )
        self.assertEqual(200, response.status_code)
        self.assertEqual([category.category_id], response.data.get('comp_category'))

    def test_partial_update_profile_activity(self):
        activity = ActivityFactory()
        self.client.force_authenticate(self.user)

        response = self.client.patch(
            path="/api/profiles/{profile_id}".format(profile_id=self.profile.profile_id),
            data={
                "comp_activity": [activity.activity_id]
            }
        )
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertEqual([activity.activity_id], response.data.get('comp_activity'))

    # PUT requests section
    def test_full_update_profile_authorized_with_partial_data(self):
        self.client.force_authenticate(self.user)

        response = self.client.put(
            path="/api/profiles/{profile_id}".format(profile_id=self.profile.profile_id),
            data={
                "comp_region": 'W',
                "comp_phone_number": '380100109934'
            })
        self.assertEqual(status.HTTP_400_BAD_REQUEST, response.status_code)

    def test_full_update_profile_authorized_with_full_data(self):
        category = CategoryFactory()
        activity = ActivityFactory()
        self.client.force_authenticate(self.user)

        response = self.client.put(
            path="/api/profiles/{profile_id}".format(profile_id=self.profile.profile_id),
            data={
                "person": self.user.id,
                "comp_official_name": "Jennifer",
                "comp_region": 'E',
                "comp_common_info": "Good Very",
                "comp_phone_number": 123456789012,
                "comp_EDRPOU": 12345678,
                "comp_year_of_foundation": 2005,
                "comp_service_info": "very good service",
                "comp_product_info": "very good product",
                "comp_address": "Kyiv",
                "comp_banner_image": self.right_image,
                "person_position": "director",
                "startup_idea": "very good idea",
                "is_deleted": False,
                "comp_category": [
                    category.category_id
                ],
                "comp_activity": [
                    activity.activity_id
                ]
            })
        self.assertEqual(status.HTTP_200_OK, response.status_code)

    def test_full_update_profile_unauthorized(self):
        category = CategoryFactory()
        activity = ActivityFactory()

        response = self.client.put(
            path="/api/profiles/{profile_id}".format(profile_id=self.profile.profile_id),
            data={
                "profile_id": self.profile.profile_id,
                "person": self.user.id,
                "comp_official_name": "Jennifer",
                "comp_region": 'E',
                "comp_common_info": "Good Very",
                "comp_phone_number": 123456789012,
                "comp_EDRPOU": 12345678,
                "comp_year_of_foundation": 2005,
                "comp_service_info": "very good service",
                "comp_product_info": "very good product",
                "comp_address": "Kyiv",
                "comp_banner_image": self.right_image,
                "person_position": "director",
                "startup_idea": "very good idea",
                "is_deleted": False,
                "comp_category": [
                    category.category_id
                ],
                "comp_activity": [
                    activity.activity_id
                ]
            })
        self.assertEqual(status.HTTP_401_UNAUTHORIZED, response.status_code)

    def test_full_update_profile_not_exist(self):
        self.client.force_authenticate(self.user)

        response = self.client.put(
            path="/api/profiles/{profile_id}".format(profile_id=0),
            data={
                "profile_id": self.profile.profile_id,
                "person": self.user.id,
                "comp_official_name": "Jennifer",
                "comp_region": 'E',
                "comp_common_info": "Good Very",
                "comp_phone_number": 123456789012,
                "comp_EDRPOU": 12345678,
                "comp_year_of_foundation": 2005,
                "comp_service_info": "very good service",
                "comp_product_info": "very good product",
                "comp_address": "Kyiv",
                "comp_banner_image": self.right_image,
                "person_position": "director",
                "startup_idea": "very good idea",
                "is_deleted": False,
                "comp_category": [
                    '1'
                ],
                "comp_activity": [
                    '1'
                ]
            })
        self.assertEqual(status.HTTP_404_NOT_FOUND, response.status_code)

    def test_full_update_profile_wrong_data(self):
        self.client.force_authenticate(self.user)

        response = self.client.put(
            path="/api/profiles/{profile_id}".format(profile_id=self.profile.profile_id),
            data={
                "profile_id": self.profile.profile_id,
                "person": self.user.id,
                "comp_official_name": "Jennifer",
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
                    '2'
                ],
                "comp_activity": [
                    '4'
                ]
            })
        self.assertEqual(status.HTTP_400_BAD_REQUEST, response.status_code)

    def test_full_update_authorized_not_owner(self):
        user2 = UserFactory()
        self.client.force_authenticate(user2)
        response = self.client.put(
            path="/api/profiles/{profile_id}".format(profile_id=self.profile.profile_id),
            data={
                "profile_id": self.profile.profile_id,
                "person": self.user.id,
                "comp_official_name": "Jennifer",
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
                    '2'
                ],
                "comp_activity": [
                    '4'
                ]
            })
        self.assertEqual(status.HTTP_403_FORBIDDEN, response.status_code)

    # POST requests section
    def test_create_profile_authorized_required_data_only(self):
        user2 = UserFactory()
        category = CategoryFactory()
        activity = ActivityFactory()
        self.client.force_authenticate(user2)

        response = self.client.post(
            path="/api/profiles/",
            data={
                "person": user2.id,
                "comp_category": [category.category_id],
                "comp_activity": [activity.activity_id]
            })
        self.assertEqual(status.HTTP_201_CREATED, response.status_code, response.content)

    def test_create_profile_authorized_full_data(self):
        user2 = UserFactory()
        category = CategoryFactory()
        activity = ActivityFactory()
        self.client.force_authenticate(user2)

        response = self.client.post(
            path="/api/profiles/",
            data={
                "person": user2.id,
                "comp_official_name": "Official name from test case",
                "comp_region": 'E',
                "comp_common_info": "Common info from test case",
                "comp_phone_number": 123456789012,
                "comp_EDRPOU": 12345678,
                "comp_year_of_foundation": 2005,
                "comp_service_info": "Service info from test case",
                "comp_product_info": "Product info from test case",
                "comp_address": "Kyiv",
                "comp_banner_image": self.right_image,
                "person_position": "director",
                "startup_idea": "StartUp idea from test case",
                "comp_is_startup": True,
                "comp_registered": False,
                "comp_name": "Comp name from test case",
                "comp_category": [
                    category.category_id
                ],
                "comp_activity": [
                    activity.activity_id
                ]
            })
        self.assertEqual(status.HTTP_201_CREATED, response.status_code)
        self.assertEqual({
            "profile_id": AnyInt(),
            "person": user2.id,
            "comp_name": "Comp name from test case",
            "comp_registered": False,
            "comp_is_startup": True,
            "comp_official_name": "Official name from test case",
            "comp_region": "E",
            "comp_common_info": "Common info from test case",
            "comp_phone_number": "123456789012",
            "comp_EDRPOU": 12345678,
            "comp_year_of_foundation": 2005,
            "comp_service_info": "Service info from test case",
            "comp_product_info": "Product info from test case",
            "comp_address": "Kyiv",
            "comp_banner_image": "http://testserver/test.JPEG",
            "person_position": "director",
            "startup_idea": "StartUp idea from test case",
            "is_deleted": False,
            "is_saved": False,
            "comp_category": [
                category.category_id
            ],
            "comp_activity": [
                activity.activity_id
            ]
        }, response.data)

    def test_create_profile_unauthorized(self):
        user2 = UserFactory()
        category = CategoryFactory()
        activity = ActivityFactory()

        response = self.client.post(
            path="/api/profiles/",
            data={
                "person": user2.id,
                "comp_category": [category.category_id],
                "comp_activity": [activity.activity_id]
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
                "comp_category": [category.category_id],
                "comp_activity": [activity.activity_id]
            })
        self.assertEqual(status.HTTP_409_CONFLICT, response.status_code)

    def test_create_profile_wrong_data(self):
        user2 = UserFactory()
        self.client.force_authenticate(user2)

        response = self.client.post(
            path="/api/profiles/",
            data={
                "person": user2.id,
                "comp_category": ['1'],
                "comp_activity": ['2']
            })
        self.assertEqual(400, response.status_code)
