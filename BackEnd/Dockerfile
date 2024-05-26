FROM python:3.9-alpine

RUN mkdir -p /home/forum

RUN addgroup -S forum && adduser -S forum -G forum

ENV HOME=/home/forum
ENV APP_HOME=/home/forum/app
RUN mkdir $APP_HOME

WORKDIR $APP_HOME

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN apk update \
    && apk add postgresql-dev gcc python3-dev musl-dev

RUN pip install --upgrade pip
COPY ./requirements.txt .
RUN pip3 install -r requirements.txt

COPY . $APP_HOME

RUN chown -R forum:forum $APP_HOME

USER forum
