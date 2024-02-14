from django.urls import path
from . import views 
urlpatterns=[
    path(' ',views.user1,name='user1'),
    path('petlist/',views.petlist,name='petlist'),
    path('feedback/',views.feedback,name='feedback'),
    path('logout/',views.logout,name='logout'),
    path('notifications/',views.notifications,name='notifications'),
    path('profile/',views.profile,name='profile'),
    path('Questionarries/',views.Questionarries,name='Questionarries'),
    path('Addservices1/',views.Addservices1,name='Addservices1'),
    path('questionaries/',views.Showquestionaries,name='Showquestionaries'),



    
]