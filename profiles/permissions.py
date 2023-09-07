from rest_framework.permissions import BasePermission, SAFE_METHODS


class UserIsProfileOwnerOrReadOnly(BasePermission):

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True

        return obj.person == request.user


class IsAllowedToViewContacts(BasePermission):

    def has_permission(self, request, view):
        return request.user.is_authenticated and request.method in SAFE_METHODS
