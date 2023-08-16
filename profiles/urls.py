from django.urls import path
from .views import ProfileList, ProfileDetail

app_name = "profiles"

urlpatterns = [
    path(r'profiles/', ProfileList.as_view(), name='profile-list'),
    path(r'profiles/<pk>', ProfileDetail.as_view(), name='profile-detail'),
]
