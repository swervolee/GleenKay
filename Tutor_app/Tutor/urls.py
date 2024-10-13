
from django.urls import path
from . import views

app_name = 'Tutor'

urlpatterns = [

        path('tutor',views.tutor, name='tutor_dashboard'),

        ]
