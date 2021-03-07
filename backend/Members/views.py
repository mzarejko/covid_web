from .models import Volunteer, Needy
from .serializers import VolunteerSerializer
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated 
from .permissions import IsNeedyInactive, IsVolunteerInactive, IsVolunteerActive
from rest_framework.response import Response
from rest_framework import status

class ActivateVolunteer(APIView):
    permission_classes=[IsAuthenticated]
    
    def put(self, request):
        needy = Needy.objects.get(user=request.user)
        volunteer = Volunteer.objects.get(user=request.user)
        needy.is_active = False
        volunteer.is_active = True
        volunteer.save()
        needy.save()
        return Response({'volunteer': 'Successfully activated'}, status=status.HTTP_200_OK)

class DeactivateVolunteer(APIView):
    permission_classes=[IsAuthenticated, IsNeedyInactive]
    
    def put(self, request):
        volunteer = Volunteer.objects.get(user=request.user)
        if volunteer.is_active:
            volunteer.is_active = False
            volunteer.save()
            return Response({'volunteer': 'Successfully deactivate'}, status=status.HTTP_200_OK)

class UpdateScore(APIView):
    permission_classes = [IsAuthenticated, IsVolunteerActive, IsNeedyInactive]

    def put(self, request):
        volunteer = Volunteer.objects.get(user=request.user)
        serializer = VolunteerSerializer(volunteer, data= request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)


class ActivateNeedy(APIView):
    permission_classes=[IsAuthenticated]

    def put(self, request):
        needy = Needy.objects.get(user=request.user)
        volunteer = Volunteer.objects.get(user=request.user)
        volunteer.is_active = False
        needy.is_active = True
        needy.save()
        volunteer.save()
        return Response({'needy': 'Successfully activated'}, status=status.HTTP_200_OK)
    
class DeactivateNeedy(APIView):
    permission_classes=[IsAuthenticated, IsVolunteerInactive]
    
    def put(self, request):
        needy = Needy.objects.get(user=request.user)
        if needy.is_active:
            needy.is_active = False
            needy.save()
            return Response({'needy': 'Successfully deactivate'}, status=status.HTTP_200_OK)

        


        



        



