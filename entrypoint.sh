#!/bin/sh
set -e

if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
fi

if [ -f /.dockerenv ]; then
  HOST="postgres"
else
  HOST="localhost"
fi

export DATABASE_URL="postgresql://$POSTGRES_USER:$POSTGRES_PASSWORD@$HOST/$POSTGRES_DB?schema=public"

exec "$@"
