from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response


class ForumPagination(PageNumberPagination):
    page_size = 16
    page_size_query_param = "page_size"
    max_page_size = 64

    def get_page_number(self, request, paginator):
        page_number = super().get_page_number(request, paginator)
        if int(page_number) > paginator.num_pages:
            page_number = paginator.num_pages or 1
        return page_number

    def get_paginated_response(self, data):
        return Response(
            {
                "total_items": self.page.paginator.count,
                "total_pages": self.page.paginator.num_pages,
                "current": self.page.number,
                "next": self.get_next_link(),
                "previous": self.get_previous_link(),
                "results": data,
            }
        )
