FROM python:3

RUN pip install --upgrade pip pandas

RUN mkdir /app

COPY server /app/server

COPY client /app/client

COPY data /app/data

WORKDIR /app/server

CMD ["python3","server.py"]