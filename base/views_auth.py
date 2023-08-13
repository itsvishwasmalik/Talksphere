from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status

@api_view(['POST'])
def registerUser(request):
    user_data = request.data

    username = user_data['username'].lower()
    email = user_data['email'].lower()
    password = user_data['password']

    if User.objects.filter(username=username).exists():
        return Response({
            'message': 'Username already exists.',
            'status': 400
        },status=status.HTTP_400_BAD_REQUEST)
    
    if User.objects.filter(email=email).exists():
        return Response({
            'message': 'Email already exists.',
            'status': 400
        },status=status.HTTP_400_BAD_REQUEST)
    
    user = User.objects.create_user(username=username, email=email, password=password)

    return Response({
        'id': user.id,
        'username': user.username,
        'email': user.email,
        'is_staff':user.is_staff,
        'access_token': str(RefreshToken.for_user(user).access_token),
        'refresh_token': str(RefreshToken.for_user(user))
    })
    

@api_view(['POST'])
def loginUser(request):
    user_data = request.data

    username = user_data['username'].lower()
    password = user_data['password']

    user = User.objects.filter(username=username).first() or User.objects.filter(email=username).first()

    if user is None:
        return Response({
            'message': 'User not found!',
            'status': 404
        },status=status.HTTP_404_NOT_FOUND)

    if not user.check_password(password):
        return Response({
            'message': 'Incorrect Password!',
            'status': 401
        },status=status.HTTP_401_UNAUTHORIZED)


    return Response({
        'id': user.id,
        'username': user.username,
        'email': user.email,
        'is_staff':user.is_staff,
        'access_token': str(RefreshToken.for_user(user).access_token),
        'refresh_token': str(RefreshToken.for_user(user))
    })
