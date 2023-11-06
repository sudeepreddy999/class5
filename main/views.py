from django.shortcuts import render,redirect
from django.contrib import messages
from django.http import HttpResponse
import json
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from .models import *
from django.db.models import Q
from django.contrib.auth.models import User
from django.contrib.auth import login,authenticate,logout,update_session_auth_hash
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import UserCreationForm
from django.core.files.storage import FileSystemStorage
from django.contrib.auth.hashers import check_password
import datetime
import os
from django.conf import settings
from .decorators import *
from django.urls import reverse
from json import dumps
import pytz
from datetime import datetime,timedelta
# Create your views here.
def home(request):
    if request.method == 'POST' :
        ann = Announcements.objects.create(
            title = request.POST.get('title'),
            body = request.POST.get('body'),
            host = request.user
        )
        
        if 'fileinput' in request.FILES:
            media_dir = os.path.join(settings.MEDIA_ROOT, 'announce')
            os.makedirs(media_dir, exist_ok=True)
            for uploaded_file in request.FILES.getlist('fileinput'):
                file_path = os.path.join(media_dir, uploaded_file.name)
                with open(file_path, 'wb') as destination:
                    for chunk in uploaded_file.chunks():
                        destination.write(chunk)
                        
                AnnouncementFiles.objects.create(
                    announce=ann,
                    file='announce/' + uploaded_file.name
                )
        return redirect('home')
    ann = Announcements.objects.all().order_by('-created')
    context = {'announcements':ann}
    return render(request, 'main/home2.html',context)

        
def aboutus(request):
    return render(request, 'main/aboutus.html')


        
        
        
        

       
        

    
@login_required
@accessto_stu_tea
def profile(request):
    ann = Announcements.objects.latest('id')
    iden = ann.id
    courses = request.user.coursesStu.all()
    grades = []
    for course in courses:
        gra = course.grades.all()
        grades.append(gra)
    for course in courses:
        atten = course.attendCards.all()
        for att in atten:
            b = att.course.max_classes
            a = att.class_pre
            ai = int(a)
            bi = int(b)
            if(a!=0):
                pi = a/b
                pi=pi*100
            else:
                pi=0
            p = str(pi)
            att.percentage = p
            
            att.save()
            
    context = {'id':iden,'courses':courses,'grades':grades}
    if request.method == 'POST' :
        iden = request.POST.get('iden')
        if iden == "0":
            user =request.user
            uploaded_image = request.FILES.get('file')
            if uploaded_image:
                user.profilepic = uploaded_image
                user.save()
                return redirect('profile')
        if iden == "1":
            bio = request.POST.get('bioin')
            request.user.bio = bio
            request.user.save()
            return redirect('profile')
        if iden == "2":
            state = request.POST.get('inputState',None)
            if state:
                request.user.State = state
            district = request.POST.get('districtInput',None)
            if district :
                request.user.district = district
            mobile = request.POST.get('mobileInput',None)
            if mobile :
                request.user.mobile = mobile
            pin = request.POST.get('pincodeInput',None)
            if pin:
                request.user.pincode = pin
            address = request.POST.get('addressInput',None)
            if address:
                request.user.address = address
            request.user.save()

    return render(request, 'main/profile.html',context)

def announce(request,pk):
    ann = Announcements.objects.get(id = pk)
    date = ann.created.day
    month = ann.created.month
    maxi = Announcements.objects.count()
    month_names = {
    1: "Jan",
    2: "Feb",
    3: "Mar",
    4: "Apr",
    5: "May",
    6: "June",
    7: "July",
    8: "Aug",
    9: "Sep",
    10: "Oct",
    11: "Nov",
    12: "Dec"
    }
    monthn = month_names.get(month)
    context = {'Announcement':ann,'date':date,'month':monthn,'max':maxi}
    return render(request,'main/announce.html',context)

def loginPage(request):
    if request.user.is_authenticated :
        return redirect('home')
    if request.method=='POST':
        email = request.POST.get('email').lower()
        password = request.POST.get('password')
    
        try:
            user=User.objects.get(email=email)
        except:
            messages.error(request,'inavlid User')

        user = authenticate(request,email=email,password=password)
        if user is not None :
            login(request,user)
            return redirect('home')
        else:
            messages.error(request,'username passwords doesnt exit')
    return render(request,'main/loginPage.html')

