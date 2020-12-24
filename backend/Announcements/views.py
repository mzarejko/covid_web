from .models import Announcement, Product
from .serializers import AnnouncementSerializer 
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, CreateAPIView
from rest_framework.permissions import IsAuthenticated 
from Accounts.permissions import IsUserOwner 
from Members.permissions import IsNeedyActive 
from .permissions import IsProductNotAssigned
from Members.models import Needy 

class SetAnnouncement(ListCreateAPIView):
    permisson_classes = [IsAuthenticated, IsNeedyActive]
    serializer_class = AnnouncementSerializer 

    def perform_create(self, serializer):
        needy = Needy.objects.get(user=self.request.user)
        return serializer.save(needy=needy)
    
    def get_queryset(self):
        needy = Needy.objects.get(user=self.request.user)
        return Announcement.objects.filter(needy=needy)


class UpdateAnnouncement(RetrieveUpdateDestroyAPIView):
    permisson_classes = [IsAuthenticated, IsNeedyActive]
    serializer_class = AnnouncementSerializer 

    def get_queryset(self):
        needy = Needy.objects.get(user=self.request.user)
        return Announcement.objects.filter(needy=needy)


class SetProduct(CreateAPIView):
    permisson_classes = [IsAuthenticated, IsNeedyActive]
    serializer_class = AnnouncementSerializer 

    def perform_create(self, serializer):
        needy = Needy.objects.get(user=self.request.user)
        return serializer.save(needy=needy)
    
# product can by changed or deleted if only Vollouneee is not assigned to product
class UpdateProduct(RetrieveUpdateDestroyAPIView):
    permisson_classes = [IsAuthenticated, IsNeedyActive, IsProductNotAssigned]
    serializer_class = AnnouncementSerializer 

    def get_queryset(self):
        needy = Needy.objects.get(user=self.request.user)
        return Announcement.objects.filter(needy=needy)
