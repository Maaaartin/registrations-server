if [ -f .env ]; then
  source .env
else
  echo ".env file not found!"
  exit 1
fi

sshpass -p "$REMOTE_PASSWORD" ssh root@$REMOTE_ADDRESS