def logoutUser(request):
    logout(request)
    return redirect('login')
@login_required
def calendar(request):
    todays = Todo.objects.all()
                
    date = "2023-10-6"
    context = {"todays":todays, "date":date}
    if not request.user.is_authenticated :
        return redirect('login')
    else:
        if request.method == 'POST':
            print("entered POST")
            data = json.loads(request.body.decode('utf-8'))
            bool = data.get('bool')
            print(bool)
            if bool =="0":
                datef = data.get("date")
                events = Todo.objects.filter(
                    date = datef,
                    createdby = request.user
                )
                
                context.update({"events":events})
                context.update({"date":datef})
                response_data  = {'message': 'Data received successfully', 'events': list(events.values()), 'date': datef}
                return JsonResponse(response_data) 
            elif bool=='1':
                datef = data.get("date")
                todo = Todo.objects.create(
                    createdby = request.user,
                    task = data.get("body"),
                    date = datef
                    )
                todo.save()
                events = Todo.objects.filter(
                    date = datef,
                    createdby = request.user
                )
                response_data2  = {'message': 'Data received successfully', 'events': list(events.values()), 'date': datef}
                return JsonResponse(response_data2)
        return render(request, 'main/Calendar.html',context)
@login_required
def deleteTodo(request,pk):
    task = Todo.objects.get(id = pk)
    task.delete()
    return redirect('todo')

@login_required
@accessto_stu_tea
def courseSelect(request):
    
    courses = None
    # role = request.user.role
    if request.method == 'POST':
        code = request.POST.get('code')
        name = request.POST.get('courseName')
        course = Course.objects.create(
            code = code,
            name = name,
            teacher = request.user
        )
        value = request.POST.get('CSE')
        if value == "CSE":
            tbranch = Branch.objects.get(code="CSE")
            students = tbranch.users.all()
            for student in students:
                grade=Grades.objects.create(
                    student = student,
                    course = course
                )
                grade.save()
                att = Attendence.objects.create(
                    course = course,
                    student = student
                )
                att.save()
                course.students.add(student)
                value = request.POST.get('CSE')
        value = request.POST.get('ECE')
        if value == "ECE":
            tbranch = Branch.objects.get(code="ECE")
            students = tbranch.users.all()
            for student in students:
                grade=Grades.objects.create(
                    student = student,
                    course = course
                )
                grade.save()
                att = Attendence.objects.create(
                    course = course,
                    student = student
                )
                att.save()
                course.students.add(student)
                value = request.POST.get('ECE')
        value = request.POST.get('EEE')
        if value == "EEE":
            tbranch = Branch.objects.get(code="EEE")
            students = tbranch.users.all()
            for student in students:
                grade=Grades.objects.create(
                    student = student,
                    course = course
                )
                grade.save()
                att = Attendence.objects.create(
                    course = course,
                    student = student
                )
                att.save()
                course.students.add(student)
                value = request.POST.get('EEE')
        value = request.POST.get('DSAI')
        if value == "DSAI":
            tbranch = Branch.objects.get(code="DSAI")
            students = tbranch.users.all()
            for student in students:
                grade=Grades.objects.create(
                    student = student,
                    course = course
                )
                grade.save()
                att = Attendence.objects.create(
                    course = course,
                    student = student
                )
                att.save()
                course.students.add(student)
                value = request.POST.get('DSAI')
        value = request.POST.get('EPH')
        if value == "EPH":
            tbranch = Branch.objects.get(code="EPH")
            students = tbranch.users.all()
            for student in students:
                grade=Grades.objects.create(
                    student = student,
                    course = course
                )
                grade.save()
                att = Attendence.objects.create(
                    course = course,
                    student = student
                )
                att.save()
                course.students.add(student)
                value = request.POST.get('EPH')
        value = request.POST.get('MECH')
        if value == "MECH":
            tbranch = Branch.objects.get(code="MECH")
            students = tbranch.users.all()
            for student in students:
                grade=Grades.objects.create(
                    student = student,
                    course = course
                )
                grade.save()
                att = Attendence.objects.create(
                    course = course,
                    student = student
                )
                att.save()
                course.students.add(student)
                value = request.POST.get('MECH')  
        course.save()
        return redirect('courseSelect')      
        
        
        
            
        
    if request.user.role.name == "teacher":
        courses = request.user.coursesTea.all()
        
    if request.user.role.name == "student":
        courses = request.user.coursesStu.all()
        
    context = {'courses':courses}
    return render(request, 'main/courseSelect.html',context)
