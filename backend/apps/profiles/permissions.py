from rest_framework.permissions import BasePermission, SAFE_METHODS
from django.core.exceptions import ObjectDoesNotExist

from backend.api.permission_classes import BaseNoObjectPermission
from backend.apps.profiles.models import Profile


class UserIsProfileOwner(BaseNoObjectPermission):

    def has_permission(self, request, view):
        return view._get_profile.person == request.user


class ReadOnly(BasePermission):
    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True


class IsOwnCompany(BasePermission):
    def has_permission(self, request, view):
        user = request.user
        pk = request.data.get("company_pk")
        try:
            profile = Profile.objects.get(id=pk)
        except ObjectDoesNotExist:
            return True
        return str(profile.person_id) != str(user.id)
