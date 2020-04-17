import pandas as pd
import json

filter=['user_name','text','date','place_name','hashtag_0','hashtag_1','hashtag_2']

# texte (str)
def search_by_text(df_tweets,text):
    text_data=df_tweets.loc[df_tweets['text'].astype(str).str.contains(text),filter].reset_index(drop=True)
    text_js=text_data.to_json(orient="index",force_ascii=False)
    return text_js