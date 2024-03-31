from rest_framework.test import APITestCase
import os

from authentication.factories import UserFactory
from profiles.factories import (
    ProfileStartupFactory,
    ProfileCompanyFactory,
    ActivityFactory,
    CategoryFactory,
)
from profiles.models import Profile

from utils.dump_response import dump  # noqa


class TestCompletenessUpdate(APITestCase):
    def setUp(self) -> None:
        self.right_image = open(
            os.path.join(
                os.getcwd(), "images", "tests", "img", "img_300kb.png"
            ),
            "rb",
        )

        self.kryvyi_rig_user = UserFactory()

        self.cheese_category = CategoryFactory(name="cheese")
        self.sale_activity = ActivityFactory(name="sale")

        self.company_kryvyi_rig = ProfileCompanyFactory(
            name="Kryvyi_rig_art",
            person=self.kryvyi_rig_user,
            region="Kryvyi Rig",
        )

    def tearDown(self) -> None:
        self.right_image.close()

    def test_completeness_after_update_region(self):
        self.client.force_authenticate(self.kryvyi_rig_user)
        self.client.patch(
            path=f"/api/profiles/{self.company_kryvyi_rig.id}",
            data={"region": "Kyiv"},
        )
        comp = Profile.objects.filter(name="Kryvyi_rig_art").first()
        self.assertEqual(comp.completeness, 1)

    def test_completeness_after_update_activity(self):
        self.client.force_authenticate(self.kryvyi_rig_user)
        response = self.client.patch(
            path=f"/api/profiles/{self.company_kryvyi_rig.id}",
            data={"activities": [self.sale_activity.id]},
        )
        comp = Profile.objects.filter(name="Kryvyi_rig_art").first()
        self.assertEqual(comp.completeness, 2)

    def test_completeness_after_update_logo(self):
        self.client.force_authenticate(self.kryvyi_rig_user)
        self.client.patch(
            path=f"/api/profiles/{self.company_kryvyi_rig.id}",
            data={"logo_image": self.right_image},
        )
        comp = Profile.objects.filter(name="Kryvyi_rig_art").first()
        self.assertEqual(comp.completeness, 2)

    def test_completeness_after_update_banner(self):
        self.client.force_authenticate(self.kryvyi_rig_user)
        self.client.patch(
            path=f"/api/profiles/{self.company_kryvyi_rig.id}",
            data={"banner_image": self.right_image},
        )
        comp = Profile.objects.filter(name="Kryvyi_rig_art").first()
        self.assertEqual(comp.completeness, 101)

    def test_completeness_after_update_category(self):
        self.client.force_authenticate(self.kryvyi_rig_user)
        self.client.patch(
            path=f"/api/profiles/{self.company_kryvyi_rig.id}",
            data={"categories": [self.cheese_category.id]},
        )
        comp = Profile.objects.filter(name="Kryvyi_rig_art").first()
        self.assertEqual(comp.completeness, 2)

    def test_completeness_after_update_banner_and_region(self):
        self.client.force_authenticate(self.kryvyi_rig_user)
        self.client.patch(
            path=f"/api/profiles/{self.company_kryvyi_rig.id}",
            data={"banner_image": self.right_image, "region": "Kyiv"},
        )
        comp = Profile.objects.filter(name="Kryvyi_rig_art").first()
        self.assertEqual(comp.completeness, 101)


