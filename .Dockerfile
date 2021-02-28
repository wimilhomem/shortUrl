FROM node:14

WORKDIR /app

ADD package*.json ./

RUN npm i