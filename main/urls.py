from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static
from django.contrib.auth import views as auth_views

urlpatterns=[
    path('',views.home,name="home"),
    path('profile/',views.profile,name="profile"),
    path('aboutus/',views.aboutus,name="aboutus"),
    path('login/',views.loginPage,name="login"),
    path('logout/',views.logoutUser, name="logout"),
    path('home/announcements/<str:pk>',views.announce,name = "announce"),
    path('calendar/',views.calendar, name="calendar"),
    path('courseSelect/',views.courseSelect, name="courseSelect"),
    path('courseHome/<str:pk>',views.courseHome,name="courseHome"),
    path('courseHome/<str:pk1>/assignmentSubmit/<str:pk2>/',views.assignmentSub,name="AssignmentSub"),
    path('room/<str:pk>',views.room,name="room"),
    path('assiMark/<str:pk>',views.allot_marks,name="assiMark"),
    path('deleteroom/<str:pk>',views.deleteroom,name="deleteroom"),
    path('courseHome/<str:pk1>/assignmentView/<str:pk2>/',views.assignment_view,name="AssignmentView"),
    path('password-reset/', auth_views.PasswordResetView.as_view(template_name='main/password_reset.html'), name='password_reset'),
    path('password-reset/done', auth_views.PasswordResetDoneView.as_view(template_name='main/password_reset_done.html'), name='password_reset_done'),
    path('password-reset-confirm/<uidb64>/<token>/',
         auth_views.PasswordResetConfirmView.as_view(template_name='main/password_reset_confirm.html'),
         name='password_reset_confirm'),
    path('password-reset-complete/',
         auth_views.PasswordResetCompleteView.as_view(template_name='main/password_reset_complete.html'),
         name='password_reset_complete'),
    path('changepwd/',views.changepwd, name="changepwd"),
    path('markGrade/<str:pk>',views.mark_grade,name="markGrade"),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)
   