FROM node:latest AS frontend

WORKDIR /frontend

COPY ./frontend/package.json .

RUN npm install --legacy-peer-deps

COPY ./frontend .

RUN npm run build

# build folder is in /frontend/build

FROM node:latest as backend

WORKDIR /backend

COPY ./backend/package.json .

RUN npm install 

COPY ./backend .

RUN npm uninstall typescript

RUN npm install -g typescript

RUN npm run g:build

# dist folder is in /backend/dist

FROM node:alpine

WORKDIR /app

COPY --from=backend /backend/dist .

COPY --from=frontend /frontend/build ./public

COPY --from=backend /backend/package.json ./package.json

RUN npm install --only=prod

CMD ["node" , "index.js"]
