from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required

from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import login
from django.contrib.auth.models import Group
from django.contrib import messages

from django.views.generic import CreateView
from django.urls import reverse_lazy


# Create your views here.

def index(request):
    return HttpResponse("welcome tutor to tutor app")


@login_required(login_url='Authentication:login_user')
def tutor(request):
    """
    Renders the landng page
    """
    return render(request, 'tutor_home.html')


def landingPage(request):
    return render(request, 'landing_page.html')
