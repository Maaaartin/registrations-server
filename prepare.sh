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
cd "$TMP_PATH"
git checkout docker
cd ../
rm -rf "$TMP_PATH/.git"
