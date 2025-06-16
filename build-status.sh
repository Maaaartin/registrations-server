IMAGE_ID="status-image"
cd status
docker build --no-cache --platform linux/amd64 -t $IMAGE_ID .
cd ..
sh save-image.sh $IMAGE_ID 
sh copy-image.sh $IMAGE_ID