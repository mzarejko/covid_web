from rest_framework import serializers
from .models import User 
from django.contrib.auth import get_user_model 


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'telephone', 'town', 'country']


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email',  'country', 'town', 'telephone', 'password']
        extra_kwargs = {
            'password': {'write_only' : True},
        }
    
    # extended function for create user
    def create(self, validated_data):
        user = get_user_model()
        
        user = user.objects.create_user(
            username = validated_data['username'],
            password = validated_data['password'],
            email = validated_data['email'],
            country = validated_data['country'],
            town = validated_data['town'],
            telephone = validated_data['telephone']
        )
        return user

