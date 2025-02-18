# Use a imagem Node.js como base
FROM node:alpine

RUN mkdir app/

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . /app/

EXPOSE 3000

RUN npm run build

