FROM node:18-alpine 

WORKDIR /app

COPY package.json yarn.lock entrypoint.sh ./
RUN chmod +x ./entrypoint.sh
COPY src ./src

RUN yarn install --frozen-lockfile

ENTRYPOINT ["sh", "/app/entrypoint.sh"]
