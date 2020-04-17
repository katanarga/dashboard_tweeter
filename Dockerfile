FROM python:3

RUN pip install --upgrade pip pandas

RUN mkdir /script

COPY server.py /script/

COPY query_data.py /script/

COPY client /script/client

COPY data /script/data

WORKDIR /script

CMD ["python3","./server.py"]