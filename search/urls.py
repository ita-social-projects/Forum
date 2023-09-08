from django.urls import path
from search.views import *

app_name = 'search'

urlpatterns = [
    path('search/', SearchCompanyView.as_view(), name='search-company'),                      # localhost:8000/api/search/
]
