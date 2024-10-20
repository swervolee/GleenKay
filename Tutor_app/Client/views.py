# Standard library imports
from datetime import datetime

# Django imports
from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from django.shortcuts import get_object_or_404
from django.contrib.auth import login
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import Group
from django.contrib.auth.hashers import check_password
from django.contrib import messages
from django.utils import timezone
from django.urls import reverse_lazy
from django.views.generic import CreateView

# Local app imports (forms, models)
from .forms import ChildAccountForm, BookingForm
from .models import *




@login_required(login_url='Authentication:login_user')
def parent(request):
    """
    Renders the landing page for the parent with a dynamic greeting based on the time.
    """
    current_hour = datetime.now().hour + 3
    current_minute = datetime.now().minute


    if 5 <= current_hour < 12:
        greeting = "Good Morning"
        additional_greeting = "Hope you're having a productive morning!"
    elif 12 <= current_hour < 17:
        greeting = "Good Afternoon"
        additional_greeting = "Hope you're having a wonderful afternoon!"
    else:
        greeting = "Good Evening"
        additional_greeting = "Relax and unwind, it's evening time!"

    greeting_message = f"{greeting}, {request.user.first_name}"

    parent = request.user

    form = ChildAccountForm()
    booking_form = BookingForm

    if request.method == 'POST':
        form = ChildAccountForm(request.POST, request.FILES)
        if form.is_valid():
            child = form.save(commit=False)
            child.parent = request.user
            child.save()
            return redirect('Client:parent_dashboard')
    else:
        form = ChildAccountForm()

    children = ChildAccount.objects.filter(parent=request.user)

    context = {
        "form": form,
        "children": children,
        "parent": parent,
        "booking_form": booking_form,
        'greeting': greeting_message 
    }
    return render(request, 'parent_home.html', context)






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






def landingPage(request):
    """
    Renders the landing page.

    This view serves the landing page of the application. It does not require authentication
    and simply returns a rendered template for the landing page. This function could be used 
    to display a welcoming screen, information about the app, or call-to-actions before login 
    or registration.

    Args:
        request (HttpRequest): The HTTP request object that contains metadata about the request.

    Returns:
        HttpResponse: The rendered HTML page for the landing page.
    """
    return render(request, 'landing_page.html')







@login_required(login_url='Authentication:login_user')
def child(request, id):
    """
    Renders the child account page with dynamic greeting and booking information.

    The greeting is based on the adjusted time (current hour + 3) and tailored for 
    morning, afternoon, or evening. It also includes a form for lesson booking.

    Args:
        request: The HTTP request object.
        id: The ID of the child account.

    Returns:
        Renders the 'child_home.html' template with context including:
        - booking: The booking information for the child.
        - child: The ChildAccount object.
        - parent: The logged-in parent user.
        - greeting: The personalized greeting message.
    """
    adjusted_time = datetime.now().hour + 3
    current_minute = datetime.now().minute
    booking_form = BookingForm


    if 5 <= adjusted_time < 12:
        greeting = "Good Morning"
        additional_greeting = "Hope you're having a productive morning!"
    elif 12 <= adjusted_time < 17:
        greeting = "Good Afternoon"
        additional_greeting = "Hope you're having a wonderful afternoon!"
    else:
        greeting = "Good Evening"
        additional_greeting = "Relax and unwind, it's evening time!"

    greeting_message = f"{greeting}, {request.user.first_name}"

    parent = request.user   
    child = get_object_or_404(ChildAccount, id=id)
    booking = Booking.objects.filter(user=id)

    context = {
        "booking": booking,
        "child": child,
        "parent": parent,
        "greeting": greeting_message,
        "booking_form": booking_form,
    }

    return render(request, 'child_home.html', context)




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



