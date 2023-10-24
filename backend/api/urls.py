from django.urls import include, path

urlpatterns = [
    # /api/...
    path("admin/", include("apps.administration.api.urls")),
    path("authentication/", include("apps.authentication.api.urls")),
    path("profiles/", include("apps.profiles.api.urls")),
    path("search/", include("apps.search.api.urls")),
]
