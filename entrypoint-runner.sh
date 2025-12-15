#!/bin/bash

set -e  # Exit immediately if a command exits with a non-zero status

# Define variables
DIST_FILE="dist.tar"
TEMP_DIR="dist-temp"

echo "Extracting $DIST_FILE..."
mkdir -p "$TEMP_DIR"
tar -xf "$DIST_FILE" -C "$TEMP_DIR"

rm -rf .next prisma
echo "Moving .next and prisma to project root..."
cp -a dist-temp/. .

echo "Cleaning up..."
rm -rf "$TEMP_DIR"

echo "Done."

yarn prisma:generate
yarn next telemetry disable
yarn start
