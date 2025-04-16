IMAGE_ID="nextjs-builder"
docker build --no-cache --platform linux/amd64 -t $IMAGE_ID -f Dockerfile.builder .