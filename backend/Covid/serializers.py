from rest_framework import serializers
from .models import Covid_file 

class DataSerializer(serializers.ModelSerializer):
    class Meta:
        model = Covid_file
        fields = ['country', 'confirmed_x', 'confirmed_y', 'confirmed_total', 'deaths_x', 'deaths_y', 'deaths_total']


