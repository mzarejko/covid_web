from rest_framework import serializers
from .models import Announcement, Product 

class AnnouncementSerializer(serializers.ModelSerializer):
    class Meta:
        model=Announcement 
        fields = ['description', 'address']
        
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model= Product
        fields = ['name', 'description', 'priority']
        
