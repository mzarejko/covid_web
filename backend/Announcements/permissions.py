from rest_framework import permissions

class IsProductNotAssigned(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        return obj.volunteer != None


