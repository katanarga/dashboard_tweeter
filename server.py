from http.server import SimpleHTTPRequestHandler
from http.server import socketserver
from query_data import *

class Server(SimpleHTTPRequestHandler):
    
    def __init__(self,request,client_adress,server):
        self.df_tweets = pd.read_csv('data/tweets.csv')
        self.folder_client="client"
        super().__init__(request,client_adress,server)

    def do_GET(self):
        if self.path=="/":
            print("root")
            file_name="index.html"
            mimetype='text/html'
        elif self.path.startswith("/search?text="):
            print("searching...")
            file_name="index.html"
            mimetype='text/html'
            text=self.path[13:]
            df_json=search_by_text(self.df_tweets,text)
            print(f"text {text} dfjson {df_json} {type(df_json)}")
        elif self.path.startswith("/init"):
            print("loading js...")
            file_name="init.js"
            mimetype='application/javascript'
        elif self.path.startswith("/Tweets"):
            print("loading js...")
            file_name="Tweets.js"
            mimetype='application/javascript'
        else:
            print("error")
            file_name="error.html"
            mimetype='text/html'

        f=open(f"{self.folder_client}/{file_name}","rb")
        self.send_response(200)
        self.send_header('Content-type',mimetype)
        self.end_headers()
        self.wfile.write(f.read())
        f.close()

if __name__=="__main__":
    PORT=8000
    httpd=socketserver.TCPServer(("",PORT),Server)
    httpd.serve_forever()