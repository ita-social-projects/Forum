from django.urls import path
from .views import UsersListView, UserDetailView

app_name = "administration"

urlpatterns = [
    path('users/', UsersListView.as_view(), name='users-list'),
    path('users/<pk>/', UserDetailView.as_view(), name='user'),
]
