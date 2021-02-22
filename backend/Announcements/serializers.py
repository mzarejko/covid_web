from rest_framework import serializers
from .models import Announcement, Product 
from Accounts.models import User

class AnnouncementSerializer(serializers.ModelSerializer):
    class Meta:
        model=Announcement 
        fields = ['pk', 'description', 'address']
        
class ProductSerializer(serializers.ModelSerializer):
    date=serializers.DateField(read_only=True, format="%d-%m-%Y")
    username=serializers.CharField(read_only=True, max_length=45)

    class Meta:
        model= Product
        fields = ['pk', 'name', 'description', 'priority', 'date', 'username']
        
    

