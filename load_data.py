import pandas as pd
# Lire fichier csv
df = pd.read_csv('data/tweets.csv')

# id(int)
def search_by_id(id):
    id_data=df.loc[df['id']==id]
    return id_data

# user_id (int)
def search_by_uid(uid):
    uid_data=df.loc[df['user_id']==uid]
    return uid_data

# user_name (str)
def search_by_uname(uname):
    uname_data=df.loc[df['user_name']==uname]
    return uname_data

# texte (str)
def search_by_text(text):
    text_data=df.loc[df['text'].astype(str).str.contains(text)]
    return text_data

# place name (str)
def search_by_place(place):
    place_data=df.loc[df['place_name']==place]
    return place_data

# date au format AAAA-MM-JJ(str)
def search_by_date(date):
    date_data=df.loc[df['date']==date]
    return date_data

# time au format timestamp(int)
def search_by_time(time):
    time_data=df.loc[df['timestamp']==time]
    return time_data

def search_after_time(time):
    time_data=df.loc[df['timestamp']>time]
    return time_data

def search_before_time(time):
    time_data=df.loc[df['timestamp']<time]
    return time_data

# hashtag (str)
def search_by_hashtag(tag):
    if (tag != ""):
        hashtag_data=df.loc[(df['hashtag_0']==tag)|
                            (df['hashtag_1']==tag)|
                            (df['hashtag_2']==tag)]
    return hashtag_data

def search_by_2hashtag(tag1, tag2):
    hash1_data=df.loc[(df['hashtag_0']==tag1)|
                  (df['hashtag_1']==tag1)|
                  (df['hashtag_2']==tag1)]
    hash2_data=df.loc[(df['hashtag_0']==tag2)|
                  (df['hashtag_1']==tag2)|
                  (df['hashtag_2']==tag2)]
    hash_data=pd.merge(hash1_data, hash2_data)
    return hash_data

def search_by_3hashtag(tag1, tag2, tag3):
    hash1_data=df.loc[(df['hashtag_0']==tag1)|
                      (df['hashtag_1']==tag1)|
                      (df['hashtag_2']==tag1)]
    hash2_data=df.loc[(df['hashtag_0']==tag2)|
                      (df['hashtag_1']==tag2)|
                      (df['hashtag_2']==tag2)]
    hash3_data=df.loc[(df['hashtag_0']==tag3)|
                      (df['hashtag_1']==tag3)|
                      (df['hashtag_2']==tag3)]
    hash12_data=pd.merge(hash1_data, hash2_data)
    hash_data=pd.merge(hash12_data, hash3_data)
    return hash_data