# Hackatex backend

## Setup

### Create containers

```bash
$ docker-compose up -d
```

### Copy .env file

```bash
$ cp .env.example .env
```

### Install dependencies

```bash
$ docker exec -it hackatex-node npm install
```

## Start the app

Start in dev (using nodemon):

```bash
$ docker exec -it hackatex-node npm run start:dev
```

Start in production:

```bash
$ docker exec -it hackatex-node npm run start
```

## Access API Docs

Running the app in `dev` environment allows us to access swagger docs [here](http://localhost:3012/api-docs).

## Author

* Alejandro Marr 