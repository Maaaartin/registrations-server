#!/bin/sh
set -e

if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
fi

if [ -f /.dockerenv ]; then
  HOST="postgres"
  REDIS_HOST="redis"
  ELASTIC_HOST="elasticsearch"
else
  HOST="localhost"
  REDIS_HOST="localhost"
  ELASTIC_HOST="localhost"
fi

export DATABASE_URL="postgresql://$POSTGRES_USER:$POSTGRES_PASSWORD@$HOST/$POSTGRES_DB?connection_limit=20"
export REDIS_URL="redis://$REDIS_HOST:6379"
export ELASTIC_URL="http://$ELASTIC_HOST:9200"

exec "$@"
