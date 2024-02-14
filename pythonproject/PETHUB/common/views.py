from django.shortcuts import render,redirect
from django.http import HttpResponse
from django. contrib. auth.models import User,auth
from django. contrib import messages
from django.contrib.auth import authenticate, login
# Create your views here.
 
#from django.shortcuts import render
#from django.http import HttpResponse
# Create your views here.
def home(request):
    return render(request,'home.html')
def contact(request):
    return render(request,'contact.html')
def about(request):
    return render(request,'about.html')
def Modules(request):
    return render(request,'Modules.html')
def user(request):
    return render(request,'User.html')
def Manager(request):
    return render(request,'Manager.html')
def Admin(request):
    return render(request,'Admin.html')
def user1(request):
    return render(request,'user1.html')
def manager1(request):
    return render(request,'manager1.html')



def registration(request):
    if request.method == 'POST':
        username=request.POST['yourusername']
        firstname=request.POST['yourfirstname']
        lastname=request.POST['yourlastname']
        #mobileno=request.POST['yourmobileno']
        #address=request.POST['youraddress']
        email=request.POST['email']
        password=request.POST['yourpassword']
        confirmpassword=request.POST['yourconfirmpassword']
        #category=request.POST['yourcategory']
        if password==confirmpassword:
            if User.objects.filter(username=username).exists():
                 return redirect('/')
            else:
                 user=User.objects.create_user(username=username,first_name=firstname,last_name=lastname,email=email,password=password)
                 user.save()
                 messages.info(request,'user created')
                 return render(request,'registration.html',{'result':"inside else"})
        else:
                 #messages.info(request,'re enter password')
                 return render(request,'registration.html',{'result':"inside else"})

    else:
       # redirect('/')
        return render(request,'registration.html',{'result':"inside else"})
                 #message = username+firstname+lastname+email+password+confirmpassword

        #return render(request,'Registration.html',{'result':message})  
    #else:
       # return render(request,'Registration.html',{'result':"inside else"})
def login(request):
    if request.method == 'POST':
        email = request.POST.get('loginEmail')
        password = request.POST.get('loginPassword')
        user = authenticate(request, username=email, password=password)

        if user is not None:
            if user.is_staff:
                # Redirect staff members to 'About.html'
                return redirect('manager1')
            else:
                # Redirect non-staff users to 'About.html'
                return redirect('user1')
        else:
            # Handle authentication failure, e.g., show an error message
            return render(request, 'login.html', {'result':"invalid email or password"})

    return render(request, 'login.html')