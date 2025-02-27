
FROM node:18-alpine


WORKDIR /app

COPY temp ./

RUN yarn

EXPOSE 3000


CMD ["sh", "-c", "yarn generate:sql && yarn build && yarn start"]
