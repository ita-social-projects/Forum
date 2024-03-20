from rest_framework import status
from rest_framework.test import APITestCase

from authentication.factories import UserFactory
from profiles.factories import (
    ProfileStartupFactory,
    ProfileCompanyFactory,
    ActivityFactory,
)

from utils.dump_response import dump  # noqa


class TestCompanyFilter(APITestCase):
    def setUp(self) -> None:
        self.user = UserFactory()
        self.company_kiev = ProfileCompanyFactory(
            name="Kyivbud", region="Kyiv"
        )
        self.company_dnipro = ProfileStartupFactory(
            name="Dniprotrans", region="Dnipro region"
        )
        self.company_charkiv = ProfileStartupFactory(
            name="Charkivmarket", region="Kharkiv region"
        )
        self.company_chernigiv = ProfileStartupFactory(
            name="Chernigivtravel", region="Chernihiv region"
        )

    def test_get_profile_filtered_by_name_unauthorized(self):
        response = self.client.get(path="/api/search/?name=Kyivbud")
        self.assertEqual(200, response.status_code)
        self.assertEqual(1, len(response.data))

    def test_get_profile_filtered_by_region_unauthorized(self):
        response = self.client.get(path="/api/search/?region=Dnipro")
        self.assertEqual(200, response.status_code)
        self.assertEqual(1, len(response.data))
        self.assertEqual(
            [
                {
                    "id": self.company_dnipro.id,
                    "name": "Dniprotrans",
                    "categories": [],
                    "activities": [],
                    "region": "Dnipro region",
                    "region_display": "Дніпропетровська область",
                    "founded": 2022,
                    "address": "Test Country, Test City, St. Test, 1",
                    "banner_image": None,
                    "logo_image": None,
                    "person": self.company_dnipro.person_id,
                    "is_saved": False,
                }
            ],
            response.json(),
        )

    def test_get_profile_filtered_by_name_authorized(self):
        self.client.force_authenticate(self.user)
        response = self.client.get(path="/api/search/?name=Kyivbud")
        self.assertEqual(200, response.status_code)
        self.assertEqual(1, len(response.data))
        self.assertEqual(
            [
                {
                    "id": self.company_kiev.id,
                    "name": "Kyivbud",
                    "categories": [],
                    "activities": [],
                    "region": "Kyiv",
                    "region_display": "Київ",
                    "founded": 2022,
                    "address": "Test Country, Test City, St. Test, 1",
                    "banner_image": None,
                    "logo_image": None,
                    "person": self.company_kiev.person_id,
                    "is_saved": False,
                }
            ],
            response.json(),
        )

    def test_get_profile_filtered_by_region_authorized(self):
        self.client.force_authenticate(self.user)
        response = self.client.get(path="/api/search/?region=Dnipro")
        self.assertEqual(200, response.status_code)
        self.assertEqual(1, len(response.data))

    def test_get_profiles_without_filter_unauthorized(self):
        response = self.client.get(path="/api/search/")
        self.assertEqual(200, response.status_code)
        self.assertEqual(4, len(response.data))

    def test_get_profiles_without_filter_authorized(self):
        self.client.force_authenticate(self.user)
        response = self.client.get(path="/api/search/")
        self.assertEqual(200, response.status_code)
        self.assertEqual(4, len(response.data))

    def test_get_profiles_filter_wrong_name_authorized(self):
        self.client.force_authenticate(self.user)
        response = self.client.get(path="/api/search/?name=Chernovcimilk")
        self.assertEqual(200, response.status_code)
        self.assertEqual(0, len(response.data))
        self.assertEqual([], response.json())

    def test_get_profiles_filter_wrong_name_unauthorized(self):
        response = self.client.get(path="/api/search/?name=Chernovcimilk")
        self.assertEqual(200, response.status_code)
        self.assertEqual(0, len(response.data))
        self.assertEqual([], response.json())

    def test_get_profile_filtered_by_name_and_region_unauthorized(self):
        response = self.client.get(
            path="/api/search/?name=Kyivbud&region=Kyiv"
        )
        self.assertEqual(200, response.status_code)
        self.assertEqual(1, len(response.data))
        self.assertEqual(
            [
                {
                    "id": self.company_kiev.id,
                    "name": "Kyivbud",
                    "categories": [],
                    "activities": [],
                    "region": "Kyiv",
                    "region_display": "Київ",
                    "founded": 2022,
                    "address": "Test Country, Test City, St. Test, 1",
                    "banner_image": None,
                    "logo_image": None,
                    "person": self.company_kiev.person_id,
                    "is_saved": False,
                }
            ],
            response.json(),
        )

    def test_get_profile_filtered_by_name_and_region_authorized(self):
        self.client.force_authenticate(self.user)
        response = self.client.get(
            path="/api/search/?name=Kyivbud&region=Kyiv"
        )
        self.assertEqual(200, response.status_code)
        self.assertEqual(1, len(response.data))
        self.assertEqual(
            [
                {
                    "id": self.company_kiev.id,
                    "name": "Kyivbud",
                    "categories": [],
                    "activities": [],
                    "region": "Kyiv",
                    "region_display": "Київ",
                    "founded": 2022,
                    "address": "Test Country, Test City, St. Test, 1",
                    "banner_image": None,
                    "logo_image": None,
                    "person": self.company_kiev.person_id,
                    "is_saved": False,
                }
            ],
            response.json(),
        )

    def test_get_profile_filtered_by_wrong_name_and_region_authorized(self):
        self.client.force_authenticate(self.user)
        response = self.client.get(path="/api/search/?name=Pizza&region=Kyiv")
        self.assertEqual(200, response.status_code)
        self.assertEqual(0, len(response.data))
        self.assertEqual([], response.json())

    def test_get_profile_filtered_by_wrong_name_and_region_unauthorized(self):
        response = self.client.get(path="/api/search/?name=Pizza&region=Kyiv")
        self.assertEqual(200, response.status_code)
        self.assertEqual(0, len(response.data))
        self.assertEqual([], response.json())

    def test_get_profile_filtered_by_name_and_wrong_region_authorized(self):
        self.client.force_authenticate(self.user)
        response = self.client.get(
            path="/api/search/?name=Kyivbud&region=Ghernigiv"
        )
        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertEqual(0, len(response.data))
        self.assertEqual([], response.json())

    def test_get_profile_filtered_by_name_and_wrong_region_unauthorized(self):
        response = self.client.get(
            path="/api/search/?name=Kyivbud&region=Ghernigiv"
        )
        self.assertEqual(200, response.status_code)
        self.assertEqual(0, len(response.data))
        self.assertEqual([], response.json())

    def test_get_profile_filtered_by_wrong_name_and_wrong_region_authorized(
        self,
    ):
        self.client.force_authenticate(self.user)
        response = self.client.get(
            path="/api/search/?name=Pizza&region=Ghernigiv"
        )
        self.assertEqual(200, response.status_code)
        self.assertEqual(0, len(response.data))
        self.assertEqual([], response.json())

    def test_get_profile_filtered_by_wrong_name_and_wrong_region_unauthorized(
        self,
    ):
        response = self.client.get(
            path="/api/search/?name=Pizza&region=Ghernigiv"
        )
        self.assertEqual(200, response.status_code)
        self.assertEqual(0, len(response.data))
        self.assertEqual([], response.json())

    def test_get_profile_filtered_by_region_partially_authorized(self):
        self.client.force_authenticate(self.user)
        response = self.client.get(path="/api/search/?region=Dnip")
        self.assertEqual(200, response.status_code)
        self.assertEqual(1, len(response.data))

    def test_get_profile_filtered_by_region_partially_unauthorized(self):
        response = self.client.get(path="/api/search/?region=Dnip")
        self.assertEqual(200, response.status_code)
        self.assertEqual(1, len(response.data))

    def test_get_profile_filtered_by_name_partially_authorized(self):
        self.client.force_authenticate(self.user)
        response = self.client.get(path="/api/search/?name=Kyiv")
        self.assertEqual(200, response.status_code)
        self.assertEqual(1, len(response.data))
        self.assertEqual(
            [
                {
                    "id": self.company_kiev.id,
                    "name": "Kyivbud",
                    "categories": [],
                    "activities": [],
                    "region": "Kyiv",
                    "region_display": "Київ",
                    "founded": 2022,
                    "address": "Test Country, Test City, St. Test, 1",
                    "banner_image": None,
                    "logo_image": None,
                    "person": self.company_kiev.person_id,
                    "is_saved": False,
                }
            ],
            response.json(),
        )

    def test_get_profile_filtered_by_name_partially_unauthorized(self):
        response = self.client.get(path="/api/search/?name=Kyiv")
        self.assertEqual(200, response.status_code)
        self.assertEqual(1, len(response.data))
        self.assertEqual(
            [
                {
                    "id": self.company_kiev.id,
                    "name": "Kyivbud",
                    "categories": [],
                    "activities": [],
                    "region": "Kyiv",
                    "region_display": "Київ",
                    "founded": 2022,
                    "address": "Test Country, Test City, St. Test, 1",
                    "banner_image": None,
                    "logo_image": None,
                    "person": self.company_kiev.person_id,
                    "is_saved": False,
                }
            ],
            response.json(),
        )

    def test_get_profile_filtered_by_name_and_region_partialyy_authorized(
        self,
    ):
        self.client.force_authenticate(self.user)
        response = self.client.get(path="/api/search/?name=Kyiv&region=Ky")
        self.assertEqual(200, response.status_code)
        self.assertEqual(1, len(response.data))
        self.assertEqual(
            [
                {
                    "id": self.company_kiev.id,
                    "name": "Kyivbud",
                    "categories": [],
                    "activities": [],
                    "region": "Kyiv",
                    "region_display": "Київ",
                    "founded": 2022,
                    "address": "Test Country, Test City, St. Test, 1",
                    "banner_image": None,
                    "logo_image": None,
                    "person": self.company_kiev.person_id,
                    "is_saved": False,
                }
            ],
            response.json(),
        )

    def test_get_profile_filtered_by_wrong_name_and_wrong_region_partially_authorized(
        self,
    ):
        self.client.force_authenticate(self.user)
        response = self.client.get(path="/api/search/?name=Kyivf&region=Kyif")
        self.assertEqual(200, response.status_code)
        self.assertEqual(0, len(response.data))
        self.assertEqual([], response.json())

    def test_get_profile_ordered_by_name_asc_unauthorized(
        self,
    ):
        ordered_response_data = [
            {
                "id": self.company_charkiv.id,
                "name": "Charkivmarket",
                "categories": [],
                "activities": [],
                "region": "Kharkiv region",
                "region_display": "Харківська область",
                "founded": 2022,
                "address": "Test Country, Test City, St. Test, 1",
                "banner_image": None,
                "logo_image": None,
                "person": self.company_charkiv.person_id,
                "is_saved": False,
            },
            {
                "id": self.company_chernigiv.id,
                "name": "Chernigivtravel",
                "categories": [],
                "activities": [],
                "region": "Chernihiv region",
                "region_display": "Чернігівська область",
                "founded": 2022,
                "address": "Test Country, Test City, St. Test, 1",
                "banner_image": None,
                "logo_image": None,
                "person": self.company_chernigiv.person_id,
                "is_saved": False,
            },
            {
                "id": self.company_dnipro.id,
                "name": "Dniprotrans",
                "categories": [],
                "activities": [],
                "region": "Dnipro region",
                "region_display": "Дніпропетровська область",
                "founded": 2022,
                "address": "Test Country, Test City, St. Test, 1",
                "banner_image": None,
                "logo_image": None,
                "person": self.company_dnipro.person_id,
                "is_saved": False,
            },
            {
                "id": self.company_kiev.id,
                "name": "Kyivbud",
                "categories": [],
                "activities": [],
                "region": "Kyiv",
                "region_display": "Київ",
                "founded": 2022,
                "address": "Test Country, Test City, St. Test, 1",
                "banner_image": None,
                "logo_image": None,
                "person": self.company_kiev.person_id,
                "is_saved": False,
            },
        ]

        response = self.client.get(path="/api/search/?ordering=name")
        self.assertEqual(200, response.status_code)
        self.assertEqual(4, len(response.data))
        self.assertEqual(ordered_response_data, response.json())

    def test_get_profile_ordered_by_name_asc_authorized(
        self,
    ):
        self.client.force_authenticate(self.user)
        ordered_response_data = [
            {
                "id": self.company_charkiv.id,
                "name": "Charkivmarket",
                "categories": [],
                "activities": [],
                "region": "Kharkiv region",
                "region_display": "Харківська область",
                "founded": 2022,
                "address": "Test Country, Test City, St. Test, 1",
                "banner_image": None,
                "logo_image": None,
                "person": self.company_charkiv.person_id,
                "is_saved": False,
            },
            {
                "id": self.company_chernigiv.id,
                "name": "Chernigivtravel",
                "categories": [],
                "activities": [],
                "region": "Chernihiv region",
                "region_display": "Чернігівська область",
                "founded": 2022,
                "address": "Test Country, Test City, St. Test, 1",
                "banner_image": None,
                "logo_image": None,
                "person": self.company_chernigiv.person_id,
                "is_saved": False,
            },
            {
                "id": self.company_dnipro.id,
                "name": "Dniprotrans",
                "categories": [],
                "activities": [],
                "region": "Dnipro region",
                "region_display": "Дніпропетровська область",
                "founded": 2022,
                "address": "Test Country, Test City, St. Test, 1",
                "banner_image": None,
                "logo_image": None,
                "person": self.company_dnipro.person_id,
                "is_saved": False,
            },
            {
                "id": self.company_kiev.id,
                "name": "Kyivbud",
                "categories": [],
                "activities": [],
                "region": "Kyiv",
                "region_display": "Київ",
                "founded": 2022,
                "address": "Test Country, Test City, St. Test, 1",
                "banner_image": None,
                "logo_image": None,
                "person": self.company_kiev.person_id,
                "is_saved": False,
            },
        ]

        response = self.client.get(path="/api/search/?ordering=name")
        self.assertEqual(200, response.status_code)
        self.assertEqual(4, len(response.data))
        self.assertEqual(ordered_response_data, response.json())

    def test_get_profile_ordered_by_name_dsc_unauthorized(
        self,
    ):
        ordered_response_data = [
            {
                "id": self.company_kiev.id,
                "name": "Kyivbud",
                "categories": [],
                "activities": [],
                "region": "Kyiv",
                "region_display": "Київ",
                "founded": 2022,
                "address": "Test Country, Test City, St. Test, 1",
                "banner_image": None,
                "logo_image": None,
                "person": self.company_kiev.person_id,
                "is_saved": False,
            },
            {
                "id": self.company_dnipro.id,
                "name": "Dniprotrans",
                "categories": [],
                "activities": [],
                "region": "Dnipro region",
                "region_display": "Дніпропетровська область",
                "founded": 2022,
                "address": "Test Country, Test City, St. Test, 1",
                "banner_image": None,
                "logo_image": None,
                "person": self.company_dnipro.person_id,
                "is_saved": False,
            },
            {
                "id": self.company_chernigiv.id,
                "name": "Chernigivtravel",
                "categories": [],
                "activities": [],
                "region": "Chernihiv region",
                "region_display": "Чернігівська область",
                "founded": 2022,
                "address": "Test Country, Test City, St. Test, 1",
                "banner_image": None,
                "logo_image": None,
                "person": self.company_chernigiv.person_id,
                "is_saved": False,
            },
            {
                "id": self.company_charkiv.id,
                "name": "Charkivmarket",
                "categories": [],
                "activities": [],
                "region": "Kharkiv region",
                "region_display": "Харківська область",
                "founded": 2022,
                "address": "Test Country, Test City, St. Test, 1",
                "banner_image": None,
                "logo_image": None,
                "person": self.company_charkiv.person_id,
                "is_saved": False,
            },
        ]

        response = self.client.get(path="/api/search/?ordering=-name")
        self.assertEqual(200, response.status_code)
        self.assertEqual(4, len(response.data))
        self.assertEqual(ordered_response_data, response.json())

    def test_get_profile_ordered_by_name_dsc_authorized(
        self,
    ):
        self.client.force_authenticate(self.user)
        ordered_response_data = [
            {
                "id": self.company_kiev.id,
                "name": "Kyivbud",
                "categories": [],
                "activities": [],
                "region": "Kyiv",
                "region_display": "Київ",
                "founded": 2022,
                "address": "Test Country, Test City, St. Test, 1",
                "banner_image": None,
                "logo_image": None,
                "person": self.company_kiev.person_id,
                "is_saved": False,
            },
            {
                "id": self.company_dnipro.id,
                "name": "Dniprotrans",
                "categories": [],
                "activities": [],
                "region": "Dnipro region",
                "region_display": "Дніпропетровська область",
                "founded": 2022,
                "address": "Test Country, Test City, St. Test, 1",
                "banner_image": None,
                "logo_image": None,
                "person": self.company_dnipro.person_id,
                "is_saved": False,
            },
            {
                "id": self.company_chernigiv.id,
                "name": "Chernigivtravel",
                "categories": [],
                "activities": [],
                "region": "Chernihiv region",
                "region_display": "Чернігівська область",
                "founded": 2022,
                "address": "Test Country, Test City, St. Test, 1",
                "banner_image": None,
                "logo_image": None,
                "person": self.company_chernigiv.person_id,
                "is_saved": False,
            },
            {
                "id": self.company_charkiv.id,
                "name": "Charkivmarket",
                "categories": [],
                "activities": [],
                "region": "Kharkiv region",
                "region_display": "Харківська область",
                "founded": 2022,
                "address": "Test Country, Test City, St. Test, 1",
                "banner_image": None,
                "logo_image": None,
                "person": self.company_charkiv.person_id,
                "is_saved": False,
            },
        ]

        response = self.client.get(path="/api/search/?ordering=-name")
        self.assertEqual(200, response.status_code)
        self.assertEqual(4, len(response.data))
        self.assertEqual(ordered_response_data, response.json())

    def test_get_profile_ordered_by_region_asc_unauthorized(
        self,
    ):
        ordered_response_data = [
            {
                "id": self.company_chernigiv.id,
                "name": "Chernigivtravel",
                "categories": [],
                "activities": [],
                "region": "Chernihiv region",
                "region_display": "Чернігівська область",
                "founded": 2022,
                "address": "Test Country, Test City, St. Test, 1",
                "banner_image": None,
                "logo_image": None,
                "person": self.company_chernigiv.person_id,
                "is_saved": False,
            },
            {
                "id": self.company_dnipro.id,
                "name": "Dniprotrans",
                "categories": [],
                "activities": [],
                "region": "Dnipro region",
                "region_display": "Дніпропетровська область",
                "founded": 2022,
                "address": "Test Country, Test City, St. Test, 1",
                "banner_image": None,
                "logo_image": None,
                "person": self.company_dnipro.person_id,
                "is_saved": False,
            },
            {
                "id": self.company_charkiv.id,
                "name": "Charkivmarket",
                "categories": [],
                "activities": [],
                "region": "Kharkiv region",
                "region_display": "Харківська область",
                "founded": 2022,
                "address": "Test Country, Test City, St. Test, 1",
                "banner_image": None,
                "logo_image": None,
                "person": self.company_charkiv.person_id,
                "is_saved": False,
            },
            {
                "id": self.company_kiev.id,
                "name": "Kyivbud",
                "categories": [],
                "activities": [],
                "region": "Kyiv",
                "region_display": "Київ",
                "founded": 2022,
                "address": "Test Country, Test City, St. Test, 1",
                "banner_image": None,
                "logo_image": None,
                "person": self.company_kiev.person_id,
                "is_saved": False,
            },
        ]

        response = self.client.get(path="/api/search/?ordering=region")
        self.assertEqual(200, response.status_code)
        self.assertEqual(4, len(response.data))
        self.assertEqual(ordered_response_data, response.json())

    def test_get_profile_ordered_by_region_asc_authorized(
        self,
    ):
        self.client.force_authenticate(self.user)
        ordered_response_data = [
            {
                "id": self.company_chernigiv.id,
                "name": "Chernigivtravel",
                "categories": [],
                "activities": [],
                "region": "Chernihiv region",
                "region_display": "Чернігівська область",
                "founded": 2022,
                "address": "Test Country, Test City, St. Test, 1",
                "banner_image": None,
                "logo_image": None,
                "person": self.company_chernigiv.person_id,
                "is_saved": False,
            },
            {
                "id": self.company_dnipro.id,
                "name": "Dniprotrans",
                "categories": [],
                "activities": [],
                "region": "Dnipro region",
                "region_display": "Дніпропетровська область",
                "founded": 2022,
                "address": "Test Country, Test City, St. Test, 1",
                "banner_image": None,
                "logo_image": None,
                "person": self.company_dnipro.person_id,
                "is_saved": False,
            },
            {
                "id": self.company_charkiv.id,
                "name": "Charkivmarket",
                "categories": [],
                "activities": [],
                "region": "Kharkiv region",
                "region_display": "Харківська область",
                "founded": 2022,
                "address": "Test Country, Test City, St. Test, 1",
                "banner_image": None,
                "logo_image": None,
                "person": self.company_charkiv.person_id,
                "is_saved": False,
            },
            {
                "id": self.company_kiev.id,
                "name": "Kyivbud",
                "categories": [],
                "activities": [],
                "region": "Kyiv",
                "region_display": "Київ",
                "founded": 2022,
                "address": "Test Country, Test City, St. Test, 1",
                "banner_image": None,
                "logo_image": None,
                "person": self.company_kiev.person_id,
                "is_saved": False,
            },
        ]

        response = self.client.get(path="/api/search/?ordering=region")
        self.assertEqual(200, response.status_code)
        self.assertEqual(4, len(response.data))
        self.assertEqual(ordered_response_data, response.json())

    def test_get_profile_ordered_by_region_dsc_unauthorized(
        self,
    ):
        ordered_response_data = [
            {
                "id": self.company_kiev.id,
                "name": "Kyivbud",
                "categories": [],
                "activities": [],
                "region": "Kyiv",
                "region_display": "Київ",
                "founded": 2022,
                "address": "Test Country, Test City, St. Test, 1",
                "banner_image": None,
                "logo_image": None,
                "person": self.company_kiev.person_id,
                "is_saved": False,
            },
            {
                "id": self.company_charkiv.id,
                "name": "Charkivmarket",
                "categories": [],
                "activities": [],
                "region": "Kharkiv region",
                "region_display": "Харківська область",
                "founded": 2022,
                "address": "Test Country, Test City, St. Test, 1",
                "banner_image": None,
                "logo_image": None,
                "person": self.company_charkiv.person_id,
                "is_saved": False,
            },
            {
                "id": self.company_dnipro.id,
                "name": "Dniprotrans",
                "categories": [],
                "activities": [],
                "region": "Dnipro region",
                "region_display": "Дніпропетровська область",
                "founded": 2022,
                "address": "Test Country, Test City, St. Test, 1",
                "banner_image": None,
                "logo_image": None,
                "person": self.company_dnipro.person_id,
                "is_saved": False,
            },
            {
                "id": self.company_chernigiv.id,
                "name": "Chernigivtravel",
                "categories": [],
                "activities": [],
                "region": "Chernihiv region",
                "region_display": "Чернігівська область",
                "founded": 2022,
                "address": "Test Country, Test City, St. Test, 1",
                "banner_image": None,
                "logo_image": None,
                "person": self.company_chernigiv.person_id,
                "is_saved": False,
            },
        ]

        response = self.client.get(path="/api/search/?ordering=-region")
        self.assertEqual(200, response.status_code)
        self.assertEqual(4, len(response.data))
        self.assertEqual(ordered_response_data, response.json())

    def test_get_profile_ordered_by_region_dsc_authorized(
        self,
    ):
        self.client.force_authenticate(self.user)
        ordered_response_data = [
            {
                "id": self.company_kiev.id,
                "name": "Kyivbud",
                "categories": [],
                "activities": [],
                "region": "Kyiv",
                "region_display": "Київ",
                "founded": 2022,
                "address": "Test Country, Test City, St. Test, 1",
                "banner_image": None,
                "logo_image": None,
                "person": self.company_kiev.person_id,
                "is_saved": False,
            },
            {
                "id": self.company_charkiv.id,
                "name": "Charkivmarket",
                "categories": [],
                "activities": [],
                "region": "Kharkiv region",
                "region_display": "Харківська область",
                "founded": 2022,
                "address": "Test Country, Test City, St. Test, 1",
                "banner_image": None,
                "logo_image": None,
                "person": self.company_charkiv.person_id,
                "is_saved": False,
            },
            {
                "id": self.company_dnipro.id,
                "name": "Dniprotrans",
                "categories": [],
                "activities": [],
                "region": "Dnipro region",
                "region_display": "Дніпропетровська область",
                "founded": 2022,
                "address": "Test Country, Test City, St. Test, 1",
                "banner_image": None,
                "logo_image": None,
                "person": self.company_dnipro.person_id,
                "is_saved": False,
            },
            {
                "id": self.company_chernigiv.id,
                "name": "Chernigivtravel",
                "categories": [],
                "activities": [],
                "region": "Chernihiv region",
                "region_display": "Чернігівська область",
                "founded": 2022,
                "address": "Test Country, Test City, St. Test, 1",
                "banner_image": None,
                "logo_image": None,
                "person": self.company_chernigiv.person_id,
                "is_saved": False,
            },
        ]

        response = self.client.get(path="/api/search/?ordering=-region")
        self.assertEqual(200, response.status_code)
        self.assertEqual(4, len(response.data))
        self.assertEqual(ordered_response_data, response.json())
