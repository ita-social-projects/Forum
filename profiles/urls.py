from django.urls import path
from .views.saved_companys_views import (
    SavedCompaniesCreate,
    SavedCompaniesDestroy,
)
from .views.views import (
    ActivityList,
    RegionList,
    ActivityDetail,
    RegionDetail,
)
from .views.viewed_company_views import ProfileViewCreate
from .views.profile_list_views import ProfileList
from .views.profile_detail_views import ProfileDetail
from .views.category_views import CategoryList, CategoryDetail


app_name = "profiles"

urlpatterns = [
    path(r"profiles/", ProfileList.as_view(), name="profile-list"),
    path(r"profiles/<pk>", ProfileDetail.as_view(), name="profile-detail"),
    path(
        "saved-list/",
        SavedCompaniesCreate.as_view(),
        name="saved_companies_create",
    ),
    path(
        "saved-list/<pk>/",
        SavedCompaniesDestroy.as_view(),
        name="saved_companies_destroy",
    ),
    path(
        "company-view/<int:profile_id>/",
        ProfileViewCreate.as_view(),
        name="company_details_request",
    ),
    path("regions/", RegionList.as_view(), name="region-list"),
    path("categories/", CategoryList.as_view(), name="category_list"),
    path("activities/", ActivityList.as_view(), name="activity_list"),
    path("categories/<pk>/", CategoryDetail.as_view(), name="category-detail"),
    path("activities/<pk>/", ActivityDetail.as_view(), name="activity-detail"),
    path("regions/<pk>/", RegionDetail.as_view(), name="region-detail"),
]
