from django.forms import ModelForm
from .models import Room
from django.contrib.auth.models import User

class RoomForm(ModelForm):
    class Meta:
        model = Room
        fields = '__all__'
        # create all feilds required to be filled for a room
        exclude = ["host", "participants"]

class UserForm(ModelForm):
    class Meta:
        model = User
        fields = ['username', 'email']