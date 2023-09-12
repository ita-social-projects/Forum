from rest_framework.test import APITestCase, APIClient
from profiles.models import Activity

class TestActivityList(APITestCase):

    def setUp(self) -> None:
        self.transport_activity = Activity.objects.create(name="transport")
        self.sale_activity = Activity.objects.create(name="sale")
        self.production_activity = Activity.objects.create(name="production")
        self.education_activity = Activity.objects.create(name="education")

    def tearDown(self) -> None:
        objects_to_delete = Activity.objects.all()
        objects_to_delete.delete()

    def test_get_all_activities(self):
        response = self.client.get("/api/activity-list/")
        self.assertEqual(200, response.status_code)
