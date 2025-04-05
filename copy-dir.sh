if [ -f .env ]; then
  source .env
else
  echo ".env file not found!"
  exit 1
fi
sshpass -p "$REMOTE_PASSWORD" rsync -avP scp -v -C -r ./$1 root@$REMOTE_ADDRESS:/root/app/