from rest_framework.test import APITestCase, APIClient
from profiles.models import Category

class TestCategoryList(APITestCase):

    def setUp(self) -> None:
        self.cheese_category = Category.objects.create(name='cheese')
        self.honey_category = Category.objects.create(name="honey")
        self.chocolate_category = Category.objects.create(name='chocolate')
        self.bacery_category = Category.objects.create(name="bacery")

    def tearDown(self) -> None:
        objects_to_delete = Category.objects.all()
        objects_to_delete.delete()

    def test_get_all_activities(self):
        response = self.client.get("/api/category-list/")
        self.assertEqual(200, response.status_code)
