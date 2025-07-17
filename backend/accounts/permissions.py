from rest_framework import permissions

class IsAdminUser(permissions.BasePermission):
    """
    관리자 권한 확인
    """
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and request.user.is_staff

class IsSuperUser(permissions.BasePermission):
    """
    슈퍼유저 권한 확인
    """
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and request.user.is_superuser

class IsOwnerOrAdmin(permissions.BasePermission):
    """
    객체 소유자 또는 관리자 권한 확인
    """
    def has_object_permission(self, request, view, obj):
        return request.user.is_staff or obj == request.user 