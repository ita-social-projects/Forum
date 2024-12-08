from rest_framework import status
from rest_framework.test import APITestCase

from administration.factories import AdminCategoryFactory, AdminUserFactory
from utils.dump_response import dump  # noqa
 


class TestAdminCategoryAPIUserNotStaff(APITestCase):
    def setUp(self):
        self.user = AdminUserFactory(
            is_staff=False,
            is_active=True,
        )
        self.name = AdminCategoryFactory()

    def test_get_category_users_not_staff(self):
        self.client.force_authenticate(self.user)
        response = self.client.get(path="/api/admin/categories/")
        self.assertEqual(status.HTTP_403_FORBIDDEN, response.status_code)

    def test_get_category_id_users_not_staff(self):
        self.client.force_authenticate(self.user)
        response = self.client.get(path="/api/admin/categories/1/")
        self.assertEqual(status.HTTP_403_FORBIDDEN, response.status_code)        


class TestAdminCategoryAPIUserStaff(APITestCase):
    def setUp(self):
        self.user = AdminUserFactory(
            is_staff=True,
            is_active=True,
        )
        self.name = AdminCategoryFactory.create_batch(2)

    def test_get_categoryes_users_staff(self):
        self.client.force_authenticate(self.user)
        response = self.client.get(path="/api/admin/categories/")
        data = [
            {
                "id":3 ,
                "name":"category 3",
            },
            {
                "id":4 ,
                "name":"category 4",
            },
        ]
        print( [dict(item) for item in response.data["results"]])
        self.assertEqual(data,  [dict(item) for item in response.data["results"]])
        self.assertEqual(status.HTTP_200_OK, response.status_code)

    # def test_get_categoryes_id_users_staff(self):
    #     self.client.force_authenticate(self.user)
    #     response = self.client.get(path="/api/admin/categories/1/")
    #     data = [
    #         {
    #             "id":2 ,
    #             "name":"categori",
    #         },
    #         {
    #             "id":2 ,
    #             "name":"categori",
    #         },
    #     ]
    #     print(response)
    #     self.assertEqual(status.HTTP_200_OK, response.status_code)  
    #     self.assertEqual(data, response.data["results"])