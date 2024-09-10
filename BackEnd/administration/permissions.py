from rest_framework.permissions import BasePermission, SAFE_METHODS


class IsStaffUser(BasePermission):
    """
    Custom is staff permission.
    """

    def has_permission(self, request, view):
        return request.user.is_staff


class IsStaffUserOrReadOnly(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_staff or request.method in SAFE_METHODS


class IsSuperUser(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_superuser
