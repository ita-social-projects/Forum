from rest_framework import status
from rest_framework.test import APITestCase

from authentication.models import CustomUser


class UserSelfAPITests(APITestCase):  
    @classmethod
    def setUpTestData(cls):
        cls.test_user = CustomUser.objects.create_user(
            person_email="test@test.com",
            password="Test1234",
            person_name="Test",
            person_surname="Test",
        )
        cls.test_user.is_active = True
        cls.test_user.save()      
    
    def test_user_retreive_data_successful(self):
        self.client.force_authenticate(self.test_user)
        url = "/api/auth/users/me/"
        response = self.client.get(url)
        self.assertEqual(response.status_code,
                         status.HTTP_200_OK)
        self.assertEqual({"person_name": "Test", "person_surname": "Test"}, response.json())
        
    def test_user_retreive_data_not_logged_in(self):
        url = "/api/auth/users/me/"
        response = self.client.get(url)
        self.assertEqual(response.status_code,
                         status.HTTP_401_UNAUTHORIZED)
        self.assertEqual({"detail": "Authentication credentials were not provided."}, response.json())

    def test_user_update_all_fields_successful(self):
        self.client.force_authenticate(self.test_user)
        url = "/api/auth/users/me/"
        data = {
            "person_name": "Ivan",
            "person_surname": "Ivanenko",
        }
        response = self.client.put(url, data)
        self.assertEqual(response.status_code,
                         status.HTTP_200_OK)
        self.assertEqual({"person_name": "Ivan", "person_surname": "Ivanenko"}, response.json())

    def test_user_update_one_field_successful(self):
        self.client.force_authenticate(self.test_user)
        url = "/api/auth/users/me/"
        data = {
            "person_surname": "Petrenko",
        }
        response = self.client.patch(url, data)
        self.assertEqual(response.status_code,
                         status.HTTP_200_OK)
        self.assertEqual({"person_name": "Test", "person_surname": "Petrenko"}, response.json())
        
    def test_user_delete(self):
        url = "/api/auth/users/me/"
        data = {"password": "Test1234"}
        response = self.client.get(url, data)
        self.assertEqual(response.status_code,
                         status.HTTP_401_UNAUTHORIZED)
        self.assertEqual({"detail": "Authentication credentials were not provided."}, response.json())