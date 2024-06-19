from rest_framework.test import APITestCase
from rest_framework import status
import os

from authentication.factories import UserFactory
from images.factories import ProfileimageFactory
from utils.dump_response import dump  # noqa


class TestBannerChange(APITestCase):

    def setUp(self) -> None:
        self.banner_path = os.path.join(
            os.getcwd(), "images", "tests", "img", "img_2mb.png"
        )
        self.logo_path = os.path.join(
            os.getcwd(), "images", "tests", "img", "img_300kb.png"
        )

        self.banner = ProfileimageFactory(image_path=self.banner_path)
        self.logo = ProfileimageFactory(image_path=self.logo_path)
        self.user_is_staff = UserFactory(is_staff=True)
        self.user = UserFactory()

    def test_delete_banner_authorized_user_is_staff(self):
        self.client.force_authenticate(self.user_is_staff)
        response = self.client.delete(
            path=f"/api/image/banner/{self.banner.uuid}",
        )
        self.assertEqual(status.HTTP_204_NO_CONTENT, response.status_code)

    def test_delete_logo_authorized_user_is_staff(self):
        self.client.force_authenticate(self.user_is_staff)
        response = self.client.delete(
            path=f"/api/image/logo/{self.logo.uuid}",
        )
        self.assertEqual(status.HTTP_204_NO_CONTENT, response.status_code)

    def test_delete_banner_authorized_user_is_not_staff(self):
        self.client.force_authenticate(self.user)
        response = self.client.delete(
            path=f"/api/image/banner/{self.banner.uuid}",
        )
        self.assertEqual(status.HTTP_403_FORBIDDEN, response.status_code)

    def test_delete_logo_authorized_user_is_not_staff(self):
        self.client.force_authenticate(self.user)
        response = self.client.delete(
            path=f"/api/image/logo/{self.logo.uuid}",
        )
        self.assertEqual(status.HTTP_403_FORBIDDEN, response.status_code)

    def test_delete_banner_unauthorized(self):
        response = self.client.delete(
            path=f"/api/image/banner/{self.banner.uuid}",
        )
        self.assertEqual(status.HTTP_401_UNAUTHORIZED, response.status_code)

    def test_delete_logo_unauthorized(self):
        response = self.client.delete(
            path=f"/api/image/logo/{self.logo.uuid}",
        )
        self.assertEqual(status.HTTP_401_UNAUTHORIZED, response.status_code)
