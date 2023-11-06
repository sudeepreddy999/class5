from django.db import models
from django.contrib.auth.models import AbstractUser
from .manager import Usermanager
from django.utils import timezone
# Create your models here.
class Roles(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name
class Branch(models.Model):
    name = models.CharField(max_length=100)
    code = models.CharField(max_length=10)
    def __str__(self):
        return f"{self.code}"
class User(AbstractUser):
    email = models.EmailField(unique=True)
    username= None
    enrollment= models.CharField(max_length=50,null=True)
    mobile = models.CharField(max_length=50,null=True,blank=True)
    role = models.ForeignKey(Roles,on_delete=models.CASCADE,null=True)
    branch = models.ForeignKey(Branch, on_delete = models.CASCADE,null = True, blank=True, related_name = "users")
    profilepic = models.ImageField(upload_to='profile/', default = "profile/default.png")
    address = models.TextField(max_length = 200, blank = True, null = True)
    State = models.CharField(max_length = 50, blank = True, null = True)
    district = models.CharField(max_length = 50, blank = True, null = True)
    pincode = models.CharField(max_length = 10, blank = True, null = True)
    bio = models.TextField(max_length = 200, blank = True, null = True)
    objects = Usermanager()
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS=[]


class Announcements(models.Model):
    title = models.TextField()
    body = models.TextField()
    host = models.ForeignKey(User,on_delete=models.CASCADE)
    updated=models.DateTimeField(auto_now=True)
    created=models.DateTimeField(auto_now_add=True)
    
class Course(models.Model):
    code = models.CharField(max_length = 10)
    name = models.CharField(max_length = 75)
    teacher = models.ForeignKey(User, on_delete=models.SET_NULL,null=True,related_name="coursesTea")
    students = models.ManyToManyField(User,related_name="coursesStu")
    max_classes = models.IntegerField(default=0)

class Grades(models.Model):
    grade = models.CharField(max_length = 2, default="0")
    is_graded = models.BooleanField(default=False)
    student = models.ForeignKey(User,on_delete=models.CASCADE,related_name="grades")
    course = models.ForeignKey(Course,on_delete=models.CASCADE,related_name="grades")
    
    
class AnnouncementFiles(models.Model):
    announce = models.ForeignKey(Announcements, on_delete = models.CASCADE, related_name = "files")
    file = models.FileField(upload_to='announce/',blank = True, null = True)

class Todo(models.Model):
    task = models.TextField()
    createdby = models.ForeignKey(User,on_delete=models.CASCADE)
    date = models.DateField()
    def __str__(self):
        return f"{self.createdby} and {self.task}"

class AnnouncementsCourse(models.Model):
    title = models.TextField()
    body = models.TextField()
    course = models.ForeignKey(Course,on_delete=models.CASCADE,related_name="announcements")
    host = models.ForeignKey(User,on_delete=models.CASCADE)
    updated=models.DateTimeField(auto_now=True)
    created=models.DateTimeField(auto_now_add=True)

class AnnouncementFilesCourse(models.Model):
    announce = models.ForeignKey(Announcements, on_delete = models.CASCADE, related_name = "annFiles")
    file = models.FileField(upload_to='announce/',blank = True, null = True)

class Assignment(models.Model):
    name = models.CharField(max_length = 50)
    total_marks = models.IntegerField()
    closing_date = models.DateField()
    closing_time = models.TimeField()
    is_submitted = models.BooleanField(default=False)
    course = models.ForeignKey(Course,on_delete=models.CASCADE, related_name="assignments")
    source_file = models.FileField(upload_to='assignments/',blank = True, null = True)
    
    def __str__(self):
        return self.name
    
class AssignmentSub(models.Model):
    student = models.ForeignKey(User,on_delete=models.CASCADE,related_name="assignmentsSub")
    assignment = models.ForeignKey(Assignment,on_delete=models.CASCADE,related_name="assub")
    is_submitted = models.BooleanField(default=False)
    is_marked = models.BooleanField(default=False)
    updated=models.DateTimeField(auto_now=True)
    marks_given = models.IntegerField(default=0)
    fileUpload = models.FileField(upload_to='assignments/',blank = True, null = True)#remove later
    def __str__(self):
        return self.student.first_name

class Resources(models.Model):
    course =models.ForeignKey(Course,on_delete=models.CASCADE, related_name="resources")
    name = models.CharField(max_length = 50)
    file_res = models.FileField(upload_to='resources/',blank = True, null = True)#remove later
    created=models.DateTimeField(default=timezone.now)
    def __str__(self):
        return self.name

class Room(models.Model):
    start_datetime = models.DateTimeField()
    # end_datetime = models.DateTimeField()
    end_time = models.TimeField()
    is_finished = models.BooleanField(default=False)
    course = models.ForeignKey(Course,on_delete=models.CASCADE,related_name="rooms")
    teacher = models.ForeignKey(User, on_delete=models.SET_NULL,null=True,related_name="roomsTea",blank = True)
    students = models.ManyToManyField(User,related_name="roomsStu",blank = True)
    back_listed = models.ManyToManyField(User,related_name="roomsStuBack",blank = True)
    room_name = models.CharField(max_length=25, blank = True, null = True)
    students_online = models.ManyToManyField(User,related_name="online_room",blank = True)
    teacher_online = models.ForeignKey(User, on_delete=models.SET_NULL,null=True,related_name="online_tea",blank = True)
    def __str__(self):
        return self.course.code
    
class Attendence(models.Model):
    course = models.ForeignKey(Course,on_delete=models.CASCADE,related_name="attendCards")
    student = models.ForeignKey(User, on_delete=models.CASCADE,related_name="attendCards")
    percentage = models.CharField(max_length=4, default="0")
    class_pre = models.IntegerField(default=0)
    def __str__(self):
        return self.student.first_name
    
class Messages(models.Model):
    room = models.ForeignKey(Room,on_delete=models.CASCADE,related_name="messages")
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    content = models.TextField()
    i = models.CharField(max_length=3)
    date_added = models.DateTimeField(auto_now_add=True)

    class Meta:
       ordering = ('date_added',) 
       
class Seat(models.Model):
    student = models.ForeignKey(User,on_delete=models.CASCADE)
    enroll = models.CharField(max_length=5)
    raise_hand = models.BooleanField(default=False)
    selected = models.CharField(max_length = 5,default = "0")
    room = models.ForeignKey(Room,on_delete = models.CASCADE,related_name="seats")
    
    
    
    