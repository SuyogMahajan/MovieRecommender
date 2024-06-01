from django.shortcuts import render
from django.http import HttpResponse, HttpResponseNotFound, HttpResponseRedirect, JsonResponse
from rest_framework.status import HTTP_200_OK, HTTP_403_FORBIDDEN, HTTP_400_BAD_REQUEST
from . import utils

def content_based_recommendation(request):

    try:
        name = request.GET.get('name') 
        recommended_movies = utils.recommender(name)

        d = {"status":"HTTP_200_OK",
         "data": recommended_movies
         }
    except:
        d = {"status":"404 Bad Request",
             "error":"An Error Occured Sorry !"
        }
    
    return JsonResponse(data=d)