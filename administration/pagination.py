from rest_framework.pagination import PageNumberPagination


class UserListPagination(PageNumberPagination):
    page_size = 3

    def get_paginated_response(self, data):
        response = super().get_paginated_response(data)
        response.data['current_page'] = self.page.number
        response.data['total_pages'] = self.page.paginator.num_pages
        return response
