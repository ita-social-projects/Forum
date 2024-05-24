from rest_framework import status
from rest_framework.test import APITestCase

from authentication.factories import UserFactory
from profiles.factories import ProfileStartupFactory
from utils.dump_response import dump  # noqa


class TestViewedCompanyAPI(APITestCase):
    def setUp(self) -> None:
        self.user = UserFactory()
        self.user_profile = ProfileStartupFactory(person=self.user)

    def test_create_viewed_company_unauthorized(self):
        profile = ProfileStartupFactory()
        response = self.client.post(path=f"/api/company-view/{profile.id}/")
        self.assertEqual(status.HTTP_201_CREATED, response.status_code)
        self.assertIsNone(response.data["user"])
        self.assertIsNone(response.data["user_profile_name"])
        self.assertEqual(profile.id, response.data["company"])
        self.assertEqual(profile.name, response.data["company_name"])

    def test_create_viewed_company_authorized(self):
        profile = ProfileStartupFactory()
        self.client.force_authenticate(self.user)
        response = self.client.post(
            path=f"/api/company-view/{profile.id}/",
        )
        self.assertEqual(status.HTTP_201_CREATED, response.status_code)
        self.assertEqual(self.user.id, response.data["user"])
        self.assertEqual(
            self.user_profile.name, response.data["user_profile_name"]
        )
        self.assertEqual(profile.id, response.data["company"])
        self.assertEqual(profile.name, response.data["company_name"])

    def test_create_viewed_company_authorized_own_company(self):
        self.client.force_authenticate(self.user)
        response = self.client.post(
            path=f"/api/company-view/{self.user_profile.id}/"
        )
        self.assertEqual(status.HTTP_403_FORBIDDEN, response.status_code)
