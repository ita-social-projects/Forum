from rest_framework.test import APITestCase
from rest_framework import status

from administration.factories import AdminUserFactory


class TestAutomoderationSettingisStaff(APITestCase):
    def setUp(self):
        self.user = AdminUserFactory()
        self.client.force_authenticate(self.user)

    def test_positive_get_automoderation_timeout(self):
        response = self.client.get("/api/admin/automoderation/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_positive_set_automoderation_timeout(self):
        response = self.client.put(
            "/api/admin/automoderation/", {"auto_moderation_hours": 24}
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        updated_response = self.client.get("/api/admin/automoderation/")
        self.assertEqual(updated_response.status_code, status.HTTP_200_OK)
        self.assertEqual(updated_response.data["auto_moderation_hours"], 24)

    def test_negative_set_incorrect_timeout(self):
        response = self.client.put(
            "/api/admin/automoderation/", {"auto_moderation_hours": 50}
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_negative_set_incorrect_negative_timeout(self):
        response = self.client.put(
            "/api/admin/automoderation/", {"auto_moderation_hours": -12}
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_negative_set_nonnumeric_timeout(self):
        response = self.client.put(
            "/api/admin/automoderation/", {"auto_moderation_hours": "four"}
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class TestAutomoderationSettingRegularUser(APITestCase):
    def setUp(self):
        self.user = AdminUserFactory(is_staff=False)
        self.client.force_authenticate(self.user)

    def test_positive_get_automoderation_common_user(self):
        response = self.client.get("/api/admin/automoderation/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_negative_set_automoderation_common_user(self):
        response = self.client.put(
            "/api/admin/automoderation/", {"auto_moderation_hours": 20}
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)


class TestAutomoderationSettingAnonymousUser(APITestCase):
    def test_negative_get_automoderation_anonymous_user(self):
        response = self.client.put("/api/admin/automoderation/")
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_negative_set_automoderation_anonymous_user(self):
        response = self.client.put(
            "/api/admin/automoderation/", {"auto_moderation_hours": 20}
        )
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
