# Generated by Django 4.2.5 on 2023-11-01 20:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0027_resources_created'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='profilepic',
            field=models.ImageField(default='profile/default.png', upload_to='profile/'),
        ),
    ]
