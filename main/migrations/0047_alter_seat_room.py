# Generated by Django 4.2.5 on 2023-11-05 07:21

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0046_seat_enroll_seat_raise_hand'),
    ]

    operations = [
        migrations.AlterField(
            model_name='seat',
            name='room',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='seats', to='main.room'),
        ),
    ]
