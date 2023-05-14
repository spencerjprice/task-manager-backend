# Task Manager (task-manager-backend)

This is the nestjs backend for the task manager app. It is a simple task manager app that gives CRUD functionality for tasks.

You can find swagger docs for this app after running it locally [here](http://localhost:3000/docs)

I chose Prisma as the ORM as it is really easy to setup and start using.

I would have liked to add unit tests for the service as well as e2e tests, but I ran out of time. I also thought about creating a User table in order to associate Tasks to a User and adding authentication, but did not want to build out functionality outside of the scope of the task.

Overall the backend is pretty simple and I enjoyed working on it.

## Installation

This project uses asdf to manage the node version. Install [asdf](https://asdf-vm.com/guide/getting-started.html) if you don't have it already.

Install the node version specified in the `.tool-versions` file.

```bash
asdf install
```

```bash
$ npm ci
# or
$ npm install
```

## Running the app

This app uses a postgres database with Prisma as the ORM. To setup the database with seeded data, run the following commands:

```bash
# Run postgres
$ docker-compose up
# Run migration and seed data
$ npm run db:seed
```

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```
