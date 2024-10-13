from django import forms
from .models import ChildAccount

class ChildAccountForm(forms.ModelForm):
    class Meta:
        model = ChildAccount
        fields = ['first_name', 'last_name', 'age', 'gender', 'grade_level', 'learning_areas', 'profile_avatar', 'notes']

