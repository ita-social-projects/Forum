from rest_framework.test import APITestCase, APIClient
from authentication.models import CustomUser
from profiles.models import Profile
from utils.dump_response import dump  # noqa


class TestViewedCompanyAPI(APITestCase):
    def setUp(self) -> None:
        self.test_person = CustomUser.objects.create_user(
            person_email="test1@test.com",
            password="Testing01",
            person_name="test1",
            person_surname="test",
            is_active=True
        )
        test_person2 = CustomUser.objects.create_user(
            person_email="test2@test.com",
            password="Testing01",
            person_name="test2",
            person_surname="test",
            is_active=True
        )
        test_person3 = CustomUser.objects.create_user(
            person_email="test3@test.com",
            password="Testing01",
            person_name="test3",
            person_surname="test",
            is_active=True
        )
        self.test_profile = Profile.objects.create(
            person=self.test_person,
            comp_is_startup=True,
            comp_registered=False
        )
        self.test_profile2 = Profile.objects.create(
            person=test_person2,
            comp_registered=True,
            comp_is_startup=False
        )
        self.test_profile3 = Profile.objects.create(
            person=test_person3,
            comp_registered=True,
            comp_is_startup=False
        )

    def test_create_viewed_company_unauthorized(self):
        response = self.client.post(
            path="/api/viewed-list/",
            data={
                "company": self.test_profile.profile_id
            })
        self.assertEqual(401, response.status_code)

    def test_create_viewed_company_authorized(self):
        self.client.force_authenticate(self.test_person)
        response = self.client.post(
            path="/api/viewed-list/",
            data={
                "user": self.test_person.id,
                "company": self.test_profile2.profile_id
            })
        self.assertEqual(201, response.status_code)
        self.assertEqual(self.test_person.id, response.data["user"])
        self.assertEqual(self.test_profile2.profile_id, response.data["company"])

    def test_create_viewed_company_authorized_own_company(self):
        self.client.force_authenticate(self.test_person)
        response = self.client.post(
            path="/api/viewed-list/",
            data={
                "user": self.test_person.id,
                "company": self.test_profile.profile_id
            })
        self.assertEqual(400, response.status_code)

    def test_get_viewed_companies_unauthorized(self):
        response = self.client.post(path="/api/viewed-list/")
        self.assertEqual(401, response.status_code)

    def test_get_viewed_companies_authorized(self):
        self.client.force_authenticate(self.test_person)
        # add 2 companies to viewed
        self.client.post(
            path="/api/viewed-list/",
            data={
                "user": self.test_person.id,
                "company": self.test_profile2.profile_id
            })
        self.client.post(
            path="/api/viewed-list/",
            data={
                "user": self.test_person.id,
                "company": self.test_profile3.profile_id
            })
        response = self.client.get("/api/viewed-list/")

        self.assertEqual(200, response.status_code)
        self.assertEqual(2, len(response.data))
