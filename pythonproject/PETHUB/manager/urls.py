from django.urls import path
from . import views
urlpatterns=[
     path('',views.manager1,name='manager1'),
    path('customerlist/',views.customerlist,name='customerlist'),
    path('feedback/',views.feedback,name='feedback'),
    path('logout/',views.logout,name='logout'),
    path('notifications/',views.notifications,name='notifications'),
    path('profile/',views.profile,name='profile'),
    path('Addservices/',views.Addservices,name='Addservices'),
]
