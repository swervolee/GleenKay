from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from django.contrib.auth.decorators import login_required

from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import login
from django.contrib.auth.models import Group
from django.contrib import messages

from django.views.generic import CreateView
from django.urls import reverse_lazy

from .forms import ChildAccountForm, BookingForm
from .models import *

from django.utils import timezone

# Create your views here.
@login_required(login_url='Authentication:login_user')
def parent(request):
    """
    Renders the landng page
    """
    parent = request.user
    # render form 
    form = ChildAccountForm()
    booking_form = BookingForm
    # create child logic
    if request.method == 'POST':
        form = ChildAccountForm(request.POST, request.FILES)
        if form.is_valid():
            child = form.save(commit=False)
            child.parent = request.user
            child.save()
            return redirect('Client:parent_dashboard')
        
    else:
        form = ChildAccountForm()

    # list all children children
    children = ChildAccount.objects.filter(parent=request.user)  # Get all children associated with the logged-in user

    context = { "form":form, "children":children, "parent":parent, "booking_form":booking_form }
    return render(request, 'parent_home.html', context)

# this is the booking lesson function
def booking(request, id):
    booking_form = BookingForm()

    if request.method == 'POST':
        booking_form = BookingForm(request.POST)  # Bind data to the form
        child = ChildAccount.objects.get(id=id)

        if booking_form.is_valid():
            # save the other topic to the topic for easy rendering to the template
            other_topic = booking_form.cleaned_data.get('other_topic', None)  # Get 'other_topic' field
            # print("Other topic:", other_topic)

            booking = booking_form.save(commit=False)
            child = ChildAccount.objects.get(id=id)

            booking.user = child  # Assign the ChildAccount instance to the user field
            booking.tutor = "Pending"  # Example tutor name
            booking.duration = timezone.timedelta(hours=1)  # Example duration of 1 hour
            if other_topic:
                booking.topic = other_topic
            
            booking.save()  # Save the booking instance
            booking.save()
            return JsonResponse({'message': 'Booking created successfully'}, status=201)  # Return a JSON response

        return JsonResponse({'errors': booking_form.errors}, status=400)  # Return errors if form is invalid




# @login_required
def landingPage(request):
    return render(request, 'landing_page.html')

@login_required(login_url='Authentication:login_user')
def child(request, id):
    parent = request.user   
    child = ChildAccount.objects.get(id=id)
    booking = Booking.objects.filter(user=id)
    
    return render(request, 'child_home.html', {"booking":booking, "child":child, "parent":parent})



def deleteChildAccount(request, id):
    child = ChildAccount.objects.get(id=id)
    parent_password = child.parent.password
    if request.method == "POST":
        password = request.POST.get('confirmPassword')
        if password == parent_password:
            child.delete()
            messages.success(request, "The user is deleted")
            return redirect('Client:parent_dashboard')
        else:
            return redirect('Client:parent_dashboard')

    
    
