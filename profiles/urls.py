from django.urls import path
from .views import SavedCompaniesList, SavedCompaniesDetails

app_name = "profiles"

urlpatterns = [
    path('saved-list/', SavedCompaniesList.as_view(), name='saved_companies_list'),
    path('saved-list/<pk>/', SavedCompaniesDetails.as_view(), name='add_remove_from_saved_list'),
]
