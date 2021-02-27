from .models import Opinion
from .serializers import OpinionSerializer  
from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from Members.permissions import IsNeedyOwner  
from Members.permissions import IsNeedyActive, IsVolunteerActive 
from Accounts.models import User
from django.http import Http404

class CreateOpinion(CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = OpinionSerializer
    
    def perform_create(self, serializer):
        source = self.request.user
        return serializer.save(source=source)


class ListOpinion(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = OpinionSerializer
    
    def get_queryset(self):
        target = User.objects.get(pk=self.kwargs["pk"])
        return Opinion.objects.filter(target=target)




