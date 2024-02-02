from unittest import skip

from rest_framework import status
from rest_framework.test import APITestCase

from authentication.factories import UserFactory
from profiles.factories import ProfileCompanyFactory, SavedCompanyFactory
from utils.dump_response import dump  # noqa


class SavedCompaniesListCreateDestroyAPITest(APITestCase):
    def setUp(self):
        self.user = UserFactory()
        self.profile = ProfileCompanyFactory()

    def test_add_company_to_saved_unauthenticated(self):
        response = self.client.post(
            path=f"/api/profiles/{self.profile.id}/like/",
            data={},
        )
        self.assertEqual(status.HTTP_401_UNAUTHORIZED, response.status_code)

    def test_add_company_to_saved_authenticated(self):
        self.client.force_authenticate(self.user)
        response = self.client.post(
            path=f"/api/profiles/{self.profile.id}/like/",
            data={},
        )
        self.assertEqual(status.HTTP_201_CREATED, response.status_code)
        company_added_info = response.data["company"]
        self.assertEqual(company_added_info, self.profile.id)

    def test_add_own_company_to_saved_authenticated(self):
        own_profile = ProfileCompanyFactory(person_id=self.user.id)
        self.client.force_authenticate(self.user)
        response = self.client.post(
            path=f"/api/profiles/{own_profile.id}/like/",
            data={},
        )
        self.assertEqual(status.HTTP_403_FORBIDDEN, response.status_code)

    def test_add_non_existent_company_to_saved_authenticated(self):
        self.client.force_authenticate(self.user)

        response = self.client.post(
            path=f"/api/profiles/10000/like/",
            data={},
        )
        self.assertEqual(status.HTTP_403_FORBIDDEN, response.status_code)

    def test_delete_company_from_saved_authenticated(self):
        self.client.force_authenticate(self.user)

        saved_company = SavedCompanyFactory(user=self.user)
        response = self.client.delete(
            path="/api/profiles/dislike/{saved_company_pk}/".format(
                saved_company_pk=saved_company.id
            ),
            data={},
        )
        self.assertEqual(status.HTTP_204_NO_CONTENT, response.status_code)

        # check that deleted
        response = self.client.get(path="/api/profiles/?is_saved=True")
        self.assertEqual(0, response.data["total_items"])

    def test_add_company_to_saved_twice_authenticated(self):
        self.client.force_authenticate(self.user)

        self.client.post(
            path=f"/api/profiles/{self.profile.id}/like/",
            data={},
        )
        self.client.post(
            path=f"/api/profiles/{self.profile.id}/like/",
            data={},
        )
        response = self.client.get(path="/api/profiles/?is_saved=True")
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertEqual(0, response.data["total_items"])

    def test_get_saved_company_list_by_admin(self):
        self.user.is_staff = True
        self.client.force_authenticate(self.user)
        self.client.post(
            path=f"/api/profiles/{self.profile.id}/like/",
            data={},
        )
        response = self.client.get(
            path=f"/api/profiles/{self.profile.id}/like/"
        )
        self.assertEqual(1, response.data["total_items"])
        self.assertEqual(1, response.data["total_pages"])

    def test_get_non_existent_company_list_by_admin(self):
        self.user.is_staff = True
        self.client.force_authenticate(self.user)
        self.client.post(
            path="/api/profiles/10000/like/",
            data={},
        )
        response = self.client.get(
            path=f"/api/profiles/{self.profile.id}/like/"
        )
        self.assertEqual(0, response.data["total_items"])
        self.assertEqual(1, response.data["total_pages"])

    def test_get_saved_company_list_by_user(self):
        self.client.force_authenticate(self.user)
        self.client.post(
            path=f"/api/profiles/{self.profile.id}/like/",
            data={},
        )
        response = self.client.get(
            path=f"/api/profiles/{self.profile.id}/like/"
        )
        self.assertEqual(status.HTTP_403_FORBIDDEN, response.status_code)
