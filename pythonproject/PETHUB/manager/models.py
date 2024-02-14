from django.db import models

# Create your models here.



class Addservices(models.Model): 
    Username = models.TextField(default=0)
    contact=models.IntegerField(default=0)
    services=models.TextField(default=0)
