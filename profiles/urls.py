from django.urls import path
from .views import SavedCompaniesListCreate, SavedCompaniesDestroy

app_name = "profiles"

urlpatterns = [
    path('saved-list/', SavedCompaniesListCreate.as_view(), name='saved_companies_list_create'),
    path('saved-list/<pk>/', SavedCompaniesDestroy.as_view(), name='saved_companies_destroy'),
]
