from django.urls import path
from . import views, auth_views

urlpatterns = [
    # path('', views.getRoutes, name="routes"),
    path('topics/', views.TopicListCreateView.as_view(), name='topic-list-create'),
    path('topics/<int:pk>/', views.TopicRetrieveUpdateDeleteView.as_view(), name='topic-retrieve-update-delete'),
    path('rooms/', views.RoomListCreateView.as_view(), name='room-list-create'),
    path('rooms/<int:pk>/', views.RoomRetrieveUpdateDeleteView.as_view(), name='room-retrieve-update-delete'),
    path('messages/', views.MessageListCreateView.as_view(), name='message-list-create'),
    path('messages/<int:pk>/', views.MessageRetrieveUpdateDeleteView.as_view(), name='message-retrieve-update-delete'),
    path('login/', auth_views.UserLoginView.as_view(), name='login'),
    path('logout/', auth_views.UserLogoutView.as_view(), name='logout'),
    path('register/', auth_views.UserRegisterView.as_view(), name='register'),

]