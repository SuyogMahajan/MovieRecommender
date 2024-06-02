import pickle
import pandas as pd

def recommender(title):
    movies = pd.read_pickle('/home/suyog/MyDirectory/codes/django_projs/MovieRecommender/django_backend/MovieRecommenderApi/api/data/movies.pkl')
    similarity = pd.read_pickle('/home/suyog/MyDirectory/codes/django_projs/MovieRecommender/django_backend/MovieRecommenderApi/api/data/similarity.pkl')

    d = movies[movies['title'] == title]
    if(len(d) == 0):
        return f"{title} not found !"
    index = d.index[0]
    distances = sorted(list(enumerate(similarity[index])),reverse=True,key = lambda x: x[1])
    ans = []
    for i in distances[1:11]:
        ans.append({"movie_id": int(movies.iloc[i[0]].movie_id), "title": movies.iloc[i[0]].title})
    
    return ans