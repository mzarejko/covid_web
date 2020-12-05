from django.urls import path
from . import views 
from rest_framework_simplejwt import views as jwt_views

urlpatterns = [
    path('users/', views.UserListAPI.as_view(), name='users'),
    path('users/<str:pk>', views.UserDetailAPI.as_view(), name="user-details"),
    path('register/', views.RegisterAPI.as_view(), name='register'),
    path('login/', jwt_views.TokenObtainPairView.as_view(), name='obtain_token'),
    path('login/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
]
