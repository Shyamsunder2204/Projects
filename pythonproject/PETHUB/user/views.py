from django.shortcuts import render
#from django.shortcuts import reverse
# Create your views here.
from django.http import HttpResponse
from manager. models import Addservices
from . models import Questionarie

# Create your views here.
def user1(request):
    return render(request,'user1/user1.html')
def petlist(request):
    return render(request,'user1/petlist.html')
def feedback(request):
    return render(request,'user1/feedback.html')
def logout(request):
    return render(request,'user1/logout.html')
def notifications(request):
    return render(request,'user1/notifications.html')
def profile(request):
    return render(request,'user1/profile.html')
def Addservices1(request):
    varone = Addservices.objects.all()

    return render(request,'user1/Addservices1.html',{'vartwo':varone})

def Questionarries(request):
    if request.method == 'POST':
        name= request.POST.get('name')
        pettype = request.POST.get('typepet')
        petname = request.POST.get('pet_name')
        comments = request.POST.get('comments')
        # Create a new feedback instance and save it to the database
        question = Questionarie.objects.create(name=name, pettype=pettype, Questions=comments, petname=petname)
        return render(request,'user1/Questionarries.html',{'result': "Feedback Submitted Successfully"})

  # Redirect to a success page or another appropriate URL
    else:
        return render(request, 'user1/Questionarries.html')
def Showquestionaries(request):
    varone = Questionarie.objects.all()

    return render(request,'manager/questionaries.html',{'vartwo':varone})

