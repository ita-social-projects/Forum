from django.urls import path

from apps.search.api.views import SearchCompanyView

app_name = "search"

urlpatterns = [
    # /api/search/...
    path(
        "search/", SearchCompanyView.as_view(), name="search-company"
    ),
]
