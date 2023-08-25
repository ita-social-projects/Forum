from rest_framework.test import APITestCase, APIClient
from authentication.models import CustomUser
from profiles.models import Profile
from rest_framework import status


class SavedCompaniesListCreateDestroyAPITest(APITestCase):

    @classmethod
    def setUpTestData(cls):
        test_user = CustomUser.objects.create_user(
            person_email="testuser1@test.com",
            password="testuser1",
            person_name="testuser1",
            person_surname="testuser1",
            is_active=True
        )

        test_user2 = CustomUser.objects.create_user(
            person_email="testuser2@test.com",
            password="testuser2",
            person_name="testuser2",
            person_surname="testuser2",
            is_active=True
        )

        test_company1 = Profile.objects.create(
            person=test_user,
            comp_is_startup=True,
            comp_registered=False
        )
        test_company2 = Profile.objects.create(
            person=test_user2,
            comp_is_startup=True,
            comp_registered=False
        )

    def setUp(self):
        self.client = APIClient()

        # login users & get tokens
        self.token1 = self.client.post(
            path="/api/auth/token/login/",
            data={
                "person_email": "testuser1@test.com",
                "password": "testuser1"
            }).data["auth_token"]
        self.client.credentials(HTTP_AUTHORIZATION=f"Token {self.token1}")

        self.token2 = self.client.post(
            path="/api/auth/token/login/",
            data={
                "person_email": "testuser2@test.com",
                "password": "testuser2"
            }).data["auth_token"]
        self.client.credentials(HTTP_AUTHORIZATION=f"Token {self.token2}")

        self.company1_id = self.client.get("/api/profiles/").data[0]["profile_id"]
        self.company2_id = self.client.get("/api/profiles/").data[1]["profile_id"]

    def test_add_test_company1_to_saved_list_by_test_user2(self):
        response = self.client.post('/api/saved-list/',
                                    data={
                                        'company_pk': '{company1_id}'.format(company1_id=self.company1_id),
                                        'Authentication': self.token2
                                    }
                                    )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        company_added_info = response.data['Company added']
        self.assertEqual(company_added_info['company'], self.company1_id)

    def test_add_test_company2_to_saved_list_by_test_user2(self):
        response = self.client.post('/api/saved-list/',
                                    data={
                                        'company_pk': '{company2_id}'.format(company2_id=self.company2_id),
                                        'Authentication': self.token2
                                    }
                                    )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        company_added_info = response.data['Company added']
        self.assertEqual(company_added_info['company'], self.company2_id)

    def test_get_test_user2_company_saved_list(self):
        self.client.post('/api/saved-list/', data={'company_pk': '{company1_id}'.format(company1_id=self.company1_id),
                                                   'Authentication': self.token2})
        self.client.post('/api/saved-list/', data={'company_pk': '{company2_id}'.format(company2_id=self.company2_id),
                                                   'Authentication': self.token2})
        response = self.client.get('/api/saved-list/',
                                   data={
                                       'Authentication': self.token2
                                   }
                                   )
        companies_info = response.data['Companies']
        self.assertEqual(200, response.status_code)
        self.assertEqual(2, len(companies_info))

    def test_delete_test_user2_company_saved_list_item(self):
        self.client.post('/api/saved-list/', data={'company_pk': '{company1_id}'.format(company1_id=self.company1_id),
                                                   'Authentication': self.token2})
        self.client.post('/api/saved-list/', data={'company_pk': '{company2_id}'.format(company2_id=self.company2_id),
                                                   'Authentication': self.token2})
        response = self.client.delete('/api/saved-list/{company2_id}/'.format(company2_id=self.company2_id),
                                      data={
                                          'Authentication': self.token2
                                      }
                                      )
        self.assertEqual(204, response.status_code)
        response = self.client.get('/api/saved-list/',
                                   data={
                                       'Authentication': self.token2
                                   }
                                   )
        companies_info = response.data['Companies']
        self.assertEqual(200, response.status_code)
        self.assertEqual(1, len(companies_info))

    def test_add_non_existing_company_to_saved_list(self):
        response = self.client.post('/api/saved-list/',
                                    data={
                                        'company_pk': 99999,
                                        'Authentication': self.token1
                                    }
                                    )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_get_saved_companies_without_authentication(self):
        self.client.logout()
        response = self.client.get('/api/saved-list/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_relike_user2_company_saved_list_item(self):
        self.client.post('/api/saved-list/', data={'company_pk': '{company1_id}'.format(company1_id=self.company1_id),
                                                   'Authentication': self.token2})
        self.client.post('/api/saved-list/', data={'company_pk': '{company2_id}'.format(company2_id=self.company2_id),
                                                   'Authentication': self.token2})
        self.client.post('/api/saved-list/', data={'company_pk': '{company2_id}'.format(company2_id=self.company2_id),
                                                   'Authentication': self.token2})
        self.client.post('/api/saved-list/', data={'company_pk': '{company1_id}'.format(company1_id=self.company1_id),
                                                   'Authentication': self.token2})

        response = self.client.get('/api/saved-list/',
                                   data={
                                       'Authentication': self.token2
                                   }
                                   )
        companies_info = response.data['Companies']
        self.assertEqual(200, response.status_code)
        self.assertEqual(0, len(companies_info))
