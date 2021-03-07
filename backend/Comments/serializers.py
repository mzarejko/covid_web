from rest_framework import serializers
from .models import Opinion 
from Accounts.models import User 
import os 

class UserInfoSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
     
    class Meta:
        model=User
        fields = ['username', 'image']

    def get_image(self, user):
        return user.image.url
         

class OpinionSerializer(serializers.ModelSerializer):
    source_info= serializers.SerializerMethodField(read_only=True)
    

    class Meta:
        model = Opinion 
        fields = ['pk', 'source','source_info', 'text', 'target']

    def get_source_info(self, instance):
        user = User.objects.get(pk=instance.source.pk)
        return UserInfoSerializer(user).data
    
