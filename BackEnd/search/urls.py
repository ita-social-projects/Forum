from django.urls import path

from search.views import SearchCompanyView, AdvancedSearchView

app_name = "search"

urlpatterns = [
    path(
        "search/", SearchCompanyView.as_view(), name="search-company"
    ),  # localhost:8000/api/search/
    path(
        "search/advanced", AdvancedSearchView.as_view(), name="advanced-search"
    ),  # localhost:8000/api/search/advanced?search=something
]
