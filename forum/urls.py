"""Forum URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path
from profiles.views import add_to_saved_list, remove_from_saved_list, saved_list_state

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('authentication.urls', namespace='authentication')),

    path('saved-list/add/<int:profile_id>/', add_to_saved_list, name='add_to_saved_list'),
    path('saved-list/remove/<int:profile_id>/', remove_from_saved_list, name='remove_from_saved_list'),
    path('saved-list/state/', saved_list_state, name='saved_list-state'),
]
