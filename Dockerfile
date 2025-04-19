FROM node:18-alpine

WORKDIR /app

COPY package.json yarn.lock entrypoint.sh ./
RUN rm -rf node_modules
RUN yarn --frozen-lockfile --production
RUN rm -rf .next
RUN rm -rf prisma
RUN apk add --no-cache curl

EXPOSE 3000

ENTRYPOINT ["sh", "/app/entrypoint-runner.sh"]
