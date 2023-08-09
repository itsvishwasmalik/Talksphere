from rest_framework import generics
from base.models import Topic, Room, Message
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from .serializers import TopicSerializer, RoomSerializer, MessageSerializer

# Topic views
class TopicListCreateView(generics.ListCreateAPIView):
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer
    # permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        # Your logic for handling GET request
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        # Your logic for handling POST request
        return self.create(request, *args, **kwargs)

class TopicRetrieveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer
    # permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        # Your logic for handling GET request
        return self.retrieve(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        # Your logic for handling PUT request
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        # Your logic for handling DELETE request
        return self.destroy(request, *args, **kwargs)

# Room views
class RoomListCreateView(generics.ListCreateAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
    # permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        # Your logic for handling GET request
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        # Your logic for handling POST request
        return self.create(request, *args, **kwargs)

class RoomRetrieveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
    # permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        # Your logic for handling GET request
        return self.retrieve(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        # Your logic for handling PUT request
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        # Your logic for handling DELETE request
        return self.destroy(request, *args, **kwargs)

# Message views
class MessageListCreateView(generics.ListCreateAPIView):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    # permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        # Your logic for handling GET request
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        # Your logic for handling POST request
        return self.create(request, *args, **kwargs)

class MessageRetrieveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    # permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        # Your logic for handling GET request
        return self.retrieve(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        # Your logic for handling PUT request
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        # Your logic for handling DELETE request
        return self.destroy(request, *args, **kwargs)