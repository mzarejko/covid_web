from django.urls import path
from . import views 

urlpatterns = [
    path('needy/', views.NeedyOpinion.as_view(), name='needy-opinion'),
    path('volunteer/', views.VolunteerOpinion.as_view(), name='volunteer-opinion'),
    path('needy/<int:pk>', views.UpdateDestroyOpinion.as_view(), name='detail-opinion'),
]
