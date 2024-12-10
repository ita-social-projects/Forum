from rest_framework.test import APITestCase
from rest_framework import status

from administration.factories import AdminUserFactory


class TestProfileStatisticsStaff(APITestCase):
    def setUp(self):
        self.user = AdminUserFactory()
        self.client.force_authenticate(self.user)

    def test_get_profile_statistics(self):
        response = self.client.get("/api/admin/profiles/statistics/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class TestProfileStatisticsNotStaff(APITestCase):
    def setUp(self):
        self.user = AdminUserFactory(is_staff=False)
        self.client.force_authenticate(self.user)

    def test_get_profile_statistics(self):
        response = self.client.get("/api/admin/profiles/statistics/")
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)


class TestProfileStatisticsUnauthorized(APITestCase):
    def test_get_profile_statistics(self):
        response = self.client.get("/api/admin/profiles/statistics/")
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
