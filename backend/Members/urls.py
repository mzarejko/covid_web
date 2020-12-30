from django.urls import path
from . import views 

urlpatterns = [
    path('activate-needy/', views.ActivateNeedy.as_view(), name='needy-act'),
    path('deactivate-needy/', views.DeactivateNeedy.as_view(), name='needy-dec'),
    path('activate-vol/', views.ActivateVolunteer.as_view(), name='volunteer-act'),
    path('deactivate-vol/', views.DeactivateVolunteer.as_view(), name='volunteer-dec'),
    path('vol-update/', views.UpdateScore.as_view(), name='score-update'),
]


