from django import forms
from django.contrib.auth.forms import UserCreationForm
from .models import CustomUser

class TutorSignUpForm(UserCreationForm):
    class Meta(UserCreationForm.Meta):
        model = CustomUser
        fields = ('username','email', 'gender', 'nationality', 'password1', 'password2')

    def save(self, commit=True):
        user = super().save(commit=False)
        user.user_type = 'tutor'
        if commit:
            user.save()
        return user

class ParentSignUpForm(UserCreationForm):
    class Meta(UserCreationForm.Meta):
        model = CustomUser
        fields = ('username','email', 'nationality', 'password1', 'password2')

    def save(self, commit=True):
        user = super().save(commit=False)
        user.user_type = 'parent'
        if commit:
            user.save()
        return user
