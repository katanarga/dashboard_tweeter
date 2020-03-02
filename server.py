from http.server import SimpleHTTPRequestHandler
from http.server import socketserver

class Server(SimpleHTTPRequestHandler):
    FOLDER_FRONTEND = "frontend"

    def __init__(self,request,client_adress,server):
        super().__init__(request,client_adress,server)

    def do_GET(self):
        if self.path=="/":
            file_name="index.html"
        else:
            file_name="error.html"
        f=open(f"{Server.FOLDER_FRONTEND}/{file_name}","rb")
        self.send_response(200)
        self.send_header('Content-type',"text/html")
        self.end_headers()
        self.wfile.write(f.read())
        f.close()

PORT = 8000


Handler = Server
httpd = socketserver.TCPServer(("", PORT), Handler)
httpd.serve_forever()