from rest_framework.test import APITestCase, APIClient

from authentication.factories import UserFactory
from profiles.factories import ActivityFactory


class TestActivityList(APITestCase):

    def setUp(self) -> None:
        self.sale_activity = ActivityFactory(name='sale')
        self.transport_activity = ActivityFactory(name="transport")
        self.education_activity = ActivityFactory(name='education')
        self.medicine_activity = ActivityFactory(name="medicine")
        self.test_person_is_admin = UserFactory(is_staff=True)
        self.test_person_just_user = UserFactory()

    def test_get_all_activities_unauthorized(self):
        response = self.client.get("/api/activities/")
        self.assertEqual(200, response.status_code)

    def test_get_all_activities_data(self):
        response = self.client.get("/api/activities/")
        self.assertEqual([{'id': 46, 'name': 'sale'}, {'id': 47, 'name': 'transport'}, {'id': 48,
                            'name': 'education'}, {'id': 49, 'name': 'medicine'}], response.json())

    def test_get_all_activities_authorized_user(self):
        self.client.force_authenticate(self.test_person_just_user)
        response = self.client.get("/api/activities/")
        self.assertEqual(200, response.status_code)

    def test_get_all_activities_authorized_admin(self):
        self.client.force_authenticate(self.test_person_is_admin)
        response = self.client.get("/api/activities/")
        self.assertEqual(200, response.status_code)

    def test_get_activity_not_exists(self):
        self.client.force_authenticate(self.test_person_is_admin)
        response = self.client.get("/api/activities/20000")
        self.assertEqual(404, response.status_code)

    def test_create_activity_unauthorized(self):
        response = self.client.post(path="/api/activities/", data={"name": "production"})
        self.assertEqual(401, response.status_code)

    def test_create_activity_not_staff(self):
        self.client.force_authenticate(self.test_person_just_user)
        response = self.client.post(path="/api/activities/", data={"name": "production"})
        self.assertEqual(403, response.status_code)

    def test_create_activity_is_staff(self):
        self.client.force_authenticate(self.test_person_is_admin)
        response = self.client.post(path="/api/activities/", data={"name": "production"})
        self.assertEqual(201, response.status_code)

    def test_create_activity_exists_is_staff(self):
        self.client.force_authenticate(self.test_person_is_admin)
        response = self.client.post(path="/api/activities/", data={"name": "sale"})
        self.assertEqual(400, response.status_code)

    def test_put_activity_unauthorized(self):
        response = self.client.put(path="/api/activities/1", data={"name": "trade"})
        self.assertEqual(401, response.status_code)

    def test_put_activity_not_staff(self):
        self.client.force_authenticate(self.test_person_just_user)
        response = self.client.put(path="/api/activities/1", data={"name": "trade"})
        self.assertEqual(403, response.status_code)

    def test_put_activity_is_staff(self):
        self.client.force_authenticate(self.test_person_is_admin)
        response_get = self.client.get("/api/activities/")
        list_of_activities = response_get.data
        activity_for_put = list_of_activities[0]
        response = self.client.put(path=f"/api/activities/{activity_for_put['id']}", data={"name": "trade"})
        self.assertEqual(200, response.status_code)

    def test_patch_activity_unauthorized(self):
        response = self.client.patch(path="/api/activities/2", data={"name": "good transport"})
        self.assertEqual(401, response.status_code)

    def test_patch_activity_not_staff(self):
        self.client.force_authenticate(self.test_person_just_user)
        response = self.client.patch(path="/api/activities/2", data={"name": "good transport"})
        self.assertEqual(403, response.status_code)

    def test_patch_activity_is_staff(self):
        self.client.force_authenticate(self.test_person_is_admin)
        response_get = self.client.get("/api/activities/")
        list_of_activities = response_get.data
        activity_for_patch = list_of_activities[0]
        response = self.client.patch(path=f"/api/activities/{activity_for_patch['id']}", data=
                                                                                            {"name": "good transport"})
        self.assertEqual(200, response.status_code)

    def test_delete_activity_unauthorized(self):
        response = self.client.delete(path="/api/activities/1")
        self.assertEqual(401, response.status_code)

    def test_delete_activity_not_staff(self):
        self.client.force_authenticate(self.test_person_just_user)
        response = self.client.delete(path="/api/activities/1")
        self.assertEqual(403, response.status_code)

    def test_delete_activity_is_staff(self):
        self.client.force_authenticate(self.test_person_is_admin)
        response_get = self.client.get("/api/activities/")
        list_of_activities = response_get.data
        activity_for_delete = list_of_activities[0]
        response = self.client.delete(path=f"/api/activities/{activity_for_delete['id']}")
        self.assertEqual(204, response.status_code)

    def test_delete_activity_not_exists_is_staff(self):
        self.client.force_authenticate(self.test_person_is_admin)
        response = self.client.delete(path="/api/activities/20000")
        self.assertEqual(404, response.status_code)

