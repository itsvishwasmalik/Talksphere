from .models import Room, Topic, Message
from rest_framework.decorators import api_view
from django.http import JsonResponse


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