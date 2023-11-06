from django.contrib import admin
from .models import *
from django import forms
from django.contrib.auth.models import Group
from django.contrib.auth.admin import UserAdmin 
from django.contrib.auth.forms import ReadOnlyPasswordHashField




admin.site.register(Roles)
admin.site.register(User)
admin.site.register(Announcements)
admin.site.register(Todo)
admin.site.register(Branch)
admin.site.register(Course)
admin.site.register(Grades)
admin.site.register(AnnouncementsCourse)
admin.site.register(Assignment)
admin.site.register(AssignmentSub)
admin.site.register(Resources)
admin.site.register(Room)
admin.site.register(AnnouncementFilesCourse)
admin.site.register(Attendence)
admin.site.register(Messages)
admin.site.register(Seat)