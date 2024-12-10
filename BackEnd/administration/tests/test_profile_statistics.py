from rest_framework.test import APITestCase
from rest_framework import status

from administration.factories import AdminUserFactory, AdminProfileFactory


class TestProfileStatisticsStaff(APITestCase):
    def setUp(self):
        self.user = AdminUserFactory()
        self.client.force_authenticate(self.user)
        self.test_startup_user = AdminUserFactory(is_staff=False)
        self.test_investor_user = AdminUserFactory(is_staff=False)
        self.test_blocked_company_user = AdminUserFactory(is_staff=False)
        self.startup_company = AdminProfileFactory(
            person_id=self.test_startup_user.id, is_registered=False
        )
        self.investor_company = AdminProfileFactory(
            person_id=self.test_investor_user.id, is_startup=False
        )
        self.blocked_company = AdminProfileFactory(
            person_id=self.test_blocked_company_user.id, status="blocked"
        )

    def test_get_profile_statistics(self):
        response = self.client.get("/api/admin/profiles/statistics/")
        data = {
            "companies_count": 3,
            "investors_count": 2,
            "startups_count": 2,
            "blocked_companies_count": 1,
        }
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, data)


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
