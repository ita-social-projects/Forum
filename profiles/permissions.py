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


class OnlyAdminRead(BasePermission):
    def has_permission(self, request, view):
        user = request.user
        if request.method in SAFE_METHODS:
            return user.is_staff
        return True


class IsOwnCompany(BasePermission):
    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True
        pk = view.kwargs['company_pk']
        profile = Profile.objects.filter(id=pk).first()
        if profile:
            return str(profile.person_id) != str(request.user.id)
        return False
