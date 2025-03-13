
FROM node:18-alpine

WORKDIR /app

COPY temp ./

RUN yarn --frozen-lockfile
RUN yarn build
EXPOSE 3000


CMD ["sh", "-c", "yarn start"]
