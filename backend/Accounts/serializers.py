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
        fields = ['username', 'email',  'country', 'town', 'telephone', 'password', 'birth', 'firstname', 'lastname', 'description']
        extra_kwargs = {
            'password': {'write_only' : True}
        }
    
    # extended function for create user
    def create(self, validated_data):
        # check if user exist and if exist but is not verfied then delete
        unverfied_user = User.objects.first(username = validated_data['username'])
        unverfied_email = User.objects.first(email = validated_data['email'])
        if unverfied_user and not unverfied_user.is_verified:
            unverfied_user.delete()
        if unverfied_email and not unverfied_email.is_verified:
            unverfied_email.delete()

        password = validated_data['password']

        user = User(
            username = validated_data['username'],
            email = validated_data['email'],
            country = validated_data['country'],
            town = validated_data['town'],
            telephone = validated_data['telephone'],
            birth = validated_data['birth'],
            firstname= validated_data['firstname'],
            lastname= validated_data['lastname'],
            description= validated_data['description']
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


