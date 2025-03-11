
FROM node:18-alpine AS builder


WORKDIR /app

COPY temp ./

RUN yarn --frozen-lockfile
RUN yarn build
RUN find /app -mindepth 1 ! -name 'entrypoint.sh' ! -name 'package.json' ! -name 'yarn.lock' ! -name '.next' ! -path '/app/.next/*' ! -path '/app/prisma/*' -delete

RUN yarn --production --frozen-lockfile

EXPOSE 3000


CMD ["sh", "-c", "yarn start"]
