set -e

if [ -f .env ]; then
  source .env
else
  echo ".env file not found!"
  exit 1
fi

sshpass -p "$REMOTE_PASSWORD" ssh root@$REMOTE_ADDRESS "rm -rf /root/app/$1"
sshpass -p "$REMOTE_PASSWORD" rsync -azP "./$1" root@$REMOTE_ADDRESS:/root/app/
