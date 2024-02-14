from django.urls import path
from . import views
urlpatterns=[
    path('',views.home,name='home'),
    path('contact/',views.contact,name='contact'),
    path('about/',views.about,name='about'),
    path('Manager/',views.Manager,name='Manager'),
    path('User/',views.User,name='User'),
    path('Admin/',views.Admin,name='Admin'),
    path('login/',views.login,name='login'),
    path('registration/',views.registration,name='registration'),
    path('Modules/',views.Modules,name='Modules'),
    path('user1/',views.user1,name='user1'),
    path('manager1/',views.manager1,name='manager1')

]