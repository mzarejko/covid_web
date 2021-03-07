from django.db import models
from Accounts.models import User

class Opinion(models.Model):
    text = models.CharField(max_length=1000)
    target = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    source = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='sources')
