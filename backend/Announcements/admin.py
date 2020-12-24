from django.contrib import admin
from Announcements.models import Announcement, Product

admin.site.register([Announcement, Product])
