from .models import Covid_file
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import DataSerializer 
from django.http import Http404 
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, IsAdminUser 

class DataListAPI(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, requset, format='json'):
        data = Covid_file.objects.all()
        serializer = DataSerializer(data, many=True)
        return Response(serializer.data)
    

class DataPosterAPI(APIView):
    permission_classes = [IsAdminUser]

    def get_object(self, pk):
        try:
            return Covid_file.objects.get(pk=pk)
        except Covid_file.DoesNotExist:
            raise Http404 


    def post(self, requset, format='json'):
        serializer = DataSerializer(data = requset.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

    def delete(self, requset, pk, format='json'):
        data = self.get_object(pk)
        data.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

