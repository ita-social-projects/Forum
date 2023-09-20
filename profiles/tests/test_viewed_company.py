from rest_framework import status
from rest_framework.test import APITestCase

from authentication.factories import UserFactory
from profiles.factories import ProfileStartupFactory, ViewedCompanyFactory
from utils.dump_response import dump  # noqa


class TestViewedCompanyAPI(APITestCase):
    def setUp(self) -> None:
        self.user = UserFactory()

    def test_create_viewed_company_unauthorized(self):
        profile = ProfileStartupFactory()
        response = self.client.post(
            path="/api/viewed-list/",
            data={
                "company": profile.id
            })
        self.assertEqual(status.HTTP_401_UNAUTHORIZED, response.status_code)

    def test_create_viewed_company_authorized(self):
        profile = ProfileStartupFactory()
        self.client.force_authenticate(self.user)
        response = self.client.post(
            path="/api/viewed-list/",
            data={
                "user": self.user.id,
                "company": profile.id
            })
        self.assertEqual(status.HTTP_201_CREATED, response.status_code)
        self.assertEqual(self.user.id, response.data["user"])
        self.assertEqual(profile.id, response.data["company"])

    def test_create_viewed_company_authorized_own_company(self):
        own_profile = ProfileStartupFactory(person=self.user)
        self.client.force_authenticate(self.user)
        response = self.client.post(
            path="/api/viewed-list/",
            data={
                "user": self.user.id,
                "company": own_profile.id
            })
        self.assertEqual(status.HTTP_400_BAD_REQUEST, response.status_code)

    def test_get_viewed_companies_unauthorized(self):
        response = self.client.post(path="/api/viewed-list/")
        self.assertEqual(status.HTTP_401_UNAUTHORIZED, response.status_code)

    def test_get_viewed_companies_authorized(self):
        ViewedCompanyFactory.create_batch(3, user=self.user)
        self.client.force_authenticate(self.user)

        response = self.client.get(path="/api/viewed-list/")

        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertEqual(3, response.data["total_items"])
