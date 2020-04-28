FROM python:3

RUN pip install --upgrade pip pandas

RUN mkdir /app

COPY server /app/server

COPY client /app/client

COPY data /app/data

WORKDIR /app/server

ARG PORT

ENV PORT ${PORT}

CMD ["/bin/sh","-c","python3 server.py ${PORT}"]