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
    """
    Handle booking creation for a child account.
    This view handles both GET and POST requests. On a GET request, it initializes
    an empty BookingForm. On a POST request, it binds the form with the provided data,
    validates it, and creates a booking if the form is valid.
    Args:
        request (HttpRequest): The HTTP request object.
        id (int): The ID of the ChildAccount for which the booking is being made.
    Returns:
        JsonResponse: A JSON response indicating the success or failure of the booking creation.
                      - On success (status 201): {'message': 'Booking created successfully'}
                      - On failure (status 400): {'errors': booking_form.errors}
    """
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


from django.contrib.auth.hashers import check_password
from django.http import JsonResponse
from django.contrib import messages

def deleteChildAccount(request, id):
    """
    Deletes a child account.
    """
    try:
        child = ChildAccount.objects.get(id=id)
        parent_password = child.parent.password

        if request.method == "POST":
            password = request.POST.get('confirmPassword').strip()

            if check_password(password, parent_password):
                child.delete()
                data = {'message': 'success'}
                messages.success(request, "The child account has been deleted successfully.")
                return JsonResponse(data)
            else:
                data = {'message': 'failure'}
                messages.error(request, "Incorrect password. The child account was not deleted.")
                return JsonResponse(data)
        else:
            return JsonResponse({'message': 'Invalid request method'})
    except ChildAccount.DoesNotExist:
        return JsonResponse({'message': 'Child account not found'}, status=404)



from django.shortcuts import render, get_object_or_404, redirect

def edit_child(request, child_id):
    child = ChildAccount.objects.get(id=child_id)
    
    if request.method == 'POST':
        form = ChildAccountForm(request.POST, request.FILES, instance=child)
        if form.is_valid():
            form.save()
            return redirect('Client:parent_dashboard', child_id=child.id)
    else:
        form = ChildAccountForm(instance=child)

    return render(request, 'edit_child.html', {'form': form, 'child': child})



