from rest_framework import serializers 
from .models import Needy, Volunteer 


class VolunteerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Volunteer
        fields = ['score']

    