@login_required
@accessto_stu_tea
@check_course    
def courseHome(request,pk):
    current_server_time = timezone.now()
    print(current_server_time)
    course = Course.objects.get(id=pk)
    
    announce = course.announcements.all()
    assi_due = []
    assi_completed = []
    assig = course.assignments.all()
    # assU = request.user.assignmentsSub.all()
    res = course.resources.all()
    rooms = course.rooms.all()
    students = course.students.all()
    grades = course.grades.all()
    if request.user.role.name == "student":
        for ass in assig:
            assign_cond = Q(assignment = ass)
            student_condition = Q(student=request.user)
            asso = AssignmentSub.objects.get(assign_cond & student_condition )
            if asso.is_submitted == False:
                assi_due.append(ass)
            else:
                assi_completed.append(ass)
    # for ass in assig:
    #     checkq = False
    #     for assu in assU:
    #         if assu.assignment == ass:
    #             checkq =True
    #             break
    #     if checkq == True:
    #         assi_completed.append(ass)
    #     else:
    #         assi_due.append(ass)
    context = {'course':course,
               'announcements':announce,
               'assignments':assig,
               'assi_due':assi_due,
               'assi_comp':assi_completed,
               'res':res,
               'rooms':rooms,
               'students':students,
               'grades':grades
               }
    
    if request.method == "POST":
        iden = request.POST.get('iden')
            # first POST
        if iden == "0":
            ann = AnnouncementsCourse.objects.create(
            title = request.POST.get('title'),
             body = request.POST.get('body'),
            host = request.user,
             course = course
            )
        
            if 'fileinput0' in request.FILES:
                media_dir = os.path.join(settings.MEDIA_ROOT, 'announce')
                os.makedirs(media_dir, exist_ok=True)
                for uploaded_file in request.FILES.getlist('fileinput0'):
                    file_path = os.path.join(media_dir, uploaded_file.name)
                    with open(file_path, 'wb') as destination:
                        for chunk in uploaded_file.chunks():
                            destination.write(chunk)
                        
                    AnnouncementFilesCourse.objects.create(
                        announce=ann,
                        file='announce/' + uploaded_file.name
                    )  
            rreferring_url = request.META.get('HTTP_REFERER', '/')
            return redirect(rreferring_url)
        if iden == "1":
            res = Resources.objects.create(
                name = request.POST.get('topic'),
                course = course
            )
            if 'fileinput' in request.FILES:
                media_dir = os.path.join(settings.MEDIA_ROOT, 'resources')
                os.makedirs(media_dir, exist_ok=True)
                upl = request.FILES.get('fileinput')
                file_path = os.path.join(media_dir, upl.name)
                with open(file_path, 'wb') as destination:
                    for chunk in upl.chunks():
                        destination.write(chunk)
                    
                res.file_res='resources/' + upl.name
                res.save()
            rreferring_url = request.META.get('HTTP_REFERER', '/')
            return redirect(rreferring_url) 
        if iden == "3":
            
            starttime = request.POST.get('starttime')
            endtime = request.POST.get('endtime')
            datetime_obj = datetime.strptime(starttime, '%Y-%m-%dT%H:%M')
            datetime_obj_end = datetime.strptime(endtime, '%Y-%m-%dT%H:%M')
            end_time = datetime_obj_end.time()
            print(datetime_obj)
            print(end_time)
            room = Room.objects.create(
                start_datetime = datetime_obj,
                end_time = end_time,
                course = course,
                room_name=request.POST.get('roomloc')
                
            )
            room.save()
            for stud in students:
                seat =Seat.objects.create(
                    student = stud,
                    room = room
                    
                )
                seat.save()
            print("save Successfullt")
            url = reverse('courseHome', args=[course.id])
            return redirect(url)
        if iden == "5":
            endtime = request.POST.get('endtime')
            datetime_obj = datetime.strptime(endtime, '%Y-%m-%dT%H:%M')
            ass = Assignment.objects.create(
                name= request.POST.get('name'),
                total_marks = request.POST.get('max_marks'),
                closing_date = datetime_obj.date(),
                closing_time = datetime_obj.time(),
                course = course
            )
            print("half done")
            if 'fileinput' in request.FILES:
                media_dir = os.path.join(settings.MEDIA_ROOT, 'assignments')
                os.makedirs(media_dir, exist_ok=True)
                upl = request.FILES.get('fileinput')
                file_path = os.path.join(media_dir, upl.name)
                with open(file_path, 'wb') as destination:
                    for chunk in upl.chunks():
                        destination.write(chunk)
                    
                ass.source_file='assignments/' + upl.name
                ass.save()
                print("created successfully")
            for student in students:
                assi = AssignmentSub.objects.create(
                    student=student,
                    assignment = ass,
                    
                )
                assi.save()
            url = reverse('courseHome', args=[course.id])
            return redirect(url)
            
        
            
            
    return render(request,'main/courseHome.html',context)

