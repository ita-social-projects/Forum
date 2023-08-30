from django.urls import path
from .views import ProfileList, ProfileDetail

app_name = "administration"

urlpatterns = [
    path('profiles/', ProfileList.as_view(), name='profile-list'),
    path('profiles/<pk>', ProfileDetail.as_view(), name='profile-detail'),
]
