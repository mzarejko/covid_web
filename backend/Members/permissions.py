from rest_framework import permissions
from .models import Needy, Volunteer

class IsNeedyActive(permissions.BasePermission):
    message="Needy can only perform this action"

    def has_permission(self, request, view):
        needy = Needy.objects.get(user=request.user)
        return needy.is_active

class IsVolunteerActive(permissions.BasePermission):
    message="Volunteer can only perform this action"
    
    def has_permission(self, request, view):
        volunteer =  Volunteer.objects.get(user=request.user)
        return volunteer.is_active

class IsNeedyInactive(permissions.BasePermission):
    message="Needy have to by inactive"

    def has_permission(self, request, view):
        needy = Needy.objects.get(user=request.user)
        return not needy.is_active

class IsVolunteerInactive(permissions.BasePermission):
    message="Volunteer have to by inactive"
    
    def has_permission(self, request, view):
        volunteer =  Volunteer.objects.get(user=request.user)
        return not volunteer.is_active

class IsNeedyOwner(permissions.BasePermission):
    message="Needy have to by owner of object"

    def has_object_permission(self, request, view, obj):
        needy = Needy.objects.get(user=request.user)
        return obj.needy == needy
