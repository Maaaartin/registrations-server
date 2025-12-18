#!/bin/bash

set -e

IMAGE_NAME="$1"
IMAGE_TAR="./images/${IMAGE_NAME}.tar"

if [ -z "$IMAGE_NAME" ]; then
  echo "Usage: $0 image-name"
  echo "Example: $0 my-app  (expects ./my-app.tar)"
  exit 1
fi

if [ ! -f "$IMAGE_TAR" ]; then
  echo "File not found: $IMAGE_TAR"
  exit 1
fi

# Load the image
echo "Loading image from $IMAGE_TAR..."
LOAD_OUTPUT=$(docker load -i "$IMAGE_TAR")

echo "$LOAD_OUTPUT"

# Get the actual loaded tag (if any)
# This handles cases like: "Loaded image: my-app:abc123"
LOADED_TAG=$(echo "$LOAD_OUTPUT" | grep 'Loaded image:' | awk '{print $3}' | cut -d: -f2)

# Fallback in case no tag found
if [ -z "$LOADED_TAG" ]; then
  echo "Could not detect original tag, using 'latest' as default source tag"
  LOADED_TAG="latest"
fi

# Tag as latest
echo "Tagging $IMAGE_NAME:$LOADED_TAG as $IMAGE_NAME:latest..."
docker tag "$IMAGE_NAME:$LOADED_TAG" "$IMAGE_NAME:latest"

echo "Done!"
