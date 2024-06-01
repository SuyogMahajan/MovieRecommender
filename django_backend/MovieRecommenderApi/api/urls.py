from django.contrib import admin
from django.urls import path, include

from . import views

urlpatterns = [
 path('content_based_recommendation/',views.content_based_recommendation)
]
