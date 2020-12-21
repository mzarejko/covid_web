from django.contrib import admin
from Members.models import Needy, Volunteer 

admin.site.register([Needy, Volunteer])
