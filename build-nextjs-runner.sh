set -e

IMAGE_ID="nextjs-image"
docker build --no-cache --platform linux/amd64 -t $IMAGE_ID .
sh save-image.sh $IMAGE_ID
sh copy-image.sh $IMAGE_ID
