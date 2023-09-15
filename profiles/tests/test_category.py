from rest_framework.test import APITestCase

from profiles.factories import CategoryFactory
from utils.dump_response import dump  # noqa


class TestCategoryList(APITestCase):
    def test_get_categories(self):
        categories = CategoryFactory.create_batch(3)

        response = self.client.get("/api/categories/")
        self.assertEqual(200, response.status_code)
        self.assertEqual(len(categories), len(response.data))
