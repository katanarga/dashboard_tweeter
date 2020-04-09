from http.server import SimpleHTTPRequestHandler
from http.server import socketserver
from socketserver import StreamRequestHandler, TCP
import time
import sys
import os
import socket
from query_data import *

class MyStreamRequestHandler(StreamRequestHandler):
    def __init__(self, request, client_address, server):
        print("%s create handler..." % (time.time()))
        StreamRequestHandler.__init__(self, request, client_address, server)
    
    def handle(self):
        self.request.settimeout(3)
        try:
            data = self.rfile.readline().strip()
            time.sleep(5)
            print("%s recv from client: %s %s" % (time.time(), self.client_address, data))
        except socket.timeout as e:
            print("%s catch an timeout exception. %s(%s)" % (time.time(), e, self.client_address))
            self.finish()

class Server(SimpleHTTPRequestHandler):
    
    def __init__(self,request,client_adress,RequestHandlerClass):
        self.df_tweets = pd.read_csv('data/tweets.csv', encoding='utf8')
        self.folder_client="client"
        super().__init__(request,client_adress,RequestHandlerClass)
    
    def handle_timeout(self):
        print("%s timeout..." %time.time())

    def do_GET(self):
        if self.path=="/":
            file_name="index.html"
        elif self.path=="/init.js":
            file_name="init.js"
        elif self.path=="/Tweets.js":
            file_name="Tweets.js"
        elif self.path.startswith("/?text="):
            file_name="index.html"
            text=self.path[13:]
            df_json=search_by_text(self.df_tweets,text)
            self.send_response(200)
            self.send_header("Content-type","application/json")
            self.end_headers()
            with open("test.json","w") as f:
                f.write(json.dumps(df_json))
            with open("test.json","rb") as f:
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

def main():
    PORT=8000
    httpd=socketserver.TCPServer(("",PORT),MyStreamRequestHandler)
    httpd.timeout = 2
    print("server running...")
    # httpd.serve_forever()
    while True:
        httpd.handle_request()


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("Keyboard Interrupted. Server shutdown.")
        try:
            sys.exit(0)
        except SystemExit:
            os._exit(0)