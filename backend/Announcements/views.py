from .models import Announcement, Product
from .serializers import AnnouncementSerializer, ProductSerializer 
from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveUpdateDestroyAPIView, CreateAPIView
from rest_framework.views import APIView 
from rest_framework.permissions import IsAuthenticated 
from Members.permissions import IsNeedyActive, IsVolunteerActive, IsNeedyOwner 
from .permissions import IsProductNotAssigned
from Members.models import Needy, Volunteer
from django.http import Http404
from rest_framework.response import Response
from rest_framework import status 
from .filter_class import AnnouncementFilter, ProductFilter 

# announcements for public
class ListAnnouncements(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = AnnouncementSerializer 
    filterset_class = AnnouncementFilter 

    def get_queryset(self):
        announcements = Announcement.objects.all()
        # list only announcements where are not assigned products
        for announcement in announcements:
            notAssingedProduct = Product.objects.filter(announcement=announcement).filter(volunteer=None).first()
            if notAssingedProduct == None:
                announcements.exclude(pk=announcement.pk)
        return announcements

# check your announcements if you are needy
class ListMyAnnouncements(ListAPIView):
    permission_classes = [IsAuthenticated, IsNeedyActive]
    serializer_class = AnnouncementSerializer 
    filterset_class = AnnouncementFilter 

    def get_queryset(self):
        needy = Needy.objects.get(user=self.request.user)
        announcements = Announcement.objects.filter(needy=needy)

        return announcements

class SetAnnouncement(CreateAPIView):
    permission_classes = [IsAuthenticated, IsNeedyActive]
    serializer_class = AnnouncementSerializer 

    def perform_create(self, serializer):
        needy = Needy.objects.get(user=self.request.user)
        return serializer.save(needy=needy)

class UpdateAnnouncement(RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated, IsNeedyActive, IsNeedyOwner]
    serializer_class = AnnouncementSerializer 
    lookup_field="pk"
    queryset = Announcement.objects.all()
   
class ListProducts(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ProductSerializer 
    filterset_class = ProductFilter 

    def get_queryset(self):
        products = Product.objects.filter(announcement = self.kwargs["pk"])
        return products

class SetProduct(CreateAPIView):
    permission_classes = [IsAuthenticated, IsNeedyActive]
    serializer_class = ProductSerializer 

    def perform_create(self, serializer):
        announcement = Announcement.objects.get(pk = self.kwargs["pk"])
        return serializer.save(announcement = announcement)

class UpdateProduct(APIView):
    permission_classes = [IsAuthenticated, IsNeedyActive, IsNeedyOwner, IsProductNotAssigned]
   
    def get_object(self, pk, product_pk):
        try:
            product = Product.objects.get(product_pk=product_pk)
        except Product.DoesNotExist:
            raise Http404 
        return product 

    def put(self, request, product_pk):
        product = self.get_object(product_pk)
        serializer = ProductSerializer(product, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

    def delete(self, request, pk, product_pk):
        product = self.get_object(product_pk)
        product.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# assign product to volunteer
class AssignProduct(APIView):
    permission_classes = [IsAuthenticated, IsVolunteerActive, IsProductNotAssigned]

    def put(self, request, pk, product_pk):
        product = Product.objects.get(product_id=product_pk)
        volunteer = Volunteer.objects.get(user=request.user) 
        product.volunteer = volunteer
        product.save()
        return Response({'product' : 'Successfully assigned to product'}, status = status.HTTP_200_OK)

    
class ListMyAssignedProduct(ListAPIView):
    permission_classes = [IsAuthenticated, IsVolunteerActive]
    serializer_class = ProductSerializer 

    def get_queryset(self):
        volunteer = Volunteer.objects.get(user=self.request.user)
        products = Product.objects.filter(volunteer=volunteer)
        return products 

    