class TestCompanyOrder(APITestCase):
    def setUp(self) -> None:
        self.right_image = open(
            os.path.join(
                os.getcwd(), "images", "tests", "img", "img_300kb.png"
            ),
            "rb",
        )

        self.kyiv_user = UserFactory()
        self.dnipro_user = UserFactory()
        self.kharkiv_user = UserFactory()
        self.chernigiv_user = UserFactory()
        self.kirovohrad_user = UserFactory()
        self.mykolaiv_user = UserFactory()
        self.odesa_user = UserFactory()
        self.synelnicovo_user = UserFactory()

        self.company_kyiv = ProfileCompanyFactory(
            name="Kyiv",
            person=self.kyiv_user,
            completeness=2,
        )
        self.company_kyiv.created_at = "2023-12-01"
        self.company_kyiv.save()

        self.company_dnipro = ProfileStartupFactory(
            name="Dnipro",
            person=self.dnipro_user,
            completeness=2,
        )
        self.company_dnipro.created_at = "2023-12-02"
        self.company_dnipro.save()

        self.company_kharkiv = ProfileStartupFactory(
            name="Kharkiv",
            person=self.kharkiv_user,
            completeness=1,
        )
        self.company_kharkiv.created_at = "2023-12-03"
        self.company_kharkiv.save()

        self.company_chernigiv = ProfileStartupFactory(
            name="Chernigiv",
            person=self.chernigiv_user,
            completeness=1,
        )
        self.company_chernigiv.created_at = "2023-12-04"
        self.company_chernigiv.save()

        self.company_kirovohrad = ProfileCompanyFactory(
            name="Kirovohrad",
            person=self.kirovohrad_user,
            completeness=3,
        )
        self.company_kirovohrad.created_at = "2023-12-05"
        self.company_kirovohrad.save()

    def tearDown(self) -> None:
        self.right_image.close()

    def test_get_less_companies(self):
        response = self.client.get(
            path="/api/profiles/?ordering=-completeness,-created_at"
        )
        names_from_response = [
            prof["name"] for prof in response.data["results"]
        ]
        self.assertEqual(
            ["Kirovohrad", "Dnipro", "Kyiv", "Chernigiv", "Kharkiv"],
            names_from_response,
        )
        self.assertEqual(200, response.status_code)
        self.assertEqual(5, response.data["total_items"])
        self.assertEqual(1, response.data["current"])
        self.assertEqual(1, response.data["total_pages"])
        self.assertEqual(None, response.data["next"])

    def test_get_enough_companies(self):
        self.company_synelnicovo = ProfileStartupFactory(
            name="Synelnicovo",
            person=self.synelnicovo_user,
            completeness=5,
        )
        self.company_synelnicovo.created_at = "2023-12-07"
        self.company_synelnicovo.save()
        response = self.client.get(
            path="/api/profiles/?ordering=-completeness,-created_at"
        )
        self.assertEqual(200, response.status_code)
        names_from_response = [
            prof["name"] for prof in response.data["results"]
        ]

        self.assertEqual(
            [
                "Synelnicovo",
                "Kirovohrad",
                "Dnipro",
                "Kyiv",
                "Chernigiv",
                "Kharkiv",
            ],
            names_from_response,
        )
        self.assertEqual(6, response.data["total_items"])
        self.assertEqual(1, response.data["current"])
        self.assertEqual(1, response.data["total_pages"])
        self.assertEqual(None, response.data["next"])

    def test_get_more_companies(self):
        self.company_mykolaiv = ProfileStartupFactory(
            name="Mykolaiv",
            person=self.mykolaiv_user,
            completeness=3,
        )
        self.company_mykolaiv.created_at = "2023-12-06"
        self.company_mykolaiv.save()

        self.company_odesa = ProfileStartupFactory(
            name="Odesa",
            person=self.odesa_user,
            completeness=5,
        )
        self.company_odesa.created_at = "2023-12-07"
        self.company_odesa.save()

        response = self.client.get(
            path="/api/profiles/?ordering=-completeness,-created_at"
        )
        names_from_response = [
            prof["name"] for prof in response.data["results"]
        ]
        self.assertEqual(
            ["Odesa", "Mykolaiv", "Kirovohrad", "Dnipro", "Kyiv", "Chernigiv"],
            names_from_response,
        )
        self.assertEqual(200, response.status_code)
        self.assertEqual(7, response.data["total_items"])
        self.assertEqual(1, response.data["current"])
        self.assertEqual(2, response.data["total_pages"])
        self.assertEqual(
            "http://testserver/api/profiles/?ordering=-completeness%2C-created_at&page=2",
            response.data["next"],
        )
