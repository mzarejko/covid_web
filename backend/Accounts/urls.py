from django.urls import path
from . import views 
from rest_framework_simplejwt.views import TokenRefreshView
urlpatterns = [
    path('register/', views.RegisterAPI.as_view(), name='register'),
    path('email-verify', views.VerifyEmail.as_view(), name='verify'),
    path('login/', views.LoginAPI.as_view(), name='login'),
    path('refresh-token/', TokenRefreshView.as_view(), name='refresh-token'),
]

