from .models import Room, Topic, Message
from rest_framework.decorators import api_view
from django.http import JsonResponse
from rest_framework import status
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken

# @api_view(['POST'])
# def room(request, pk):
#     room = Room.objects.get(id=pk)
#     room_messages = room.message_set.all()
#     participants = room.participants.all()

#     if request.method == 'POST':
#         message = Message.objects.create(
#             user = request.user,
#             room = room,
#             body = request.POST.get('body')
#         )
#         room.particiants.add(request.user)

#     return JsonResponse({
#         'room': room,
#         'room_messages': room_messages,
#         'participants': participants
#     })

def get_user_from_access_token(request):
    # access_token = request.headers.get('Authorization').split(' ')[1]
    user = RefreshToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkzMTU3MzYwLCJpYXQiOjE2OTMxNTcwNjAsImp0aSI6ImYzM2Y5MGFlOGFmMTRmYmZhMDQ4NzIyN2E5NzJkZTNlIiwidXNlcl9pZCI6MX0.swbPfN2BJRaQpDx1YrF7kE1hxS58_9TV5Q4qIQalMyQ").payload['user_id']
    print(user)
    return user

@api_view(['GET', 'POST'])
def get_room(request, pk):
    room = Room.objects.get(id=pk)
    room_messages = room.message_set.all()
    participants = room.participants.all()
    user = User.objects.get(username='whitedevil')

    if request.method == 'POST':
        print(request.POST)
        body = request.data.get('body')
        message = Message.objects.create(
            user=user,
            room=room,
            body=body
        )
        room.participants.add(user)

        return JsonResponse({
            'message': {
                'id': message.id,
                'user': message.user.username,
                'body': message.body,
                'created': message.created
            }

        })

    return JsonResponse({
        'room': {
            'id': room.id,
            'name': room.name,
            'description': room.description,
            'topic': room.topic.name,
            'created': room.created,
            'host': room.host.username,
            'participants': [participant.username for participant in participants]
        },
        'room_messages': [{
            'id': message.id,
            'user': message.user.username,
            'body': message.body,
            'created': message.created
        } for message in room_messages],
        'participants': [participant.username for participant in participants]
    })
    

# @api_view(['POST'])
# def create_room(request):
#     topic_name = request.POST.get('topic')
#     topic, created = Topic.objects.get_or_create(name=topic_name)

#     room = Room.objects.create(
#         host=request.user,
#         topic=topic,
#         name=request.POST.get('name'),
#         description=request.POST.get('description')
#     )

#     room_dict = {
#         'id': room.id,
#         'name': room.name,
#         'description': room.description,
#         'topic': room.topic.name,
#         # 'participants': [participant.username for participant in room.participants.all()]
#     }
#     return JsonResponse(room_dict, status=status.HTTP_201_CREATED)


@api_view(['POST'])
def create_room(request):
    topic_name = request.data.get('topic')
    room_name = request.data.get('name')
    room_description = request.data.get('description')
    # user = get_user_from_access_token(request)
    # access_token = request.headers.get('Authorization').split(' ')[1]
    # authorization_header = request.headers.get('Authorization')
    # if authorization_header and authorization_header.startswith('Bearer '):
    #     access_token = authorization_header.split(' ')[1]
    # else:
    #     # Handle the absence of a valid Authorization header
    #     return JsonResponse({'error': 'Missing or invalid Authorization header'}, status=status.HTTP_401_UNAUTHORIZED)

    # access_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkyOTU4NTQwLCJpYXQiOjE2OTI5NTgyNDAsImp0aSI6IjEzY2NiZjU4NjliMDQzNTdhZjIzZWI1ZDViOGQwMGY0IiwidXNlcl9pZCI6MX0.o-PymK93_Q8k6Nt0MWP31Qo_8PTNJu7zLlAPkdezgek'
    # refresh_token = RefreshToken(access_token)

    # refresh_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTY5MzA0NDY0MCwiaWF0IjoxNjkyOTU4MjQwLCJqdGkiOiIzOTc1NmY4ZTQzNGM0YmIwOWRiNWZkMTQ1NTI0MmJmMSIsInVzZXJfaWQiOjF9.BfnWkGRVTn0oLZzEQR9nFeWfcDWgFnuFe_LqhlYqJ_0'
    # user = User.objects.get(id=refresh_token.payload['user_id'])

    # print(user)

    user = User.objects.get(username='whitedevil')

    # user = get_user_from_access_token(request)

    topic, created = Topic.objects.get_or_create(name=topic_name)

    room = Room.objects.create(
        host=user,
        topic=topic,
        name=room_name,
        description=room_description,
    )

    room.participants.add(user)

    room_dict = {
        'created': room.created,
        'host': room.host.username,
        'id': room.id,
        'name': room.name,
        'participants': room.participants.all().count(),
        'topic': room.topic.name,
    }

    return JsonResponse(room_dict, status=status.HTTP_201_CREATED)

@api_view(['POST'])
def delete_room(request, pk):
    room = Room.objects.get(id=pk)
    room.delete()
    return JsonResponse({
        'message': 'Room deleted successfully'
    })


@api_view(['POST'])
def update_room(request, pk):
    room = Room.objects.get(id=pk)
    topic_name = request.data.get('topic')
    topic, created = Topic.objects.get_or_create(name=topic_name)
    room.topic = topic
    room.name = request.data.get('name')
    room.description = request.data.get('description')
    room.save()

    return JsonResponse({
        'name': room.name,
        'topic': room.topic.name,
        'description': room.description,
        'message': 'Room updated successfully'
    })


@api_view(['POST'])
def delete_message(request, pk):
    message = Message.objects.get(id=pk)
    participant = message.room.participants.get(id=message.user.id)
    message.room.participants.remove(participant)
    message.delete()
    return JsonResponse({
        'message': 'Message deleted successfully'
    })

@api_view(['GET'])
def get_browse_topics(request):
    topics = Topic.objects.all()[0:5]

    topics_data = []

    for topic in topics:
        topics_data.append({
            'id': topic.id,
            'name': topic.name,
            'count': topic.room_set.all().count(),
        })

    return JsonResponse({
        'topics': topics_data
    })

@api_view(['GET'])
def get_topic_rooms(request):
    rooms = Room.objects.all()

    rooms_data = []

    for room in rooms:
        rooms_data.append({
            'id': room.id,
            'host': room.host.username,
            'name': room.name,
            'topic': room.topic.name,
            'participants': room.participants.all().count(),
            'created': room.created
        })

    return JsonResponse({
        'rooms': rooms_data
    })
    

@api_view(['GET'])
def get_recent_activities(request):
    activities = Message.objects.all()[0:5]
    activities_data = []

    for activity in activities:
        activities_data.append({
            'name': activity.user.username,
            'room': activity.room.name,
            'room_id': activity.room.id,
            'message': activity.body,
            'created': activity.created
        })

    return JsonResponse({
        'activities': activities_data
    })


@api_view(['POST'])
def get_user_details(request):
    username = request.data.get('username')
    user = User.objects.get(username=username)
    activities = Message.objects.filter(user__username=username).all()[0:5]
    activities_data = []

    for activity in activities:
        activities_data.append({
            'name': activity.user.username,
            'room': activity.room.name,
            'room_id': activity.room.id,
            'message': activity.body,
            'created': activity.created
        })

    return JsonResponse({
        'id': user.id,
        'username': user.username,
        'email': user.email,
        'is_staff':user.is_staff,
        'activities': activities_data,
    })