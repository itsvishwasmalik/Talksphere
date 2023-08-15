from .models import Room, Topic, Message
from rest_framework.decorators import api_view
from django.http import JsonResponse
from rest_framework import status


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

@api_view(['GET',"POST"])
def get_room(request, pk):
    room = Room.objects.get(id=pk)
    room_messages = room.message_set.all()
    participants = room.participants.all()

    if request.method == 'POST':
        message = Message.objects.create(
            user=request.user,
            room=room,
            body=request.POST.get('body')
        )
        room.participants.add(request.user)

    return JsonResponse({
        'room': {
            'id': room.id,
            'name': room.name,
            'description': room.description,
            'topic': room.topic.name,
            'participants': [participant.username for participant in participants]
        },
        'room_messages': [{
            'id': message.id,
            'user': message.user.username,
            'body': message.body,
            'timestamp': message.timestamp
        } for message in room_messages],
        'participants': [participant.username for participant in participants]
    })
    

@api_view(['POST'])
def create_room(request):
    topic_name = request.POST.get('topic')
    topic, created = Topic.objects.get_or_create(name=topic_name)

    room = Room.objects.create(
        host=request.user,
        topic=topic,
        name=request.POST.get('name'),
        description=request.POST.get('description')
    )

    room_dict = {
        'id': room.id,
        'name': room.name,
        'description': room.description,
        'topic': room.topic.name,
        # 'participants': [participant.username for participant in room.participants.all()]
    }
    return JsonResponse(room_dict, status=status.HTTP_201_CREATED)


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
            'message': activity.body,
            'created': activity.created
        })

            
    return JsonResponse({
        'activities': activities_data
    })