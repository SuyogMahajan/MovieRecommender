import pickle
import pandas as pd
from drf_movie_recommender.settings.base_settings import BASE_DIR
import os
def recommender(title):
    movies_file_path = os.path.join(BASE_DIR, 'api', 'data', 'movies.pkl')
    similarity_file_path = os.path.join(BASE_DIR, 'api', 'data', 'similarity.pkl')
    movies = pd.read_pickle(movies_file_path)
    similarity = pd.read_pickle(similarity_file_path)

    d = movies[movies['title'] == title]
    if(len(d) == 0):
        return f"{title} not found !"
    index = d.index[0]
    distances = sorted(list(enumerate(similarity[index])),reverse=True,key = lambda x: x[1])
    ans = []
    for i in distances[1:11]:
        ans.append({"movie_id": int(movies.iloc[i[0]].movie_id), "title": movies.iloc[i[0]].title})
    
    return ans