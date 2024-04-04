from rest_framework.test import APITestCase

from authentication.factories import UserFactory
from profiles.factories import RegionFactory


class TestRegionList(APITestCase):
    def setUp(self) -> None:
        self.kyiv_region = RegionFactory(name_eng="Kyiv", name_ukr="Київ")
        self.dnipro_region = RegionFactory(
            name_eng="Dnipro", name_ukr="Дніпро"
        )
        self.kharkiv_region = RegionFactory(
            name_eng="Kharkiv", name_ukr="Харків"
        )
        self.chernihiv_region = RegionFactory(
            name_eng="Chernihiv", name_ukr="Чернігів"
        )
        self.test_person_is_admin = UserFactory(is_staff=True)
        self.test_person_just_user = UserFactory()

    def test_get_all_regions_unauthorized(self):
        response = self.client.get("/api/regions/")
        self.assertEqual(200, response.status_code)

    def test_get_region_data_authorized_admin(self):
        self.client.force_authenticate(self.test_person_is_admin)
        response = self.client.get(
            "/api/regions/{id}/".format(id=self.dnipro_region.id)
        )
        self.assertEqual(
            {
                "id": self.dnipro_region.id,
                "name_eng": self.dnipro_region.name_eng,
                "name_ukr": self.dnipro_region.name_ukr,
            },
            response.json(),
        )

    def test_get_region_authorized_admin(self):
        self.client.force_authenticate(self.test_person_is_admin)
        response_get = self.client.get("/api/regions/")
        list_of_regions = response_get.data
        region_for_get = list_of_regions[0]
        response = self.client.get(
            path="/api/regions/{id}/".format(id=region_for_get["id"])
        )
        self.assertEqual(200, response.status_code)

    def test_get_all_regions_authorized_user(self):
        self.client.force_authenticate(self.test_person_just_user)
        response = self.client.get("/api/regions/")
        self.assertEqual(200, response.status_code)

    def test_get_all_regions_authorized_admin(self):
        self.client.force_authenticate(self.test_person_is_admin)
        response = self.client.get("/api/regions/")
        self.assertEqual(200, response.status_code)

    def test_get_region_not_exists(self):
        self.client.force_authenticate(self.test_person_is_admin)
        response = self.client.get("/api/regions/20000/")
        self.assertEqual(404, response.status_code)

    def test_create_region_unauthorized(self):
        response = self.client.post(
            path="/api/regions/",
            data={"name_eng": "Kherson", "name_ukr": "Херсон"},
        )
        self.assertEqual(401, response.status_code)

    def test_create_region_not_staff(self):
        self.client.force_authenticate(self.test_person_just_user)
        response = self.client.post(
            path="/api/regions/",
            data={"name_eng": "Kherson", "name_ukr": "Херсон"},
        )
        self.assertEqual(403, response.status_code)

    def test_create_region_is_staff(self):
        self.client.force_authenticate(self.test_person_is_admin)
        response = self.client.post(
            path="/api/regions/",
            data={"name_eng": "Kherson", "name_ukr": "Херсон"},
        )
        self.assertEqual(201, response.status_code)

    def test_create_region_exists_is_staff(self):
        self.client.force_authenticate(self.test_person_is_admin)
        response = self.client.post(
            path="/api/regions/",
            data={"name_eng": "Dnipro", "name_ukr": "Дніпро"},
        )
        self.assertEqual(400, response.status_code)

    def test_put_region_unauthorized(self):
        response = self.client.put(
            path="/api/regions/1/",
            data={"name_eng": "Kryvyi Rih", "name_ukr": "Кривй Ріг"},
        )
        self.assertEqual(401, response.status_code)

    def test_put_region_not_staff(self):
        self.client.force_authenticate(self.test_person_just_user)
        response = self.client.put(
            path="/api/regions/1/",
            data={"name_eng": "Kryvyi Rih", "name_ukr": "Кривй Ріг"},
        )
        self.assertEqual(403, response.status_code)

    def test_put_region_is_staff(self):
        self.client.force_authenticate(self.test_person_is_admin)
        response_get = self.client.get("/api/regions/")
        list_of_regions = response_get.data
        region_for_put = list_of_regions[0]
        response = self.client.put(
            path="/api/regions/{id}/".format(id=region_for_put["id"]),
            data={"name_eng": "Kryvyi Rih", "name_ukr": "Кривий Ріг"},
        )
        self.assertEqual(200, response.status_code)

    def test_patch_region_unauthorized(self):
        response = self.client.patch(
            path="/api/regions/2/", data={"name_eng": "Zhovti Vody"}
        )
        self.assertEqual(401, response.status_code)

    def test_patch_region_not_staff(self):
        self.client.force_authenticate(self.test_person_just_user)
        response = self.client.patch(
            path="/api/regions/2/", data={"name_eng": "Zhovti Vody"}
        )
        self.assertEqual(403, response.status_code)

    def test_patch_region_is_staff(self):
        self.client.force_authenticate(self.test_person_is_admin)
        response_get = self.client.get("/api/regions/")
        list_of_regions = response_get.data
        region_for_patch = list_of_regions[0]
        response = self.client.patch(
            path="/api/regions/{id}/".format(id=region_for_patch["id"]),
            data={"name_eng": "Zhovti Vody"},
        )
        self.assertEqual(200, response.status_code)

    def test_delete_region_unauthorized(self):
        response = self.client.delete(path="/api/regions/1/")
        self.assertEqual(401, response.status_code)

    def test_delete_region_not_staff(self):
        self.client.force_authenticate(self.test_person_just_user)
        response = self.client.delete(path="/api/regions/1/")
        self.assertEqual(403, response.status_code)

    def test_delete_region_is_staff(self):
        self.client.force_authenticate(self.test_person_is_admin)
        response_get = self.client.get("/api/regions/")
        list_of_regions = response_get.data
        region_for_delete = list_of_regions[0]
        response = self.client.delete(
            path="/api/regions/{id}/".format(id=region_for_delete["id"])
        )
        self.assertEqual(204, response.status_code)

    def test_delete_region_not_exists_is_staff(self):
        self.client.force_authenticate(self.test_person_is_admin)
        response = self.client.delete(path="/api/regions/20000/")
        self.assertEqual(404, response.status_code)
