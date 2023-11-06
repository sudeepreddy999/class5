import json
from channels.generic.websocket import AsyncWebsocketConsumer
from asgiref.sync import sync_to_async
from .models import *
from django.db.models import Q
from channels.db import database_sync_to_async
online_user = 0
class ChatRoomConsumer(AsyncWebsocketConsumer):
    @database_sync_to_async
    def get_seat_number(self, user):
        # Assuming user enrollment uniquely identifies a student's seat in a room
        # You can adjust this logic if necessary
        
        seat = Seat.objects.get(student=user, room=self.room_name)
        
        return seat.selected  # Assuming seat number is stored in the 'selected' field
        
    async def connect(self):
        global online_user
        
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'chat_%s' % self.room_name
        user = self.scope.get('user')
        
        rn = self.room_name
        await self.add_user(user,rn)
        # print(seat_number)
        print(rn)
        # self.role = self.scope["user"].role.name
        # print(self.role)
        # if(self.role != "teacher"):
        online_user += 1
        
        
        
        
        

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        await self.send_online_user_count()
        # await self.roleTea()
        
        
        await self.accept()
        
        

        
        
    async def disconnect(self, close_code):
        global online_user
        online_user -= 1
        user = self.scope.get('user')
        rn = self.room_name
        
        seat_number = await self.get_seat_number(user)
        await self.send_online_user_count()
        
        await self.reset_seat(user,rn)
        await self.delete_user(user,rn)
        await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type':'left_message',
                    'he_left':"left",
                    'seat_id_name': seat_number,
                    
                    
                }
            )
        # await self.save_seat(user,seat,enroll)
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )
    
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        if 'message' in text_data_json:
            message = text_data_json['message']
        # print(f'Received message: {message}')
            username = text_data_json['username']
            email = text_data_json['email']
            room = text_data_json['room']
            i = text_data_json['i']
            await self.save_message(email,message,i,room)
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type':'chat_message',
                    'message':message,
                    'username':username,
                    'i':i
                }
            )
        elif 'end' in text_data_json:
            end = text_data_json['end']
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type':'end_message',
                    'end':end
                    
                }
            )
        elif 'raise_hand' in text_data_json:
            user = text_data_json['user']
            seat = text_data_json['seat']
            room_id = text_data_json['room_name']
            print("raise hand")
            rh = text_data_json['raise_hand']
            await self.save_raise(user,seat,room_id,rh)
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type':'raise_message',
                    'user':user,
                    'seat':seat,
                    'raise_hand':rh
                    
                }
            )
        elif 'over' in text_data_json:
            enroll = text_data_json['enroll']
            room_name = text_data_json['room_name']
            print("startted executing iverride")
            print(enroll)
            await self.override(enroll,room_name)
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type':'over_message',
                    
                    
                    'enroll':enroll
                    
                }
            )
            
            
        elif 'seat' in text_data_json:
            user = text_data_json['user']
            seat = text_data_json['seat']
            enroll = text_data_json['enroll']
            room_id = text_data_json['room_name']
            print("seat received")
            await self.save_seat(user,seat,enroll,room_id)
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type':'seat_message',
                    'user':user,
                    'seat':seat,
                    'enroll':enroll
                    
                }
            )
        
            
        
        
            
        
    async def chat_message(self, event):
        message = event['message']
        username = event['username']
        i = event['i']

        await self.send(text_data=json.dumps({
            'message': message,
            'username': username,
            'i':i
        }))
    
    async def end_message(self, event):
        end = event['end']
        

        await self.send(text_data=json.dumps({
            'end': end,
            
        }))
    async def left_message(self, event):
        he_left= event['he_left']
        seat_id = event['seat_id_name']

        await self.send(text_data=json.dumps({
            'he_left':he_left,
            'seat_id_name':seat_id
            
        }))
    
    async def seat_message(self, event):
        seat = event['seat']
        
        user = event['user']
        enroll = event['enroll']
        await self.send(text_data=json.dumps({
            'seat': seat,
            'user':user,
            'enroll':enroll
            
        }))
    async def raise_message(self, event):
        seat = event['seat']
        
        user = event['user']
        rh = event['raise_hand']
        await self.send(text_data=json.dumps({
            'seat': seat,
            'user':user,
            'raise_hand':rh
            
        }))
    
    async def over_message(self, event):
        enroll = event['enroll']
        
        
        print("over messge sent")
        await self.send(text_data=json.dumps({
            'over':"over",
            'enroll':enroll
        }))
        
        
    async def send_online_user_count(self):
        # Send the online user count to all clients in the room
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'user_count',
                'count': online_user,
            }
        )
    
    @sync_to_async 
    def add_user(self,user,room):
        
        room = Room.objects.get(id=room) 
        if user.role.name == "student":
            room.students_online.add(user)
            print("user added in the func")
    @sync_to_async
    def delete_user(self,user,room):
        
        room = Room.objects.get(id=room) 
        if user.role.name == "student":
            room.students_online.remove(user)
            
    @sync_to_async 
    def save_message(self,email,message,i,room):
        user = User.objects.get(email = email) 
        room = Room.objects.get(id=room) 
        Messages.objects.create(
            room= room,
            user = user,
            content = message,
            i = i
            
        ) 
    @sync_to_async 
    def save_seat(self,email,seat,enroll,room_id):
        user = User.objects.get(email = email)
        room = Room.objects.get(id = room_id)
        c1 = Q(room = room) 
        c2 = Q(student = user)
        seat1 = Seat.objects.get(c1 & c2)
        # room = Room.objects.get(id=room) 
        seat1.selected = seat
        seat1.enroll = enroll
        seat1.save()
    @sync_to_async 
    def reset_seat(self,user,room_id):
        
        room = Room.objects.get(id = room_id)
        c1 = Q(room = room) 
        c2 = Q(student = user)
        seat1 = Seat.objects.get(c1 & c2)
        # room = Room.objects.get(id=room) 
        seat1.selected = "0"
        seat1.raise_hand = False
        # seat1.enroll = enroll
        seat1.save()
    
    @sync_to_async 
    def save_raise(self,email,seat,room_id,rh):
        
        user = User.objects.get(email = email) 
        room = Room.objects.get(id = room_id)
        c1 = Q(room = room) 
        c2 = Q(student = user)
        
        seat1 = Seat.objects.get(c1 & c2)
        # room = Room.objects.get(id=room) 
        if rh == "up":
            seat1.raise_hand = True
        else:
            seat1.raise_hand = False
        
        seat1.save()
        
    @sync_to_async 
    def override(self,enroll,room_id):
        
        user = User.objects.get(enrollment = enroll) 
        room = Room.objects.get(id = room_id)
        course = room.course
        
        c1 = Q(course = course) 
        c2 = Q(student = user)
        
        att = Attendence.objects.get(c1 & c2)
        check = False
        for stu in room.students.all():
            if user == stu:
                check = True
                break
        # room = Room.objects.get(id=room) 
        
        if check:
            att.class_pre = att.class_pre -1
            att.save()
        else:
            att.class_pre = att.class_pre +1
            att.save()
        
        
    # async def roleTea(self):
    #     # Send the online user count to all clients in the room
    #     await self.channel_layer.group_send(
    #         self.room_group_name,
    #         {
    #             'type': 'user_count',
    #             'count': online_user,
    #         }
    #     )
        

    async def user_count(self, event):
        # Send the online user count to the WebSocket
        count = event['count']
        await self.send(text_data=json.dumps({'count': count}))