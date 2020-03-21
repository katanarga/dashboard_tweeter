import pandas as pd
# Type DataFrame
df = pd.read_csv('data/tweets.csv')

# afficher chaque valeur
# for i in range(len(df)):
for i in range(5):
    document = df[i:i+1]
    user_name = document['user_name'][i]
    date = document['date'][i]
    place_name = document[place_name][i]
    text = document['text'][i]
    print("At",date,"user",user_name,"à écrit:\n",text,"à",place_name,'\n')

# id(int)
def search_by_id(id):
    id_data=df.loc[df['id']==id]
    return id_data

print(search_by_id(1080004192511680000)) # Fuadi

# user_id (int)
def search_by_uid(uid):
    uid_data=df.loc[df['user_id']==uid]
    return uid_data

print(search_by_uid(159054323)) # Fuadi

# user_name (str)
def search_by_uname(uname):
    uname_data=df.loc[df['user_name']==uname]
    return uname_data

print(search_by_uname("TtingLove"))

# texte (str)
def search_by_text(text):
    text_data=df.loc[df['text']==text]
    return text_data

# place name (str)
def search_by_place(place):
    place_data=df.loc[df['place_name']==place]
    return place_data

print(search_by_place("Manhattan, NY"))

# date au format AAAA-MM-JJ(str)
def search_by_date(date):
    date_data=df.loc[df['date']==date]
    return date_data

print(search_by_date("2019-01-01T07:29:02+00:00"))

# time au format timestamp(int)
def search_by_time(time):
    time_data=df.loc[df['timestamp']==time]
    return time_data

print(search_by_time(1546327742664))

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
    hash_data=df.concat([hash1_data,hash2_data])
    return hash_data

def search_by_3hashtag(tag1, tag2, tag3):
    hash1_data=df.loc[(df['hashtag_0']==tag1)|
                      (df['hashtag_1']==tag1)|
                      (df['hashtag_2']==tag1)]
    hash2_data=df.loc[(df['hashtag_0']==tag2)|
                      (df['hashtag_1']==tag2)|
                      (df['hashtag_2']==tag2)]
    hash3_data=df.loc[(df['hashtag_0']==tag2)|
                      (df['hashtag_1']==tag2)|
                      (df['hashtag_2']==tag2)]
    hash_data=df.concat([hash1_data,hash2_data, hash3_data])
    return hash_data

print(search_by_hashtag("NYE"))
print(search_by_hashtag("happynewyear"))