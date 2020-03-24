from http.server import SimpleHTTPRequestHandler
from http.server import socketserver

class Server(SimpleHTTPRequestHandler):
    FOLDER_CLIENT="client"
    data=[]

    def __init__(self,request,client_adress,server):
        super().__init__(request,client_adress,server)

    def do_GET(self):
        if self.path=="/":
            file_name="index.html"
        elif self.path.startswith("/search?txt="):
            file_name="index.html"
            txt=self.path[12:]
        else:
            file_name="error.html"
        f=open(f"{Server.FOLDER_CLIENT}/{file_name}","rb")
        self.send_response(200)
        self.send_header('Content-type',"text/html")
        self.end_headers()
        self.wfile.write(f.read())
        f.close()

PORT=8000
httpd=socketserver.TCPServer(("",PORT),Server)
httpd.serve_forever()