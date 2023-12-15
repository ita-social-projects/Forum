from rest_framework.test import APITestCase

import os

from authentication.factories import UserFactory
from profiles.factories import (
    ProfileStartupFactory,
    ProfileCompanyFactory,
)

from utils.dump_response import dump  # noqa


class TestBannerChange(APITestCase):
    def setUp(self) -> None:
        self.right_image = open(
            os.path.join(os.getcwd(), "images", "tests", "img", "img_2mb.png"),
            "rb",
        )
        self.wrong_image = open(
            os.path.join(os.getcwd(), "images", "tests", "img", "img_7mb.png"),
            "rb",
        )

        self.user = UserFactory(email="test1@test.com")
        self.company_dnipro = ProfileStartupFactory.create(
            person=self.user,
            name="Dnipro",
            banner_image=f"banners/{self.right_image.name}",
        )

        self.company_kyiv = ProfileCompanyFactory(name="Kyivbud")

    def tearDown(self) -> None:
        self.right_image.close()
        self.wrong_image.close()

    def test_get_empty_banner_unauthorized(self):
        response = self.client.get(path=f"/api/banner/{self.company_kyiv.id}/")
        self.assertEqual(200, response.status_code)
        self.assertEqual({"banner_image": None}, response.json())

    def test_get_banner_unauthorized(self):
        response = self.client.get(
            path=f"/api/banner/{self.company_dnipro.id}/"
        )
        self.assertEqual(200, response.status_code)
        self.assertEqual(
            {
                "banner_image": f"http://testserver/media/banners{self.right_image.name}"
            },
            response.json(),
        )

    def test_get_banner_authorized(self):
        self.client.force_authenticate(self.user)
        response = self.client.get(
            path=f"/api/banner/{self.company_dnipro.id}/"
        )
        self.assertEqual(200, response.status_code)
        self.assertEqual(
            {
                "banner_image": f"http://testserver/media/banners{self.right_image.name}"
            },
            response.json(),
        )

    def test_get_empty_banner_authorized(self):
        self.client.force_authenticate(self.user)
        response = self.client.get(path=f"/api/banner/{self.company_kyiv.id}/")
        self.assertEqual(200, response.status_code)
        self.assertEqual({"banner_image": None}, response.json())

    def test_put_banner_unauthorized(self):
        response = self.client.put(
            path=f"/api/banner/{self.company_dnipro.id}/",
            data={"banner_image": self.right_image},
        )
        self.assertEqual(401, response.status_code)
        self.assertEqual(
            {"detail": "Authentication credentials were not provided."},
            response.json(),
        )

    def test_put_banner_authorized_not_owner(self):
        self.client.force_authenticate(self.user)
        response = self.client.put(
            path=f"/api/banner/{self.company_kyiv.id}/",
            data={"banner_image": self.right_image},
        )
        self.assertEqual(403, response.status_code)
        self.assertEqual(
            {"detail": "You do not have permission to perform this action."},
            response.json(),
        )

    def test_put_banner_authorized_owner_right_image(self):
        self.client.force_authenticate(self.user)
        response = self.client.put(
            path=f"/api/banner/{self.company_dnipro.id}/",
            data={"banner_image": self.right_image},
        )
        self.assertEqual(200, response.status_code)

    def test_put_banner_authorized_owner_wrong_image(self):
        self.client.force_authenticate(self.user)
        response = self.client.put(
            path=f"/api/banner/{self.company_dnipro.id}/",
            data={"banner_image": self.wrong_image},
        )
        self.assertEqual(400, response.status_code)
        self.assertEqual(
            {
                "banner_image": [
                    "Image size exceeds the maximum allowed (50MB)."
                ]
            },
            response.json(),
        )
