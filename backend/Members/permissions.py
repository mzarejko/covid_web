from rest_framework import permissions
from .models import Needy, Volunteer

class IsNeedyActive(permissions.BasePermission):

    def has_permission(self, request, view):
        needy = Needy.objects.get(user=request.user)
        return needy.is_active

class IsVolunteerActive(permissions.BasePermission):
    
    def has_permission(self, request, view):
        volunteer =  Volunteer.objects.get(user=request.user)
        return volunteer.is_active

class IsNeedyInactive(permissions.BasePermission):

    def has_permission(self, request, view):
        needy = Needy.objects.get(user=request.user)
        return not needy.is_active

class IsVolunteerInactive(permissions.BasePermission):
    
    def has_permission(self, request, view):
        volunteer =  Volunteer.objects.get(user=request.user)
        return not volunteer.is_active

class IsNeedyOwner(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        needy = Needy.objects.get(user=request.user)
        return obj.needy == needy
