from rest_framework.test import APITestCase, APIClient
from profiles.models import Activity
from authentication.models import CustomUser


class TestActivityList(APITestCase):

    def setUp(self) -> None:
        self.sale_activity = Activity.objects.create(name='sale')
        self.transport_activity = Activity.objects.create(name="transport")
        self.education_activity = Activity.objects.create(name='education')
        self.medicine_activity = Activity.objects.create(name="medicine")
        self.test_person_is_admin = CustomUser.objects.create_user(
            email="testactivity@testadmin.com",
            password="Testing01",
            name="testactivity",
            surname="admin",
            is_active=True,
            is_staff=True
        )
        self.test_person_just_user = CustomUser.objects.create_user(
            email="testactivity@testuser.com",
            password="Testing01",
            name="testactivity",
            surname="user",
            is_active=True
        )


    def test_get_all_activities_unauthorized(self):
        response = self.client.get("/api/activities/")
        self.assertEqual(200, response.status_code)

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

