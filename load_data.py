import pandas as pd
import json
# Lire fichier csv
df = pd.read_csv('data/tweets.csv')
filter=['user_name','text','place_name','place_country','date','hashtag_0','hashtag_1','hashtag_2']

# id(int)
def search_by_id(id):
    id_data=df.loc[df['id']==id,filter]
    id_js=id_data.to_json(orient="index",force_ascii=False)
    return json.loads(id_js)

# print(search_by_id(1080003416573857792))
# user_id (int)
def search_by_uid(uid):
    uid_data=df.loc[df['user_id']==uid,filter]
    uid_js=uid_data.to_json(orient="index",force_ascii=False)
    return json.loads(uid_js)

# user_name (str)
def search_by_uname(uname):
    uname_data=df.loc[df['user_name']==uname,filter]
    uname_js=uname_data.to_json(orient="index",force_ascii=False)
    return json.loads(uname_js)

# texte (str)
def search_by_text(text):
    text_data=df.loc[df['text'].astype(str).str.contains(text),filter]
    text_js=text_data.to_json(orient="index",force_ascii=False)
    return json.loads(text_js)

# print(search_by_text("happy"))

# place name (str)
def search_by_place(place):
    place_data=df.loc[df['place_name']==place,filter]
    place_js=place_data.to_json(orient="index",force_ascii=False)
    return json.loads(place_js)

# print(search_by_place("Memphis, TN"))

# date au format AAAA-MM-JJ(str)
def search_by_date(date):
    date_data=df.loc[df['date']==date,filter]
    date_js=date_data.to_json(orient="index",force_ascii=False)
    return json.loads(date_js)

# time au format timestamp(int)
def search_by_time(time):
    time_data=df.loc[df['timestamp']==time,filter]
    time_js=time_data.to_json(orient="index",force_ascii=False)
    return json.loads(time_js)

def search_after_time(time):
    time_data=df.loc[df['timestamp']>time,filter]
    time_js=time_data.to_json(orient="index",force_ascii=False)
    return json.loads(time_js)

def search_before_time(time):
    time_data=df.loc[df['timestamp']<time,filter]
    time_js=time_data.to_json(orient="index",force_ascii=False)
    return json.loads(time_js)

# hashtag (str)
def search_by_hashtag(tag):
    if (tag != ""):
        hashtag_data=df.loc[(df['hashtag_0']==tag)|
                            (df['hashtag_1']==tag)|
                            (df['hashtag_2']==tag),filter]
    hash_js=hashtag_data.to_json(orient="index",force_ascii=False)
    return json.loads(hash_js)

def search_by_2hashtag(tag1, tag2):
    hash1_data=df.loc[(df['hashtag_0']==tag1)|
                  (df['hashtag_1']==tag1)|
                  (df['hashtag_2']==tag1),filter]
    hash2_data=df.loc[(df['hashtag_0']==tag2)|
                  (df['hashtag_1']==tag2)|
                  (df['hashtag_2']==tag2),filter]
    hash_data=pd.merge(hash1_data, hash2_data)
    hash_js=hash_data.to_json(orient="index",force_ascii=False)
    return json.loads(hash_js)

def search_by_3hashtag(tag1, tag2, tag3):
    hash1_data=df.loc[(df['hashtag_0']==tag1)|
                      (df['hashtag_1']==tag1)|
                      (df['hashtag_2']==tag1),filter]
    hash2_data=df.loc[(df['hashtag_0']==tag2)|
                      (df['hashtag_1']==tag2)|
                      (df['hashtag_2']==tag2),filter]
    hash3_data=df.loc[(df['hashtag_0']==tag3)|
                      (df['hashtag_1']==tag3)|
                      (df['hashtag_2']==tag3),filter]
    hash12_data=pd.merge(hash1_data, hash2_data)
    hash_data=pd.merge(hash12_data, hash3_data)
    hash_js=hash_data.to_json(orient="index",force_ascii=False)
    return json.loads(hash_js)

# print(search_by_3hashtag("IAmAPoet","MemphisPoetry","IAmAPoet901"))