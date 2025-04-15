
if [ -f .env ]; then
  source .env
else
  echo ".env file not found!"
  exit 1
fi

sshpass -p "$REMOTE_PASSWORD" ssh root@$REMOTE_ADDRESS "rm -r root/app/images/$1.tar"
sshpass -p "$REMOTE_PASSWORD" rsync -avP scp -v -C ./images/$1.tar root@$REMOTE_ADDRESS:/root/app/images/$1.tar

