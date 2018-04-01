FROM davidmnoll/obj-det:latest
RUN apt-get -qq update
RUN apt-get -qq -y install curl
RUN mkdir /code
ADD ./flasknn /code
WORKDIR /code
RUN pip install -r requirements.txt
ENV FLASK_APP=/code/flasknn/flasknn.py
VOLUME /code
