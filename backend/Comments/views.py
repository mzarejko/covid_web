from .models import Opinion
from .serializers import OpinionSerializer 
from rest_framework.generics import ListAPIView, ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from Members.permissions import IsNeedyOwner  
from Members.permissions import IsNeedyActive, IsVolunteerActive 
from Members.models import Volunteer, Needy
from django.http import Http404

class NeedyOpinion(ListCreateAPIView):
    permission_classes = [IsAuthenticated, IsNeedyActive]
    serializer_class = OpinionSerializer
    
    def perform_create(self, serializer):
        needy = Needy.objects.get(user=self.request.user)
        return serializer.save(needy=needy)

    def get_queryset(self):
        needy = Needy.objects.get(user=self.request.user)
        return Opinion.objects.filter(needy = needy)

class VolunteerOpinion(ListAPIView):
    permission_classes = [IsAuthenticated, IsVolunteerActive]
    serializer_class = OpinionSerializer
    
    def get_queryset(self):
        volunteer = Volunteer.objects.get(user=self.request.user)
        return Opinion.objects.filter(target=volunteer)


class UpdateDestroyOpinion(RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated, IsNeedyOwner, IsNeedyActive]
    serializer_class = OpinionSerializer
    lookup_field="pk"

    def get_queryset(self):
        needy = Needy.objects.get(user=self.request.user)
        return Opinion.objects.filter(needy=needy)



