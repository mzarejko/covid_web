from django.db import models
from Members.models import Needy, Volunteer

class Opinion(models.Model):
    text = models.CharField(max_length=1000)
    target = models.ForeignKey(Volunteer, on_delete=models.PROTECT)
    user = models.ForeignKey(Needy, on_delete=models.SET_NULL, null=True, blank=True)
