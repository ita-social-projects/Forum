from rest_framework.test import APITestCase

import os

from authentication.factories import UserFactory
from profiles.factories import (
    ProfileStartupFactory,
    ProfileCompanyFactory,
)

from utils.dump_response import dump  # noqa


class TestLogoChange(APITestCase):
    def setUp(self) -> None:
        self.right_image = open(
            os.path.join(
                os.getcwd(), "images", "tests", "img", "img_300kb.png"
            ),
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
            logo_image=f"logos/{self.right_image.name}",
        )

        self.company_kyiv = ProfileCompanyFactory(name="Kyivbud")

    def tearDown(self) -> None:
        self.right_image.close()
        self.wrong_image.close()

    def test_get_empty_logo_unauthorized(self):
        response = self.client.get(path=f"/api/logo/{self.company_kyiv.id}/")
        self.assertEqual(200, response.status_code)
        self.assertEqual({"logo_image": None}, response.json())

    def test_get_logo_unauthorized(self):
        response = self.client.get(path=f"/api/logo/{self.company_dnipro.id}/")
        self.assertEqual(200, response.status_code)
        self.assertEqual(
            {
                "logo_image": f"http://testserver/media/logos{self.right_image.name}"
            },
            response.json(),
        )

    def test_get_logo_authorized(self):
        self.client.force_authenticate(self.user)
        response = self.client.get(path=f"/api/logo/{self.company_dnipro.id}/")
        self.assertEqual(200, response.status_code)
        self.assertEqual(
            {
                "logo_image": f"http://testserver/media/logos{self.right_image.name}"
            },
            response.json(),
        )

    def test_get_empty_logo_authorized(self):
        self.client.force_authenticate(self.user)
        response = self.client.get(path=f"/api/logo/{self.company_kyiv.id}/")
        self.assertEqual(200, response.status_code)
        self.assertEqual({"logo_image": None}, response.json())

    def test_put_logo_unauthorized(self):
        response = self.client.put(
            path=f"/api/logo/{self.company_dnipro.id}/",
            data={"logo_image": self.right_image},
        )
        self.assertEqual(401, response.status_code)
        self.assertEqual(
            {"detail": "Authentication credentials were not provided."},
            response.json(),
        )

    def test_put_logo_authorized_not_owner(self):
        self.client.force_authenticate(self.user)
        response = self.client.put(
            path=f"/api/logo/{self.company_kyiv.id}/",
            data={"logo_image": self.right_image},
        )
        self.assertEqual(403, response.status_code)
        self.assertEqual(
            {"detail": "You do not have permission to perform this action."},
            response.json(),
        )

    def test_put_logo_authorized_owner_right_image(self):
        self.client.force_authenticate(self.user)
        response = self.client.put(
            path=f"/api/logo/{self.company_dnipro.id}/",
            data={"logo_image": self.right_image},
        )
        self.assertEqual(200, response.status_code)

    def test_put_logo_authorized_owner_wrong_image(self):
        self.client.force_authenticate(self.user)
        response = self.client.put(
            path=f"/api/logo/{self.company_dnipro.id}/",
            data={"logo_image": self.wrong_image},
        )
        self.assertEqual(400, response.status_code)
        self.assertEqual(
            {"logo_image": ["Image size exceeds the maximum allowed (1MB)."]},
            response.json(),
        )
