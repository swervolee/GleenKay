from django import forms
from .models import ChildAccount, Booking

class ChildAccountForm(forms.ModelForm):
    class Meta:
        model = ChildAccount
        fields = ['first_name', 'last_name', 'age', 'gender', 'grade_level', 'learning_areas', 'profile_avatar', 'notes']

class BookingForm(forms.ModelForm):
    class Meta:
        model = Booking
        fields = ['topic', 'other_topic', 'date', 'time']
