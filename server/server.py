from http.server import SimpleHTTPRequestHandler
from http.server import socketserver
import pandas as pd
import json

class Server(SimpleHTTPRequestHandler):
    
    def __init__(self,request,client_adress,server):
        self.df_tweets = pd.read_csv('../data/tweets.csv',encoding='utf8')
        self.folder_client="../client"
        self.filter=['user_name','text','date','place_name','hashtag_0','hashtag_1','hashtag_2']
        super().__init__(request,client_adress,server)

    def do_GET(self):
        if self.path=="/":
            file_name="index.html"
        elif self.path=="/init.js":
            file_name="init.js"
        elif self.path=="/charts.js":
            file_name="charts.js"
        elif self.path=="/ajax.js":
            file_name="ajax.js"
        elif self.path.startswith("/?text="):
            file_name="index.html"
            text=self.path[7:]
            df_json=self.search_tweets_by_text(text)
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
        else:
            self.send_header('Content-type',"text/html")        
        self.end_headers()
        self.wfile.write(f.read())
        f.close()

    def search_tweets_by_text(self,text):
        text_data=self.df_tweets.loc[self.df_tweets['text'].astype(str).str.contains(text),self.filter].reset_index(drop=True)
        text_js=text_data.to_json(orient="index",force_ascii=False)
        return text_js

if __name__=="__main__":
    PORT=8000
    httpd=socketserver.TCPServer(("",PORT),Server)
    httpd.serve_forever()