from rest_framework import status
from rest_framework.test import APITestCase
from unittest import skip

from profiles.factories import ProfileCompanyFactory, SavedCompanyFactory
from authentication.factories import UserFactory
from utils.dump_response import dump


class SavedCompaniesListCreateDestroyAPITest(APITestCase):

    def setUp(self):
        self.user = UserFactory()
        self.profile = ProfileCompanyFactory()

    def test_add_company_to_saved_unauthenticated(self):
        response = self.client.post(
            path="/api/saved-list/",
            data={
                "company_pk": "{profile_id}".format(profile_id=self.profile.profile_id),
                "user": self.user.id
            }
        )
        self.assertEqual(status.HTTP_401_UNAUTHORIZED, response.status_code)

    def test_add_company_to_saved_authenticated(self):
        self.client.force_authenticate(self.user)
        response = self.client.post(
            path="/api/saved-list/",
            data={
                "company_pk": "{profile_id}".format(profile_id=self.profile.profile_id),
                "user": self.user.id
            }
        )
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        company_added_info = response.data["Company added"]
        self.assertEqual(company_added_info["company"], self.profile.profile_id)

    @skip("To be implemented")
    def test_add_own_company_to_saved_authenticated(self):
        own_profile = ProfileCompanyFactory(person=self.user)
        self.client.force_authenticate(self.user)
        response = self.client.post(
            path="/api/saved-list/",
            data={
                "company_pk": "{profile_id}".format(profile_id=own_profile.profile_id),
                "user": self.user.id
            }
        )
        self.assertEqual(status.HTTP_403_FORBIDDEN, response.status_code)

    def test_add_non_existent_company_to_saved_authenticated(self):
        self.client.force_authenticate(self.user)
        response = self.client.post(
            path="/api/saved-list/",
            data={
                "company_pk": 99999,
                "user": self.user
            }
        )
        self.assertEqual(status.HTTP_400_BAD_REQUEST, response.status_code)

    def test_get_saved_list_unauthenticated(self):
        response = self.client.get(path="/api/saved-list/")
        self.assertEqual(status.HTTP_401_UNAUTHORIZED, response.status_code)

    def test_get_saved_list_authenticated(self):
        SavedCompanyFactory.create_batch(2, user=self.user)
        self.client.force_authenticate(self.user)
        response = self.client.get(path="/api/saved-list/")
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertEqual(2, response.data["total_items"])

    def test_delete_company_from_saved_authenticated(self):
        self.client.force_authenticate(self.user)
        saved_company = SavedCompanyFactory(user=self.user)
        response = self.client.delete(
            path="/api/saved-list/{profile_pk}/".format(profile_pk=saved_company.company.profile_id),
            data={
                "user": self.user
            }
        )
        self.assertEqual(status.HTTP_204_NO_CONTENT, response.status_code)

        # check that deleted
        response = self.client.get(
            path="/api/saved-list/",
            data={
                "user": self.user
            }
        )
        self.assertEqual(0, response.data["total_items"])

    def test_add_company_to_saved_twice_authenticated(self):
        self.client.force_authenticate(self.user)
        self.client.post(
            path="/api/saved-list/",
            data={"company_pk": "{profile_pk}".format(profile_pk=self.profile.profile_id),
                  "user": self.user})
        self.client.post(
            path="/api/saved-list/",
            data={"company_pk": "{profile_pk}".format(profile_pk=self.profile.profile_id),
                  "user": self.user})
        response = self.client.get(
            path="/api/saved-list/",
            data={"user": self.user}
        )
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertEqual(0, response.data["total_items"])
