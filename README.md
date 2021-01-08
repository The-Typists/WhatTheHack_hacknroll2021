This represents the collective experience of 
[Tan Kang Liang](https://github.com/tankangliang)
[Jay Chua](https://github.com/nopenotj)
[Max Ng](https://github.com/maxxng)
[Ritesh Kumar](https://github.com/rtshkmr)

## Inspiration
As budding computer science students, we strive to increase our coding efficiency and that comes with typing practice that is catered for coders. There isn't a free solution online catered for code typing.

Also we feel that having game rooms and interacting with people, especially during these tough times, is chicken soup for the soul.

## What it does
It's a better typeracer. You can play at it solo, or with friends. You can create and share GameRooms to anyone around the world.

## How We built it
Using mongodb as the database, express as backend, react as frontend, docker - ized for ease of development and lots of blood and tears and lost youth, bandaged together with socket.io

## Challenges We ran into
It was difficult to integrate the socket.io into our project, and we faced a lot of difficulty using docker especially during the deployment

## Accomplishments that we're proud of
I learnt how to utilise docker to set up the project and to integrate the frontend with the backend

## What We learned
Uploading features for each user

## What's next for Code WPM
World domination.


## Setting up

1. Install Docker from [here](https://docs.docker.com/install/)

1. Install docker-compose from [here](https://docs.docker.com/compose/install/)

1. From the root directory, run `docker-compose up`

1. Run `docker-compose down` to stop the services.

## Development

To enable autocompletion, you will need to run `yarn install` in both `frontend` and `backend` directories.

Then, run `docker-compose up` (add `-d` flag to run detached, but you won't get any logs). This will bring up the React application on `http://localhost:3000` and the backend service on `http://localhost:8080`. The MongoDB service is not exposed publicly.

You should ensure that editing files in `frontend` or `backend` causes the respective services to be reloaded.

## Adding packages

When adding libraries to `frontend` or `backend` (E.g. `cd frontend && yarn install axios`, you will need to rebuild the image that docker-compose is using. This can be done in two ways:

1. `docker-compose build frontend/backend` will rebuild that one image.

2. `docker-compose up --build` will attempt to build all images but it will use a cached version for the ones that do not have any new packages.

Just use (2) to be safe.

