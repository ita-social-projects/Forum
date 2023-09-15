from rest_framework.test import APITestCase

from profiles.factories import ActivityFactory


class TestActivityList(APITestCase):
    def test_get_all_activities(self):
        activities = ActivityFactory.create_batch(3)

        response = self.client.get("/api/activities/")
        self.assertEqual(200, response.status_code)
        self.assertEqual(len(activities), len(response.data))
