FROM node:18-alpine 

WORKDIR /app

COPY package.json yarn.lock .build.env ./
COPY src ./src
RUN cp .build.env .env

RUN yarn install --frozen-lockfile

ENTRYPOINT ["node", "src/importCsv.js"]
