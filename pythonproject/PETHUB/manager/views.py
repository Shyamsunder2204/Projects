
from django.shortcuts import render,redirect
from django.http import HttpResponse
from . models import Addservices


# Create your views here.
from django.http import HttpResponse

# Create your views here.
def customerlist(request):
    return render(request,'manager/customerlist.html')
def feedback(request):
    return render(request,'manager/feedback.html')
def manager1(request):
    return render(request,'manager/manager1.html')
def logout(request):
    return render(request,'manager/logout.html')
def notifications(request):
    return render(request,'manager/notifications.html')
def profile(request):
    return render(request,'manager/profile.html')
# def questionaries(request):
    # return render(request,'manager/questionaries.html')
def Addservices(request):
    return render(request,'manager/Addservices.html')
