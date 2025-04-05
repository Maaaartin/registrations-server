sh prepare.sh
IMAGE_ID="nextjs-image"
docker build linux/amd64 -t $IMAGE_ID .
sh save-image.sh $IMAGE_ID
sh copy-image.sh $IMAGE_ID