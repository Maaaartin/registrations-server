
FROM node:18-alpine

WORKDIR /app

COPY temp ./

RUN rm -rf db
RUN yarn --frozen-lockfile
RUN yarn build
RUN rm -rf src
EXPOSE 3000


CMD ["sh", "-c", "yarn start"]
