from rest_framework import serializers
from .models import User 
from django.contrib.auth import get_user_model 
from django.contrib import auth

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'telephone', 'town', 'country']


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email',  'country', 'town', 'telephone', 'password']
        extra_kwargs = {
            'password': {'write_only' : True}
        }
    
    # extended function for create user
    def create(self, validated_data):
        
        password = validated_data['password']

        user = User(
            username = validated_data['username'],
            email = validated_data['email'],
            country = validated_data['country'],
            town = validated_data['town'],
            telephone = validated_data['telephone']
        )
        user.set_password(password)
        user.save()
        return user

class LoginSerializer(serializers.ModelSerializer):
    username=serializers.CharField(max_length=45)
    password = serializers.CharField(max_length=45, write_only=True)
    tokens = serializers.CharField(max_length=45, read_only=True)

    class Meta:
        model=User
        fields=['username', 'password', 'tokens']


    def validate(self, data):
        super().validate(data)
        username=data.get('username')
        password=data.get('password')

        user = auth.authenticate(username=username, password=password)
        
        if not user:
            raise Exception('wrong password or username')
        if not user.is_active:
            raise Exception('Account not active')
        if not user.is_verified:
            raise Exception('Account not verfied, first active your profile')
        
        return {'username': user.username, 'tokens': user.tokens}


