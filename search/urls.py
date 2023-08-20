from django.urls import path
from . import views

urlpatterns = [
    path('', views.show_companies, name='show_companies'),                      # localhost:8000/search/
]