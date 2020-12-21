from django.urls import path
from . import views 

urlpatterns = [
    path('data/', views.DataListAPI.as_view(), name='data'),
    path('data/<str:pk>', views.DataPosterAPI.as_view(), name='data-update')
]
