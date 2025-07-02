sh prepare.sh
COMMANDS=$(cat <<'EOF'
yarn --frozen-lockfile
yarn build
rm -rf ./.next/cache
rm -rf ./prisma/client
tar -cf dist.tar .next prisma public
EOF
)
docker run --rm -it -w /app -v ./temp/:/app/ node:20-alpine sh -c "$COMMANDS"
mv ./temp/dist.tar ./dist.tar
sh copy-file.sh dist.tar
rm -rf ./temp