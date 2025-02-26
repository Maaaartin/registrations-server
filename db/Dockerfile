FROM node:18-alpine 

WORKDIR /app

COPY package.json yarn.lock ./
COPY src ./src

RUN yarn install --frozen-lockfile

CMD ["sh", "-c", "while true; do sleep 30; done"]
