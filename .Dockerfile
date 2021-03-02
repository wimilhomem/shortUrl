FROM node:14 as base

WORKDIR /app

ADD package*.json ./


RUN npm i
COPY . .

FROM base as production

ENV NODE_PATH=./dist

RUN npm run build