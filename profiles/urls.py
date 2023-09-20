from django.urls import path
from .views import SavedCompaniesCreate, SavedCompaniesDestroy
from .views import ProfileList, ProfileDetail, ViewedCompanyList, CategoryList, ActivityList, RegionListView, \
    CategoryDetail, ActivityDetail


app_name = "profiles"

urlpatterns = [
    path(r'profiles/', ProfileList.as_view(), name='profile-list'),
    path(r'profiles/<pk>', ProfileDetail.as_view(), name='profile-detail'),
    path('saved-list/', SavedCompaniesCreate.as_view(), name='saved_companies_create'),
    path('saved-list/<pk>/', SavedCompaniesDestroy.as_view(), name='saved_companies_destroy'),
    path('viewed-list/', ViewedCompanyList.as_view(), name='viewed_company_list'),
    path('regions/', RegionListView.as_view(), name='region-list'),
    path('categories/', CategoryList.as_view(), name='category_list'),
    path('activities/', ActivityList.as_view(), name='activity_list'),
    path('categories/<pk>', CategoryDetail.as_view(), name='category-detail'),
    path('activities/<pk>', ActivityDetail.as_view(), name='activity-detail'),
]
