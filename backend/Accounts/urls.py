from django.urls import path
from . import views 

urlpatterns = [
    path('register/', views.RegisterAPI.as_view(), name='register'),
    path('email-verify', views.VerifyEmail.as_view(), name='verify'),
    path('login/', views.LoginAPI.as_view(), name='login'),
]

