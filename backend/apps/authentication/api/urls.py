from django.urls import include, path, re_path

app_name = "authentication"

urlpatterns = [
    # /api/authentication/...
    path("auth/", include("djoser.urls")),
    re_path(r"^auth/", include("djoser.urls.authtoken")),
]
