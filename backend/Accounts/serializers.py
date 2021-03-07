from rest_framework import serializers
from .models import User 
from django.contrib.auth import get_user_model 
from django.contrib import auth
from rest_framework import status 
from rest_framework.exceptions import ValidationError

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['pk', 'username', 'image', 'telephone', 'country', 'town', 'email']


class RegisterSerializer(serializers.ModelSerializer):
    username = serializers.CharField(required=True, allow_null=False)
    email = serializers.EmailField(required=True, allow_null=False)
    password = serializers.CharField(required=True, write_only=True,
                                     style = {'input_type': 'password'})
    birth = serializers.DateField(required=False, allow_null=True)
    firstname = serializers.CharField(required=False, allow_null=True)
    lastname = serializers.CharField(required=False, allow_null=True)
    description = serializers.CharField(required=False, allow_null=True)

    class Meta:
        model = User
        fields = ['username', 'image', 'email',  'country', 'town', 'telephone', 'password', 'birth', 'firstname', 'lastname', 'description']
        extra_kwargs = {
            'password': {'write_only' : True}
        }
    

    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise ValidationError({"error": "Username already exist"}, 
                                              code=status.HTTP_409_CONFLICT)
        
        return value 

    def validate_email(self, value):
        if User.objects.filter(email=value, is_verified=True).exists():
            raise ValidationError({"error": "Email already exist"}, 
                                              code=status.HTTP_409_CONFLICT)
        return value
        

    # extended function for create user
    def create(self, data):
        password = data['password'] 
        

        user = User(
            username=data['username'],
            email=data['email'],
            country= data['country'],
            town=data['town'],
            telephone=data['telephone'],
            birth = data['birth'],
            firstname = data['firstname'],
            lastname = data['lastname'],
            description = data['description'],
        )
        if data.get('image'):
            user.image = data['image']
        user.set_password(password)
        user.save()
        return user


class LoginSerializer(serializers.ModelSerializer):
    username=serializers.CharField(max_length=45, required=True)
    password = serializers.CharField(max_length=45, write_only=True, required=True)
    access = serializers.CharField(max_length=45, read_only=True)
    refresh = serializers.CharField(max_length=45, read_only=True)

    class Meta:
        model=User
        fields=['username', 'password', 'access', 'refresh']



    def validate(self, data):
        username=data.get('username')
        password=data.get('password')

        user = auth.authenticate(username=username, password=password)

        if user is None:
            raise ValidationError({"error": 'wrong password or username'},
                                                code=status.HTTP_400_BAD_REQUEST)
        
        if not user.is_active:
            raise ValidationError({"error": 'Account not active'},
                                              code = status.HTTP_406_NOT_ACCEPTABLE)
        if not user.is_verified:
            raise ValidationError({"error": 'Account not verfied, first active your profile'},
                                              code = status.HTTP_400_BAD_REQUEST)
        tokens = user.tokens()
        return {"username": user,
                "access": tokens['access'],
                "refresh": tokens['refresh']} 
                        



