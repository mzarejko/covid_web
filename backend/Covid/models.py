from django.db import models
from django.contrib.postgres.fields import ArrayField

class Covid_file(models.Model):
    country = models.CharField(max_length=20, primary_key=True, default='Unknown')

    confirmed_x = ArrayField(models.CharField(max_length=20), null=True, blank=True)
    confirmed_y = ArrayField(models.IntegerField(), null=True, blank=True)
    confirmed_total = models.IntegerField(null=True, blank=True)

    deaths_x = ArrayField(models.CharField(max_length=20), null=True, blank=True)
    deaths_y = ArrayField(models.IntegerField(), null=True, blank=True)
    deaths_total = models.IntegerField(null=True, blank=True)


    def __str__(self):
        return self.country
        


