from rest_framework import status
from rest_framework.test import APITestCase

from administration.factories import AdminCategoryFactory, AdminUserFactory, AdminProfileFactory
from utils.dump_response import dump  # noqa
from profiles.models import Profile, Category, CustomUser


class TestAdminCategoryAPIUserNotStaff(APITestCase):
    def setUp(self):
        self.user = AdminUserFactory(
            is_staff=False,
            is_active=True,
        )
        self.name = AdminCategoryFactory()

    def tearDown(self):
        super().tearDown()
        Category.objects.all().delete()
        Profile.objects.all().delete()
        CustomUser.objects.all().delete()
        AdminUserFactory.reset_sequence(0)
        AdminCategoryFactory.reset_sequence(0)
        AdminProfileFactory.reset_sequence(0)    


    def test_get_category_users_not_staff(self):
        self.client.force_authenticate(self.user)
        response = self.client.get(path="/api/admin/categories/")
        self.assertEqual(status.HTTP_403_FORBIDDEN, response.status_code)

    def test_get_category_id_users_not_staff(self):
        self.client.force_authenticate(self.user)
        response = self.client.get(path="/api/admin/categories/1/")
        self.assertEqual(status.HTTP_403_FORBIDDEN, response.status_code)
    

class TestAdminCategoryAPIUserStaff(APITestCase):
    def setUp(self):
        self.user = AdminUserFactory(
            is_staff=True,
            is_active=True,
        )
        self.name = AdminCategoryFactory.create_batch(2)

    def tearDown(self):
        super().tearDown()
        Category.objects.all().delete()
        Profile.objects.all().delete()
        CustomUser.objects.all().delete()
        AdminUserFactory.reset_sequence(0)
        AdminCategoryFactory.reset_sequence(0)
        AdminProfileFactory.reset_sequence(0)    


    def test_get_categoryes_users_staff(self):
        self.client.force_authenticate(self.user)
        response = self.client.get(path="/api/admin/categories/")
        data = [
            {
                "id": 5,
                "name": "category 1",
            },
            {
                "id": 6,
                "name": "category 2",
            },
        ]

        self.assertEqual(
            data, response.json()["results"]
        )
        self.assertEqual(status.HTTP_200_OK, response.status_code)

    def test_get_categoryes_id_users_staff(self):
        self.client.force_authenticate(self.user)
        response = self.client.get(path="/api/admin/categories/3/")
        data = {"name":"category 1"}
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertEqual(data, response.json())


    def test_post_new_categoryes_users_staff(self):
        self.client.force_authenticate(self.user)
        data = {"name":"category 11"}
        response = self.client.post(path="/api/admin/categories/",data=data)
        self.assertEqual(status.HTTP_201_CREATED, response.status_code)
        self.assertEqual(response.json()["name"], data["name"])
        self.assertIn("id", response.json())
