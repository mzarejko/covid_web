from .models import User  
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserSerializer, RegisterSerializer, LoginSerializer
from django.http import Http404 
from rest_framework import status 
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken, TokenError
from .tasks import send_emali 
from django.contrib.sites.shortcuts import get_current_site 
from django.urls import reverse 
import jwt
from django.conf import settings
from Members.models import Volunteer, Needy

class LoginAPI(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            return Response(serializer.data, status=status.HTTP_200_OK)


class RegisterAPI(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
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

            return Response(serializer.data, status=status.HTTP_201_CREATED)

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
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            refreshToken = request.data["refresh"]
            RefreshToken(refreshToken).blacklist()
        except TokenError:
            return Response({'error': 'Token is invalid or expired'})
        return Response({'Successful logout'}, status=status.HTTP_204_NO_CONTENT)
