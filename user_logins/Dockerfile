FROM node:latest

RUN mkdir /app
WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . /app/
EXPOSE 80
CMD [ "npm", "start"]

