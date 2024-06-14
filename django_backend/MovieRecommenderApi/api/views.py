from django.shortcuts import render
from django.http import HttpResponse, HttpResponseNotFound, HttpResponseRedirect, JsonResponse

import pandas as pd
import os
from rest_framework.status import HTTP_200_OK, HTTP_403_FORBIDDEN, HTTP_400_BAD_REQUEST
from . import utils

def get_movies(request):
    try:

        data_file_path = os.path.join(settings.BASE_DIR, 'api', 'data', 'movies.pkl')
        movies = pd.read_pickle(data_files_path)
        l = movies.title.values.tolist()
        print(len(l))
        d = {
            "status":"200",
            "data": l
        }
    except:
        d = {"status":"404 Bad Request",
             "error":"An Error Occured Sorry !"
        }

    return JsonResponse(data=d) 

def content_based_recommendation(request):

    try:
        name = request.GET.get('name')
        recommended_movies = utils.recommender(name)

        d = {"status":"200",
         "data": recommended_movies
         }
        
    except Exception as e:
        
        print(f'''Exeption: {e}''')
        d = {"status":"404 Bad Request",
             "error":"An Error Occured Sorry !"
        }
    
    return JsonResponse(data=d)

def collaboration_based_recommendation(request):

    return JsonResponse(data={
        "status":"404",
        "error":"feature yet to be created !! :)"
    })