from rest_framework.permissions import BasePermission, SAFE_METHODS
from django.core.exceptions import ObjectDoesNotExist
from profiles.models import Profile


class UserIsProfileOwnerOrReadOnly(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        return obj.person == request.user


class RequestIsCreate(BasePermission):
    def has_permission(self, request, view):
        return request.method == "POST"


class RequestIsReadOnly(BasePermission):
    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True


class IsOwner(BasePermission):
    def has_permission(self, request, view):
        return request.user == view._profile.person


class OnlyRequestUserOrAdmin(BasePermission):
    def has_permission(self, request, view):
        user = request.user
        if request.method in SAFE_METHODS and user.is_staff:
            return True
        return str(request.user.id) == str(request.data.get("user"))


class IsOwnCompany(BasePermission):
    def has_permission(self, request, view):
        user = request.user
        pk = request.data.get("company")
        try:
            profile = Profile.objects.get(id=pk)
        except ObjectDoesNotExist:
            return True
        return str(profile.person_id) != str(user.id)
