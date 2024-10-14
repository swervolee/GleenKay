from django.db import models
from django.contrib.auth.models import User  # Import Django's built-in User model
from django.conf import settings  # Import the settings module to refer to AUTH_USER_MODEL


class ChildAccount(models.Model):
    GENDER_CHOICES = [
        ('M', 'Male'),
        ('F', 'Female'),
        ('O', 'Other'),
    ]
    
    GRADE_LEVELS = [
        ('1', 'Grade 1'),
        ('2', 'Grade 2'),
        ('3', 'Grade 3'),
        ('4', 'Grade 4'),
        ('5', 'Grade 5'),
        ('6', 'Grade 6'),
        ('7', 'Grade 7'),
        ('8', 'Grade 8'),
        ('9', 'Grade 9'),
        ('10', 'Grade 10'),
        # Add other grade levels here
    ]
    
    LEARNING_AREAS = [
        ('math', 'Mathematics'),
        # ('science', 'Science'),
        # ('english', 'English'),
        # Add other learning areas here
    ]
    
    parent = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='children')  # Use AUTH_USER_MODEL here
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    age = models.PositiveIntegerField(blank=True, null=True)
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES)
    grade_level = models.CharField(max_length=2, choices=GRADE_LEVELS)
    learning_areas = models.CharField(max_length=100, choices=LEARNING_AREAS)
    profile_avatar = models.ImageField(upload_to='avatars/', blank=True, null=True)
    notes = models.TextField(blank=True, null=True)
    
    def __str__(self):
        return f"{self.first_name} {self.last_name}"

class Booking(models.Model):

    TOPICS = [
        ('addition', 'Addition'),
        ('subtraction', 'Subtraction'),
        ('multiplication', 'Multiplication'),
        ('division', 'Division'),
        ('fractions', 'Fractions'),
        ('decimals', 'Decimals'),
        ('geometry', 'Geometry'),
        ('algebra', 'Algebra'),
        ('word_problems', 'Word Problems'),
        ('other', 'Other (please specify)'),
    ]
    user = models.ForeignKey(ChildAccount, on_delete=models.CASCADE, related_name='childbooking')
    name = models.CharField(max_length=100)
    tutor = models.CharField(max_length=100)
    topic = models.CharField(max_length=200, choices=TOPICS, blank=True, null=True)
    other_topic = models.CharField(max_length=100, blank=True, null=True)
    duration = models.DurationField()  # Duration is stored as a timedelta
    date = models.DateField(auto_now_add=False, blank=False, null=False)
    time = models.TimeField()
