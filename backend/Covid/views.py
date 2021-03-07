from .models import Covid_file
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from .serializers import DataSerializer 
from rest_framework.permissions import IsAuthenticated 

class DataListAPI(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = DataSerializer 
    queryset = Covid_file.objects.all()