@login_required
def deleteroom(request,pk):
    roomd = Room.objects.get(id=pk)
    course = roomd.course
    roomd.delete()
    url = reverse('courseHome', args=[course.id])
    return redirect(url)
        
@login_required
@accessto_stu_tea
def assignmentSub(request,pk1,pk2):
    course = Course.objects.get(id=pk1)
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
    if check == True:
        
        assi = Assignment.objects.get(id=pk2)
        context ={'course':course,'assi':assi}
        if request.method == 'POST':
            assign_cond = Q(assignment = assi)
            student_condition = Q(student=request.user)
            ass = AssignmentSub.objects.get(assign_cond & student_condition )
            if 'fileinput' in request.FILES:
                media_dir = os.path.join(settings.MEDIA_ROOT, 'assignments')
                os.makedirs(media_dir, exist_ok=True)
                upl = request.FILES.get('fileinput')
                file_path = os.path.join(media_dir, upl.name)
                with open(file_path, 'wb') as destination:
                    for chunk in upl.chunks():
                        destination.write(chunk)
                ass.fileUpload='assignments/' + upl.name
                ass.is_submitted = True
                ass.save()
                url = reverse('courseHome', args=[course.id])
                return redirect(url)
                
            else:
                ass.delete()
                rreferring_url = request.META.get('HTTP_REFERER', '/')
                return redirect(rreferring_url)                
                
                
            
        
        return render(request,'main/assignmentView.html',context)
# def check(request,room,courses):
def assignment_view(request,pk1,pk2):
    course = Course.objects.get(id=pk1)
    assi = Assignment.objects.get(id=pk2)
    assign_cond = Q(assignment = assi)
    student_condition = Q(student=request.user)
    asso = AssignmentSub.objects.get(assign_cond & student_condition )
    context={'assi':assi,'asso':asso}
    return render(request,'main/assignmentView2.html',context)
def present_or_not(request,studs):
    is_present = False
    for stu in studs:
        if request.user == stu:
            is_present = True
            break
    return is_present
