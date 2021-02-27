from django.urls import path
from . import views 

urlpatterns = [
    path('set/', views.CreateOpinion.as_view(), name='set-opinion'),
    path('<int:pk>', views.ListOpinion.as_view(), name='list-opinion'),
]
