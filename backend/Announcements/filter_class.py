from django_filters import rest_framework as filters
from .models import Announcement, Product 

class AnnouncementFilter(filters.FilterSet):
    class Meta:
        model = Announcement 
        fields = ['address']

class ProductFilter(filters.FilterSet):
    class Meta:
        model = Product 
        fields = ['name']
