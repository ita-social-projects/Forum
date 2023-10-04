from django.urls import include, path, re_path

app_name = "authentication"

urlpatterns = [
    path("auth/", include("djoser.urls")),
    re_path(r"^auth/", include("djoser.urls.authtoken")),
]
