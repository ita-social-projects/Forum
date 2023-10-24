from rest_framework import permissions
from rest_framework.permissions import SAFE_METHODS


class BaseNoObjectPermission(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        return self.has_permission(request, view)


class RequestIsReadOnly(BaseNoObjectPermission):
    def has_permission(self, request, view):
        return request.method in SAFE_METHODS


class RequestIsCreate(BaseNoObjectPermission):
    def has_permission(self, request, view):
        return request.method == 'POST'


class RequestIsUpdate(BaseNoObjectPermission):
    def has_permission(self, request, view):
        return request.method in ('PUT', 'PATCH')


class RequestIsDelete(BaseNoObjectPermission):
    def has_permission(self, request, view):
        return request.method == 'DELETE'
