#!/bin/bash
set -e

ENV_FILE=".env.prod"

# Generate strong random password (32 chars, URL-safe)
POSTGRES_PASSWORD="$(openssl rand -base64 48 | tr -d '=+/')"

cat > "$ENV_FILE" <<EOF
POSTGRES_USER=admin
POSTGRES_PASSWORD=$POSTGRES_PASSWORD
POSTGRES_DB=registrations_cz
EOF

chmod 600 "$ENV_FILE"

echo "✅ Generated $ENV_FILE"
echo
echo "POSTGRES_USER=admin"
echo "POSTGRES_PASSWORD=$POSTGRES_PASSWORD"
echo "POSTGRES_DB=registrations_cz"
echo
echo "⚠️  Store this password securely. The file is NOT copied anywhere."
