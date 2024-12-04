from rest_framework import status
from rest_framework.test import APITestCase
from authentication.factories import UserFactory


class TestBlockUserView(APITestCase):
    def setUp(self):
        self.admin = UserFactory(is_staff=True, is_active=True)
        self.user = UserFactory(is_active=True)
        self.client.force_authenticate(self.admin)
        self.url = f"/api/admin/users/{self.user.id}/block/"

    def test_block_user_success(self):
        response = self.client.patch(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.user.refresh_from_db()
        self.assertFalse(self.user.is_active)

    def test_block_user_already_inactive(self):
        self.user.is_active = False
        self.user.save()
        response = self.client.patch(self.url)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_block_user_not_found(self):
        url = "/api/admin/users/9999/block/"
        response = self.client.patch(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_block_user_unauthorized(self):
        self.client.logout()
        response = self.client.patch(self.url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
