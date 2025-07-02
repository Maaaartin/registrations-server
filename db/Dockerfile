FROM node:20-alpine 

WORKDIR /app

COPY package.json yarn.lock entrypoint.sh ./
RUN chmod +x ./entrypoint.sh
COPY src ./src

RUN yarn install --frozen-lockfile
RUN apk add --no-cache curl

ENTRYPOINT ["sh", "/app/entrypoint.sh"]
