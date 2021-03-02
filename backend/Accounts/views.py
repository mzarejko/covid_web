from .models import User  
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserSerializer, RegisterSerializer, LoginSerializer
from django.http import Http404 
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import status 
from rest_framework_simplejwt.tokens import RefreshToken, TokenError
from .tasks import send_emali 
from django.contrib.sites.shortcuts import get_current_site 
from django.urls import reverse 
import jwt
from django.conf import settings
from Members.models import Volunteer, Needy
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.generics import ListAPIView
from .filter_class import UserFilter

class GetUsers(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class =  UserSerializer
    filterset_class = UserFilter 

    def get_queryset(self):
        users = User.objects.all()
        return users

class GetAdmin(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserSerializer

    def get_queryset(self):
        user = User.objects.filter(pk=1)
        return user

class LoginAPI(APIView):
    permission_classes = [AllowAny]
    
    def fix_dic(self, data):
        fixed = {}
        for key in data:
            if data[key] == '':
                fixed[key] = None
            else:
                fixed[key] = data[key]
        return fixed

    def post(self, request):
        data = self.fix_dic(request.data)
        serializer = LoginSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            return Response(serializer.data, status=status.HTTP_200_OK)


class RegisterAPI(APIView):
    permission_classes = [AllowAny]
    
    # change empty string to None
    def fix_dic(self, data):
        fixed = {}
        for key in data:
            if data[key] == '':
                fixed[key] = None
            else:
                fixed[key] = data[key]
        return fixed

    def post(self, request):
        data = self.fix_dic(request.data)
        serializer = RegisterSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            # obtain token 
            user = User.objects.get(username=serializer.data['username'])
            token = RefreshToken.for_user(user).access_token

            # obtain site for user
            current_site = get_current_site(request).domain
            relativeLink=reverse('verify')
            absurl='http://'+current_site+relativeLink+"?token="+str(token)

            # info for user
            email_body = f'Hi {user.username} click this link to activate account:  \n {absurl}'
            mail = {'email_body': email_body,  'to_email': user.email, 'email_subject': 'Verify your email'}
            
            # send email to verify account
            send_emali.delay(mail)
            return Response({"message":"Check your mail for activation mail"}, status=status.HTTP_201_CREATED)

class VerifyEmail(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        token = request.GET.get('token')

        try:
            # authentication
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms='HS256')
            user = User.objects.get(id=payload['user_id'])
            needy = Needy(user=user)
            volunteer = Volunteer(user=user)
            if not user.is_verified:
                user.is_verified=True
                user.save()

                # register inactive Needy and Volunteer to user
                needy.save()
                volunteer.save()

            return Response({'email': 'Successfully activated'}, status=status.HTTP_200_OK)
        except jwt.ExpiredSignatureError as error:
            return Response({'error': 'token expired'}, status=status.HTTP_400_BAD_REQUEST)
        except jwt.exceptions.DecodeError as error:
            return Response({'error': 'invalid token'}, status=status.HTTP_400_BAD_REQUEST)

class LogoutAPI(APIView):

    def post(self, request):
        print(request.data)
        try:
            refreshToken = request.data["refresh"]
            RefreshToken(refreshToken).blacklist()
        except TokenError:
            return Response({'error': 'Token is invalid or expired'})
        return Response({'Successful logout'}, status=status.HTTP_204_NO_CONTENT)

