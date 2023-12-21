from django.urls import path

from search.views import SearchCompanyView, NewMembersList

app_name = "search"

urlpatterns = [
    path(
        "search/", SearchCompanyView.as_view(), name="search-company"
    ),  # localhost:8000/api/search/
    path("new_members/", NewMembersList.as_view(), name="new-members-list"),
]
