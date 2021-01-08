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

