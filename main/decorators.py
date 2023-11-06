from django.http import HttpResponse
from django.shortcuts import redirect
from functools import wraps
from datetime import datetime, time
from .models import *

def check_room_access(view_func):
    @wraps(view_func)
    def wrapper(request, pk, *args, **kwargs):
        
        current_time = datetime.now().time()
        current_date = datetime.now().date()
        print("time is")
        print(current_time)
        
        room = Room.objects.get(id=pk)
       

        access_start_time = room.start_datetime.time()
        print(" A time is")
        print(access_start_time)
        access_end_time = room.end_time
        start_date = room.start_datetime.date()

       
        if current_date == start_date and access_start_time <= current_time <= access_end_time and room.is_finished==False:
            
            return view_func(request, pk, *args, **kwargs)
        else:
            
            return HttpResponse("Room access is not allowed at this time")

    return wrapper


def check_course(view_func):
    @wraps(view_func)
    def wrapper(request, pk, *args, **kwargs):
        
        course = Course.objects.get(id=pk)
        coursesofUser = None
        if request.user.role.name == "teacher":
            coursesofUser = request.user.coursesTea.all()
        if request.user.role.name == "student":
            coursesofUser = request.user.coursesStu.all()
        check = False
        for cour in coursesofUser:
            if course == cour:
                check = True
                break
            

       
        if check:
            
            return view_func(request, pk, *args, **kwargs)
        else:
            
            return HttpResponse("you are not enrolled in this course")

    return wrapper
def check_course_room(view_func):
    @wraps(view_func)
    def wrapper(request, pk, *args, **kwargs):
        
        room = Room.objects.get(id=pk)
        course = room.course
        coursesofUser = None
        if request.user.role.name == "teacher":
            coursesofUser = request.user.coursesTea.all()
        if request.user.role.name == "student":
            coursesofUser = request.user.coursesStu.all()
        check = False
        for cour in coursesofUser:
            if course == cour:
                check = True
                break
            

       
        if check:
            
            return view_func(request, pk, *args, **kwargs)
        else:
            
            return HttpResponse("you are not enrolled in this course")

    return wrapper

def accessto_stu_tea(view_func):
    @wraps(view_func)
    def wrapper(request, *args, **kwargs):
        
        check = True
        if request.user.role.name == "admin":
            check = False
            

       
        if check:
            
            return view_func(request, *args, **kwargs)
        else:
            
            return redirect('home')

    return wrapper

def check_teacher(view_func):
    @wraps(view_func)
    def wrapper(request,pk, *args, **kwargs):
        
        roomd = Room.objects.get(id=pk)
        course = roomd.course
        
            

       
        if course.teacher == request.user:
            
            return view_func(request,pk, *args, **kwargs)
        else:
            
            return HttpResponse("you are not allowed to delete")

    return wrapper


