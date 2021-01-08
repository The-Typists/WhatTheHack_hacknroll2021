FROM node:latest

WORKDIR /backend

COPY ./package.json .

RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm", "run", "start"]