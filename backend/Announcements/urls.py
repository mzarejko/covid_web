from django.urls import path 
from . import views 

urlpatterns = [
    path('', views.SetAnnouncement.as_view(), name='set-announcement'),
    path('<int:pk>', views.UpdateAnnouncement.as_view(), name='update-announcement'),
    path('products/', views.SetProduct.as_view(), name='set-product'),
    path('product/<int:pk>', views.UpdateProduct.as_view(), name='update-product'),

]
