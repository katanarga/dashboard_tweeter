from http.server import SimpleHTTPRequestHandler
from http.server import HTTPServer
from http.server import socketserver
from socketserver import ThreadingMixIn
import pandas as pd
import threading
import json
import os
import sys

class ThreadedHTTPServer(ThreadingMixIn, HTTPServer):
    """Handle requests in a separate thread."""

class Server(SimpleHTTPRequestHandler):
    timeout = 60 # seconde

    def setup(self):
        self.request.settimeout(self.timeout)
        SimpleHTTPRequestHandler.setup(self)

    def __init__(self,request,client_adress,server):
        self.df_tweets = pd.read_csv('../data/tweets.csv',encoding='utf8')
        self.folder_client="../client"
        self.path_static_files=["/","/init.js","/param.js","/charts.js","/ajax.js","/world_map.svg"]
        self.params_url=["text","user_name","hashtag"]
        super().__init__(request,client_adress,server)
        with open(self.folder_client+"/param.js","w") as param_file:
            param_file.write(f"let port={port};")

    def do_GET(self):
        if self.path in self.path_static_files: #return a static file
            if self.path=="/":
                file_name="index.html"
            else:
                file_name=self.path[1:]
        elif any([self.path.startswith(f"/?{param}=") for param in self.params_url]):
            # search
            param=self.path[self.path.index("=")+1:]
            filter_type=self.path[2:self.path.index("=")]
            print("filter ",filter_type," ",param)
            df_json=self.search_tweets_by_filter(filter_type,param)
            print("df_json",df_json[:100])
            self.send_response(200)
            self.send_header("Content-type","application/json")
            self.end_headers()
            with open("response.json","w") as f:
                f.write(json.dumps(df_json))
            with open("response.json","rb") as f:
                self.wfile.write(f.read())
            return None
        else: # incorrect url 
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

    def search_tweets_by_filter(self,filter_type,param):
        if filter_type=="text" or filter_type=="user_name":
            df=self.df_tweets.loc[self.df_tweets[filter_type].astype(str).str.contains(param)].reset_index(drop=True)
        elif filter_type=="hashtag":
            df=self.df_tweets.loc[(self.df_tweets['hashtag_0'].astype(str).str.contains(param)) |
                (self.df_tweets['hashtag_1'].astype(str).str.contains(param)) |
                (self.df_tweets['hashtag_2'].astype(str).str.contains(param))].reset_index(drop=True)   
        df_json=df.to_json(orient="index",force_ascii=False)
        return df_json

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
    except ValueError:
        print(f"The port number '{sys.argv[1]}' is incorrect")
    except KeyboardInterrupt:
        print("\nKeyboard Interrupted. Server shutdown.")