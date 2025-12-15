#!/bin/bash

# Exit on any error
set -e

echo "Updating system..."
sudo apt update && sudo apt upgrade -y

echo "Installing dependencies..."
sudo apt install -y ca-certificates curl gnupg

echo "Adding Docker’s GPG key..."
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo tee /etc/apt/keyrings/docker.asc > /dev/null
sudo chmod a+r /etc/apt/keyrings/docker.asc

echo "Adding Docker repository..."
echo "deb [signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

echo "Updating package lists..."
sudo apt update

sudo apt-get install tree

echo "Installing Docker and Docker Compose..."
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

echo "Enabling and starting Docker service..."
sudo systemctl enable --now docker

echo "Adding current user to Docker group..."
sudo usermod -aG docker $USER

echo "Installation complete!"
echo "You may need to log out and log back in to apply Docker group changes."
echo "Test Docker with: docker run hello-world"

sudo apt update && sudo apt install certbot
sudo apt install python3-certbot-nginx

sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw reload
mkdir -p ./nginx/html/.well-known/acme-challenge/

mkdir app

if [ -f .env ]; then
  source .env
else
  echo ".env file not found!"
  exit 1
fi

echo "Copying prod scripts to remote /root/app..."
sshpass -p "$REMOTE_PASSWORD" ssh root@$REMOTE_ADDRESS "mkdir -p /root/app"
sshpass -p "$REMOTE_PASSWORD" rsync -azP ./prodScripts/ root@$REMOTE_ADDRESS:/root/app/
sshpass -p "$REMOTE_PASSWORD" rsync -azP ./generate-env-prod.sh root@$REMOTE_ADDRESS:/root/app/generate-env-prod.sh

echo "Generating production env file on remote..."
sshpass -p "$REMOTE_PASSWORD" ssh root@$REMOTE_ADDRESS "cd /root/app && sh ./generate-env-prod.sh"
