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
        self.client.patch(
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

        self.cheese_category = CategoryFactory(name="cheese")
        self.sale_activity = ActivityFactory(name="sale")

        self.company_kyiv = ProfileCompanyFactory(
            name="Kyivbud",
            person=self.kyiv_user,
            created_at="2023-12-01",
            completeness=2,
        )
        self.company_dnipro = ProfileStartupFactory(
            name="Dniprotrans",
            person=self.dnipro_user,
            created_at="2023-12-02",
            completeness=2,
        )
        self.company_kharkiv = ProfileStartupFactory(
            name="Kharkivmarket",
            person=self.kharkiv_user,
            created_at="2023-12-03",
            completeness=1,
        )
        self.company_chernigiv = ProfileStartupFactory(
            name="Chernigivtravel",
            person=self.chernigiv_user,
            created_at="2023-12-04",
            completeness=1,
        )
        self.company_kirovohrad = ProfileCompanyFactory(
            name="Kirovohraduniversity",
            person=self.kirovohrad_user,
            created_at="2023-12-05",
            completeness=3,
        )

    def tearDown(self) -> None:
        self.right_image.close()

    def test_get_less_companies(self):
        response = self.client.get(path="/api/profiles/")
        self.assertEqual(200, response.status_code)
        ids_from_response = [prof["id"] for prof in response.data["results"]]
        self.assertEqual(
            [
                self.company_kirovohrad.id,
                self.company_kyiv.id,
                self.company_dnipro.id,
                self.company_kharkiv.id,
                self.company_chernigiv.id,
            ],
            ids_from_response,
        )
        self.assertEqual(5, response.data["total_items"])
        self.assertEqual(1, response.data["current"])
        self.assertEqual(1, response.data["total_pages"])
        self.assertEqual(None, response.data["next"])

    def test_get_enough_companies(self):
        self.company_odesa = ProfileStartupFactory(
            name="Odesaairlines",
            person=self.odesa_user,
            created_at="2023-12-07",
            completeness=5,
        )
        response = self.client.get(path="/api/profiles/")
        self.assertEqual(200, response.status_code)
        ids_from_response = [prof["id"] for prof in response.data["results"]]

        self.assertEqual(
            [
                self.company_odesa.id,
                self.company_kirovohrad.id,
                self.company_dnipro.id,
                self.company_kyiv.id,
                self.company_kharkiv.id,
                self.company_chernigiv.id,
            ],
            ids_from_response,
        )
        self.assertEqual(6, response.data["total_items"])
        self.assertEqual(1, response.data["current"])
        self.assertEqual(1, response.data["total_pages"])
        self.assertEqual(None, response.data["next"])

    def test_get_more_companies(self):
        self.company_mykolaiv = ProfileStartupFactory(
            name="Mykolaivsale",
            person=self.mykolaiv_user,
            created_at="2023-12-06",
            completeness=3,
        )
        self.company_odesa = ProfileStartupFactory(
            name="Odesaairlines",
            person=self.odesa_user,
            created_at="2023-12-07",
            completeness=5,
        )

        response = self.client.get(path="/api/profiles/")
        self.assertEqual(200, response.status_code)
        ids_from_response = [prof["id"] for prof in response.data["results"]]
        self.assertEqual(
            [
                self.company_odesa.id,
                self.company_mykolaiv.id,
                self.company_kirovohrad.id,
                self.company_dnipro.id,
                self.company_kyiv.id,
                self.company_chernigiv.id,
            ],
            ids_from_response,
        )
        self.assertEqual(7, response.data["total_items"])
        self.assertEqual(1, response.data["current"])
        self.assertEqual(2, response.data["total_pages"])
        self.assertEqual(
            "http://testserver/api/profiles/?page=2", response.data["next"]
        )
