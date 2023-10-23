from django.urls import include, path

urlpatterns = [
    # /api/...
    path('/authentication/', include('apps.authentication.api.urls')),
]