#!/bin/bash

if [ -f .prod.env ]; then
  source .prod.env
else
  echo ".prod.env file not found!"
  exit 1
fi

TMP_PATH="./temp"
REPO_URL=$(node -p "require('./package.json').repository.url")
SSH_CMD="ssh -i $HOME/.ssh/digital_ocean root@$REMOTE_ADDRESS"


rm -rf "$TMP_PATH"
mkdir -p "$TMP_PATH"

git clone "$REPO_URL" "$TMP_PATH"
rm -rf "$TMP_PATH/.git"
cp .prod.env "$TMP_PATH/.env"

$SSH_CMD  << 'EOF'
  rm -rf app
EOF
scp -i $HOME/.ssh/digital_ocean -r $TMP_PATH root@$REMOTE_ADDRESS:/root/app

$SSH_CMD  << 'EOF'
  cd app
  yarn
  APP_NAME="nextjs-app"
  yarn build
  pm2 reload $APP_NAME --update-env --name "$APP_NAME" || pm2 start "yarn start" --name "$APP_NAME"
  pm2 save
EOF


