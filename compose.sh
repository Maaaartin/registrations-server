#!/bin/bash
set -e

CMD="$1"

if [[ "$CMD" != "up" && "$CMD" != "down" ]]; then
  echo "Usage: ./compose.sh <up|down>"
  exit 1
fi

docker compose \
  -f docker-compose.yml \
  -f docker-compose.prod.yml \
  "$CMD" -d
