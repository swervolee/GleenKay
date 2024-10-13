from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required

from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import login
from django.contrib.auth.models import Group
from django.contrib import messages

from django.views.generic import CreateView
from django.urls import reverse_lazy

from .forms import ChildAccountForm
from .models import *

# Create your views here.
@login_required(login_url='Authentication:login_user')
def parent(request):
    """
    Renders the landng page
    """
    parent = request.user
    # render form 
    form = ChildAccountForm()
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

    context = { "form":form, "children":children, "parent":parent }
    return render(request, 'parent_home.html', context)

@login_required(login_url='Authentication:login_user')
def tutor(request):
    """
    Renders the landng page
    """
    return HttpResponse("Welcome tutor")

# @login_required
def landingPage(request):
    return render(request, 'landing_page.html')

@login_required(login_url='Authentication:login_user')
def child(request):
    return render(request, 'child_home.html')