@login_required
@accessto_stu_tea
@check_course_room
#@check_room_access
def room(request,pk):
    room = Room.objects.get(id = pk)
    end_time = room.end_time
    current_time = datetime.now()
    entry_time_limit = room.start_datetime + timedelta(minutes = 10)
    start_datetime = room.start_datetime
    print(current_time.time())
    if current_time.time() > end_time or current_time<start_datetime:
        return HttpResponse("Room access is not allowed at this time")
    course = room.course
    courses = Course.objects.all()
    teacher = room.teacher
    messages = Messages.objects.filter(room=room)
    messagesin =[]
    seats = room.seats.all()
    seatU = None
    if request.user.role.name == "student":
        seatU = room.seats.get(student = request.user)
    print(seatU)
    #print(seats)
    seatsin = []
    for seat in seats:
        seatsin.append(
            {
                'seat':seat.selected,
                'enroll':seat.enroll,
                'raise_hand':seat.raise_hand,
                'user':seat.student.email
            }
        )
    # print(seatsin)
    datajsonSeats = dumps(seatsin)
    # print(datajsonSeats)
    for message in messages:
        messagesin.append(
            {
                'content':message.content,
                'user':message.user.email,
                'i':message.i,
                'first_name':message.user.first_name
            }
        )
    datajson = dumps(messagesin)
    # print(datajson)
    # for message in messages:
    #     if message.user == request.user:
    #         if message.i == "0":
    #             messagesin0.append(message)
    #         else:
    #             if message.i == 
    
    max_stu = course.students.all().count()
    context={'room':room,'course':course,'max':max_stu,'id':pk,'courses':courses,'messages':messages,'datain':datajson,'seatsin':datajsonSeats,'seatU':seatU}
      
    if current_time > entry_time_limit:
        return render(request,'main/room.html',context)
    if request.method == 'POST':
        iden = request.POST.get('iden')
        if iden == "0":
            room.is_finished = True
            room.save()
            url = reverse('courseHome', args=[course.id])
            return redirect(url)
    if request.user.role.name == "teacher":
        if not teacher:
            course.max_classes = course.max_classes+1
            print("added for teacher")
            course.save()
            room.teacher = request.user
            room.save()
    if request.user.role.name == "student":
        course_condition = Q(course=course)
        student_condition = Q(student=request.user)
        att = Attendence.objects.get(course_condition & student_condition)
        studs = room.students.all()
        studsB = room.back_listed.all()
        is_present = present_or_not(request,studs)
        is_back_listed = present_or_not(request,studsB)
        if not is_present and not is_back_listed:
            att.class_pre = att.class_pre + 1
            print("added for student")
            att.save()
            room.students.add(request.user)
            room.save()
    
            
        
        
   
    return render(request,'main/room.html',context)

    
def allot_marks(request,pk):
    ass = Assignment.objects.get(id=pk)
    assub = ass.assub.all()
    max_num = ass.assub.all().count()
    context={'assign':ass,'subm':assub,'max':max_num}
    if request.method == "POST":
        marks = request.POST.get('marks')
        marksi = int(marks)
        print(marksi)
        ass_id = request.POST.get('ass_id')
        assi = AssignmentSub.objects.get(id = ass_id)
        assi.marks_given = marksi
        assi.is_marked = True
        assi.save()
        url = reverse('assiMark', args=[ass.id])
        return redirect(url)
    return render(request,'main/assignmentMark.html',context)
    
        
@login_required
def changepwd(request):
    if request.method == 'POST':
        user = request.user
        old_password = request.POST.get('opwd')
        new_password = request.POST.get('pwd')
        confirm_password = request.POST.get('cpwd')
        if old_password=="" or new_password=="" or len(new_password)<8:
            return redirect('changepwd')
        if check_password(old_password, user.password):
            if new_password == old_password:
                # messages.error(request, "Password already in use")
                return redirect('home')
            if new_password == confirm_password:
                user.set_password(new_password)
                user.save()
                update_session_auth_hash(request, user)
                # messages.success(request, 'Password Updated Successfully')
                return redirect('home')
            else:
                # messages.error(request, 'New Password and Confirm Password do not match')
                return redirect('changepwd')
        else:
            # messages.error(request, 'Current Password Not Matching')
            return redirect('changepwd')
    return render(request, 'main/changepwd.html', {'user': request.user})

def mark_grade(request,pk):
    course = Course.objects.get(id=pk)
    
    grades = course.grades.all()
    context = {'grades':grades}
    if request.method == "POST":
        marks = request.POST.get('marks')
        
        
        ass_id = request.POST.get('grade_id')
        assi = Grades.objects.get(id = ass_id)
        assi.grade = marks
        assi.is_graded = True
        assi.save()
        url = reverse('markGrade', args=[course.id])
        return redirect(url)
    return render(request,'main/markGrade.html',context)