from django.db import models

# Create your models here.
class Questionarie(models.Model): 
    name = models.TextField(default=0)
    pettype=models.TextField(default=0)
    Questions=models.TextField(default=0)
    petname=models.TextField(default=0)