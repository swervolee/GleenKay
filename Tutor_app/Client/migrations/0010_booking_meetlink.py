# Generated by Django 5.1.1 on 2024-10-15 07:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Client', '0009_alter_booking_isapproved'),
    ]

    operations = [
        migrations.AddField(
            model_name='booking',
            name='meetLink',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
    ]
