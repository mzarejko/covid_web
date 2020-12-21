from django.db import models
from Accounts.models import User

class Needy(models.Model):
    user = models.OneToOneField(User, on_delete=models.PROTECT, primary_key=True)
    is_active = models.BooleanField(default=False)


class Volunteer(models.Model):
    user = models.OneToOneField(User, on_delete=models.PROTECT, primary_key=True)
    score = models.IntegerField(default=0)
    is_active = models.BooleanField(default=False)

