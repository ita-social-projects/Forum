from rest_framework.permissions import BasePermission, SAFE_METHODS


class UserIsProfileOwnerOrReadOnly(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            if request.query_params.get("with_contacts"):
                return True if request.user.is_authenticated else False
            return True

        return obj.person == request.user

class SavedCompaniesListPermission(BasePermission):
    def has_permission(self, request, view):
        if request.query_params.get("filters") == "is_saved":
            return request.user.is_authenticated
        return True


class UserIsAdmin(BasePermission):
    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True
        return request.user.is_staff
