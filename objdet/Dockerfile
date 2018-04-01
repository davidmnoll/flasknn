FROM python:3
ENV PYTHONUNBUFFERED 1
RUN apt-get -qq update
RUN apt-get -qq -y install curl
RUN apt-get -y install protobuf-compiler python-pil python-lxml python-tk git python-pip
RUN easy_install -U pip
RUN pip install tensorflow Cython
# RUN rm -rf tf
RUN mkdir -p /od/tf
RUN mkdir -p /od/pycoco
RUN mkdir -p /od/protos
RUN git clone https://github.com/tensorflow/models.git /od/tf/models
RUN mkdir -p /tmp
WORKDIR /tmp
# RUN rm -rf *
RUN git clone https://github.com/cocodataset/cocoapi.git
WORKDIR /tmp/cocoapi/PythonAPI
RUN ls
RUN make
RUN cp -r pycocotools /od/pycoco
WORKDIR /od/tf/models/research
RUN protoc object_detection/protos/*.proto --python_out=.
ENV PYTHONPATH=$PYTHONPATH:`pwd`/slim
RUN python setup.py build
RUN python setup.py install
VOLUME /od
