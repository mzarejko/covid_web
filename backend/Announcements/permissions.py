from rest_framework import permissions

class IsProductNotAssigned(permissions.BasePermission):
    message = "Product already assigned"

    def has_object_permission(self, request, view, obj):
        return obj.volunteer != None


