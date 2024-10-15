from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required

from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import login
from django.contrib.auth.models import Group
from django.contrib import messages

from django.views.generic import CreateView
from django.urls import reverse_lazy

# models
from Client.models import Booking

# Create your views here.

def index(request):
    return HttpResponse("welcome tutor to tutor app")


@login_required(login_url='Authentication:login_user')
def tutor(request):
    """
    Renders the landng page
    """
    tutor = request.user
    booking = Booking.objects.all()
    tutor_jobs = Booking.objects.filter(tutor=tutor)

    return render(request, 'tutor_home.html', {"booking":booking, "tutor_jobs":tutor_jobs})

def addMeetLink(request, id):

    tutor = request.user

    booking = Booking.objects.get(id=id)

    if request.method == 'POST':
        meetLink = request.POST.get('google_meet_link')
        print(meetLink)
        booking.meetLink = meetLink
        booking.isApproved = True
        booking.tutor = tutor
        booking.save()      

        return redirect('Tutor:tutor_dashboard')
    else:
        return HttpResponse('An error occurred')

def landingPage(request):
    return render(request, 'landing_page.html')



