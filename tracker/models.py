from django.db import models
from django.contrib.auth.models import User


class Tracker(models.Model):
    firstname = models.CharField(max_length=255)
    lastname = models.CharField(max_length=255)

# Create your models here.
