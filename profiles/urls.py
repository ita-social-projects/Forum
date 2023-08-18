from django.urls import path
from .views import SavedCompaniesListCreate, SavedCompaniesDestroy
from .views import ProfileList, ProfileDetail

app_name = "profiles"

urlpatterns = [
    path(r'profiles/', ProfileList.as_view(), name='profile-list'),
    path(r'profiles/<pk>', ProfileDetail.as_view(), name='profile-detail'),
    path('saved-list/', SavedCompaniesListCreate.as_view(), name='saved_companies_list_create'),
    path('saved-list/<pk>/', SavedCompaniesDestroy.as_view(), name='saved_companies_destroy'),
]
