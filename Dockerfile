FROM node:18-alpine

WORKDIR /app

COPY temp ./

RUN rm -rf db
RUN rm -rf nginx
RUN yarn --frozen-lockfile
RUN yarn build
RUN rm -rf src
RUN rm -rf ./.next/cache
RUN rm -rf ./prisma/client
RUN apk add --no-cache curl

EXPOSE 3000

CMD ["sh", "-c", "yarn prisma:generate && yarn start"]
