from rest_framework.permissions import BasePermission, SAFE_METHODS
from django.core.exceptions import ObjectDoesNotExist
from profiles.models import Profile


class UserIsProfileOwnerOrReadOnly(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            if request.query_params.get("with_contacts"):
                return True if request.user.is_authenticated else False
            return True

        return obj.person == request.user


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
