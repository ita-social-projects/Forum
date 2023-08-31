from django.urls import path, re_path, include
from .views import ProfileList, ProfileDetail

app_name = "administration"

urlpatterns = [
    path("auth/", include('djoser.urls')),
    re_path(r"^auth/", include('djoser.urls.authtoken')),
    path('profiles/', ProfileList.as_view(), name='profile-list'),
    path('profiles/<pk>', ProfileDetail.as_view(), name='profile-detail'),
]
