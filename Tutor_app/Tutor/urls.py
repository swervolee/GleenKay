
from django.urls import path
from . import views

app_name = 'Tutor'

urlpatterns = [

        path('',views.index, name='tutor_dashboard'),

        ]
