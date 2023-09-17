from rest_framework.test import APITestCase, APIClient
from profiles.models import Category
from authentication.models import CustomUser

from profiles.factories import CategoryFactory
from utils.dump_response import dump  # noqa

class TestCategoryList(APITestCase):
    def setUp(self) -> None:
        self.cheese_category = Category.objects.create(name='cheese')
        self.honey_category = Category.objects.create(name="honey")
        self.chocolate_category = Category.objects.create(name='chocolate')
        self.bacery_category = Category.objects.create(name="bacery")
        self.test_person_is_admin = CustomUser.objects.create_user(
            email="testcategory@testadmin.com",
            password="Testing01",
            name="testcategory",
            surname="admin",
            is_active=True,
            is_staff=True
        )
        self.test_person_just_user = CustomUser.objects.create_user(
            email="testcategory@testuser.com",
            password="Testing01",
            name="testcategory",
            surname="user",
            is_active=True
        )


    def test_get_all_categories_unauthorized(self):
        response = self.client.get("/api/categories/")
        self.assertEqual(200, response.status_code)

    def test_get_all_categories_authorized_user(self):
        self.client.force_authenticate(self.test_person_just_user)
        response = self.client.get("/api/categories/")
        self.assertEqual(200, response.status_code)

    def test_get_all_categories_authorized_admin(self):
        self.client.force_authenticate(self.test_person_is_admin)
        response = self.client.get("/api/categories/")
        self.assertEqual(200, response.status_code)

    def test_get_category_not_exists(self):
        self.client.force_authenticate(self.test_person_is_admin)
        response = self.client.get("/api/categories/20000")
        self.assertEqual(404, response.status_code)

    def test_create_category_unauthorized(self):
        response = self.client.post(path="/api/categories/", data={"name": "wine"})
        self.assertEqual(401, response.status_code)

    def test_create_category_not_staff(self):
        self.client.force_authenticate(self.test_person_just_user)
        response = self.client.post(path="/api/categories/", data={"name": "wine"})
        self.assertEqual(403, response.status_code)

    def test_create_category_is_staff(self):
        self.client.force_authenticate(self.test_person_is_admin)
        response = self.client.post(path="/api/categories/", data={"name": "wine"})
        self.assertEqual(201, response.status_code)

    def test_create_category_exists_is_staff(self):
        self.client.force_authenticate(self.test_person_is_admin)
        response = self.client.post(path="/api/categories/", data={"name": "cheese"})
        self.assertEqual(400, response.status_code)

    def test_put_category_unauthorized(self):
        response = self.client.put(path="/api/categories/1", data={"name": "wine"})
        self.assertEqual(401, response.status_code)

    def test_put_category_not_staff(self):
        self.client.force_authenticate(self.test_person_just_user)
        response = self.client.put(path="/api/categories/1", data={"name": "wine"})
        self.assertEqual(403, response.status_code)

    def test_put_category_is_staff(self):
        self.client.force_authenticate(self.test_person_is_admin)
        response_get = self.client.get("/api/categories/")
        list_of_categories = response_get.data
        category_for_put = list_of_categories[0]
        response = self.client.put(path=f"/api/categories/{category_for_put['id']}", data={"name": "milk"})
        self.assertEqual(200, response.status_code)

    def test_patch_category_unauthorized(self):
        response = self.client.patch(path="/api/categories/2", data={"name": "wine"})
        self.assertEqual(401, response.status_code)

    def test_patch_category_not_staff(self):
        self.client.force_authenticate(self.test_person_just_user)
        response = self.client.patch(path="/api/categories/2", data={"name": "wine"})
        self.assertEqual(403, response.status_code)

    def test_patch_category_is_staff(self):
        self.client.force_authenticate(self.test_person_is_admin)
        response_get = self.client.get("/api/categories/")
        list_of_categories = response_get.data
        category_for_patch = list_of_categories[0]
        response = self.client.patch(path=f"/api/categories/{category_for_patch['id']}", data={"name": "wine"})
        self.assertEqual(200, response.status_code)

    def test_delete_category_unauthorized(self):
        response = self.client.delete(path="/api/categories/1")
        self.assertEqual(401, response.status_code)

    def test_delete_category_not_staff(self):
        self.client.force_authenticate(self.test_person_just_user)
        response = self.client.delete(path="/api/categories/1")
        self.assertEqual(403, response.status_code)

    def test_delete_category_is_staff(self):
        self.client.force_authenticate(self.test_person_is_admin)
        response_get = self.client.get("/api/categories/")
        list_of_categories = response_get.data
        category_for_delete = list_of_categories[0]
        response = self.client.delete(path=f"/api/categories/{category_for_delete['id']}")
        self.assertEqual(204, response.status_code)

    def test_delete_category_not_exists_is_staff(self):
        self.client.force_authenticate(self.test_person_is_admin)
        response = self.client.delete(path=f"/api/categories/20000")
        self.assertEqual(404, response.status_code)

