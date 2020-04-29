from http.server import SimpleHTTPRequestHandler
from http.server import HTTPServer
from http.server import socketserver
from socketserver import ThreadingMixIn
import pandas as pd
import threading
import json
import os
import sys

class Server(SimpleHTTPRequestHandler):
    timeout = 60 # seconde

    def setup(self):
        self.request.settimeout(self.timeout)
        SimpleHTTPRequestHandler.setup(self)

    def __init__(self,request,client_adress,server):
        self.df_tweets = pd.read_csv('../data/tweets.csv',encoding='utf8')
        self.folder_client="../client"
        super().__init__(request,client_adress,server)
        with open(self.folder_client+"/param.js","w") as param_file:
            param_file.write(f"let port={port};")

    def do_GET(self):
        if self.path=="/":
            file_name="index.html"
        elif self.path=="/init.js":
            file_name="init.js"
        elif self.path=="/param.js":
            file_name="param.js"
        elif self.path=="/charts.js":
            file_name="charts.js"
        elif self.path=="/ajax.js":
            file_name="ajax.js"
        elif self.path=="/world_map.svg":
            file_name="world_map.svg"
        elif any([self.path.startswith(f"/?{param}=") for param in ("text","name","tag")]):
            if self.path.startswith("/?text="):
                text=self.path[7:]
                df_json=self.search_tweets_by_text(text)
            elif self.path.startswith("/?name="):
                uname=self.path[7:]
                df_json=self.search_tweets_by_uname(uname)
            else:
                hashtag=self.path[6:]
                df_json=self.search_tweets_by_hashtag(hashtag)
            self.send_response(200)
            self.send_header("Content-type","application/json")
            self.end_headers()
            with open("response.json","w") as f:
                f.write(json.dumps(df_json))
            with open("response.json","rb") as f:
                self.wfile.write(f.read())
            return None
        else:
            file_name="error.html"
        f=open(f"{self.folder_client}/{file_name}","rb")
        self.send_response(200)
        if file_name[-2:]=="js":
            self.send_header('Content-type',"application/javascript")
        elif file_name=="world_map.svg":
            self.send_header('Content-type',"image/svg+xml")
        else:
            self.send_header('Content-type',"text/html")        
        self.end_headers()
        self.wfile.write(f.read())
        f.close()
        print("Handle by thread",threading.currentThread().getName())

    def search_tweets_by_text(self,text):
        text_data=self.df_tweets.loc[self.df_tweets['text'].astype(str).str.contains(text)].reset_index(drop=True)
        text_js=text_data.to_json(orient="index",force_ascii=False)
        return text_js
    
    def search_tweets_by_uname(self,uname):
        uname_data=self.df_tweets.loc[self.df_tweets['user_name'].astype(str).str.contains(uname)].reset_index(drop=True)
        uname_js=uname_data.to_json(orient="index",force_ascii=False)
        return uname_js
    
    def search_tweets_by_hashtag(self,hashtag):
        if (hashtag != ""):
            hashtag_data=self.df_tweets.loc[(self.df_tweets['hashtag_0'].astype(str).str.contains(hashtag))|
                            (self.df_tweets['hashtag_1'].astype(str).str.contains(hashtag))|
                            (self.df_tweets['hashtag_2'].astype(str).str.contains(hashtag))].reset_index(drop=True)
        hash_js=hashtag_data.to_json(orient="index",force_ascii=False)
        return hash_js

class ThreadedHTTPServer(ThreadingMixIn, HTTPServer):
    """Handle requests in a separate thread."""

if __name__=="__main__":
    try:
        if len(sys.argv)!=2:
            print("Usage : python3 server.py port")
        else:
            port=int(sys.argv[1])
            httpd=ThreadedHTTPServer(("",port),Server)
            print(f"Server started at port {port}")
            while True:
                httpd.handle_request()
    except KeyboardInterrupt:
        print("\nKeyboard Interrupted. Server shutdown.")
        try:
            sys.exit(0)
        except SystemExit:
            os._exit(0)