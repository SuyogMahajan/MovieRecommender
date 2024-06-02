from django.contrib import admin
from django.urls import path, include

from . import views

urlpatterns = [
 path('content_based_recommendation/',views.content_based_recommendation),
 path('collaborative_recommendation/',views.collaboration_based_recommendation),
 path('movies/',views.get_movies)
]
