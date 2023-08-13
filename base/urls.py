from django.urls import path
from . import views
from base.views_auth import registerUser, loginUser
from base.views_rooms import get_topic_rooms, get_recent_activities, get_browse_topics

urlpatterns = [
    path('login/', views.loginPage, name="login"),
    path('logout/', views.logoutUser, name="logout"),
    path('register/', views.registerPage, name="register"),
    path("", views.home, name="home"),
    path("room/<str:pk>/",views.room, name="room"),
    path("user-profile/<str:pk>/", views.userProfile, name="user-profile"),
    path("create-room/",views.createRoom, name="create-room"),
    path("update-room/<str:pk>/",views.updateRoom, name="update-room"),
    path("delete-room/<str:pk>/",views.deleteRoom, name="delete-room"),
    path("delete-message/<str:pk>/",views.deleteMessage, name="delete-message"),
    path("update-user/",views.updateUser, name="update-user"),
    path("topics/",views.topicsPage, name="topics"),
    path("activity/",views.activityPage, name="activity"),
    path("user/login/",loginUser, name="login"),
    path("user/register/",registerUser, name="register"),
    path("new/rooms/",get_topic_rooms, name="get_topic_rooms"),
    path("new/recent_activities/",get_recent_activities, name="get_recent_activities"),
    path("new/browse_topics/",get_browse_topics, name="get_browse_topics"),
]