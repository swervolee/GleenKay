
from django.urls import path, include

from . import views

app_name = 'Client'

urlpatterns = [
        path('parent', views.parent, name='parent_dashboard'),
        path('landing_page/', views.landingPage, name='landing_page'),
        ]
