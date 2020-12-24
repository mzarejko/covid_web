from django.db import models
from Members.models import Needy, Volunteer 
from django.utils import timezone

class Announcement(models.Model):
    description = models.CharField(max_length=1000, null=True, blank=True)
    address = models.CharField(max_length=30)
    needy = models.ForeignKey(Needy, on_delete=models.CASCADE)
   
class Product(models.Model):
    name = models.CharField(max_length=45)
    description = models.CharField(max_length=100, null=True, blank=True)
    priority = models.IntegerField(default=0)
    date = models.DateTimeField()
    Announcement = models.ForeignKey(Announcement, on_delete=models.CASCADE)
    volunteer = models.ForeignKey(Volunteer, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return self.name
    
    # set datetime with create product
    def save(self, *args, **kwargs):
        if not self.id:
            self.date = timezone.now()
        return super(Product, self).save(*args, **kwargs)
