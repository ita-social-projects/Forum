from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response


class ListPagination(PageNumberPagination):
    page_size = 3

    def get_paginated_response(self, data):
        return Response({
            "total_items": self.page.paginator.count,
            "total_pages": self.page.paginator.num_pages,
            "current": self.page.number,
            "next": self.get_next_link(),
            "previous": self.get_previous_link(),
            "results": data,
        })
