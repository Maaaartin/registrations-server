# registrations-server

Web application for exploring Czech vehicle registration data. The project is built with [Next.js](https://nextjs.org/), [Prisma](https://www.prisma.io/), PostgreSQL, Redis and Elasticsearch.

## Prerequisites

- [Node.js](https://nodejs.org/) 20 and [Yarn](https://yarnpkg.com/)
- [Docker](https://www.docker.com/) and Docker Compose

## Environment variables

Create a `.env` file in the project root. At minimum it should define your database credentials:

```
POSTGRES_USER=your_user
POSTGRES_PASSWORD=your_password
POSTGRES_DB=registrations
```

These variables are consumed by the entrypoint script and Docker services to configure connections to PostgreSQL, Redis and Elasticsearch.

## Run with Docker Compose

Build and start the entire stack (Next.js app, PostgreSQL, Redis, Elasticsearch and Nginx proxy):

```
docker-compose up --build
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Local development

Install dependencies and start the development server:

```
yarn install
yarn dev
```

The `dev` script wraps `next dev` with the project `entrypoint.sh` so environment variables are loaded from `.env`.

## Database helpers

The `db` directory provides command-line utilities for downloading source CSVs, creating tables and indices, and syncing data into PostgreSQL and Elasticsearch.

### Run locally

```
cd db
yarn start <command> [args]
```

Commands from `src/index.js`:

- `download` – fetch CSV data defined in `download/mapping.json`, import each table and refresh indices
- `import <tableName>` – import `data/<tableName>.csv` into PostgreSQL
- `indices <create|refresh>` – create database indexes or refresh them
- `table <tableName>` – create a table from headers in `schemas/<tableName>`
- `query "<SQL>"` – run arbitrary SQL
- `elastic <create|sync> [startId]` – create the Elasticsearch index or sync data starting from an optional ID
- `visits` – create the `visits` tracking table

### Run in Docker

If you prefer to run these helpers in an isolated container:

```
./build-infra.sh           # builds the infra-image from ./db
./run-infra.sh <command> [args]
```

`run-infra.sh` attaches the container to the `registrations-server_app_network`, loads variables from `.env`, and mounts `./data` so the commands can access downloaded CSVs and your database.


## Production build

To create a production build and serve it locally:

```
yarn build
yarn start
```

Docker helper scripts such as `build-nextjs-runner.sh` and `docker-compose.prod.yml` are provided for containerized deployment.

