from django.urls import path
from .views import UsersListView, UserUpdateDestroyDetailView

app_name = "administration"

urlpatterns = [
    path('users/', UsersListView.as_view(), name='users-list'),
    path('users/<pk>/', UserUpdateDestroyDetailView.as_view(), name='user'),
]
