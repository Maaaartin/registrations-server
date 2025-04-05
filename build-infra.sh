IMAGE_ID="infra-image"
cd db
docker build --platform linux/amd64 -t $IMAGE_ID .
cd ..
sh save-image.sh $IMAGE_ID 
sh copy-image.sh $IMAGE_ID