from django.urls import path 
from . import views 

urlpatterns = [
    path('', views.ListAnnouncements.as_view(), name='list-announcement'),
    path('my/', views.ListMyAnnouncements.as_view(), name='my-announcement'),
    path('set/', views.SetAnnouncement.as_view(), name='set-announcement'),
    path('<int:pk>', views.UpdateAnnouncement.as_view(), name='update-announcement'),
    path('<int:pk>/products/', views.ListProducts.as_view(), name='list-product'),
    path('<int:pk>/products/set/', views.SetProduct.as_view(), name='set-product'),
    path('<int:pk>/products/<int:product_pk>', views.UpdateProduct.as_view(), name='update-product'),
    path('<int:pk>/products/<int:product_pk>/assign', views.AssignProduct.as_view(), name='assign-product'),
    path('<int:pk>/my-products/', views.ListMyAssignedProduct.as_view(), name='list-assigned-product'),
]
