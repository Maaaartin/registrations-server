#!/bin/sh
set -e

if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
fi

if [ -f /.dockerenv ]; then
  HOST="postgres"
  POSTGREST_HOST="postgrest:5000"
else
  HOST="localhost"
  POSTGREST_HOST="localhost:5000"
fi

export DATABASE_URL="postgresql://$POSTGRES_USER:$POSTGRES_PASSWORD@$HOST/$POSTGRES_DB?schema=public"
export POSTGREST_HOST

exec yarn "$@"
