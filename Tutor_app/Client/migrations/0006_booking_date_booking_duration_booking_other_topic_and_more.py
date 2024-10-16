# Generated by Django 5.1.1 on 2024-10-13 23:17

import django.db.models.deletion
import django.utils.timezone
from django.utils import timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Client', '0005_alter_childaccount_learning_areas'),
    ]

    operations = [
        migrations.AddField(
            model_name='booking',
            name='date',
            field=models.DateField(default=timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='booking',
            name='duration',
            field=models.DurationField(blank=True),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='booking',
            name='other_topic',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='booking',
            name='time',
            field=models.TimeField(default=timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='booking',
            name='topic',
            field=models.CharField(choices=[('addition', 'Addition'), ('subtraction', 'Subtraction'), ('multiplication', 'Multiplication'), ('division', 'Division'), ('fractions', 'Fractions'), ('decimals', 'Decimals'), ('geometry', 'Geometry'), ('algebra', 'Algebra'), ('word_problems', 'Word Problems'), ('other', 'Other (please specify)')], default=django.utils.timezone.now, max_length=200),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='booking',
            name='tutor',
            field=models.CharField(default=django.utils.timezone.now, max_length=100),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='booking',
            name='user',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='childbooking', to='Client.childaccount'),
            preserve_default=False,
        ),
    ]
