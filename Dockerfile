
FROM node:18-alpine


WORKDIR /app

COPY package.json yarn.lock tsconfig.json .build.env ./
COPY src ./src
COPY prisma ./prisma

RUN cp .build.env .env

RUN yarn

RUN yarn build


EXPOSE 3000


CMD ["yarn", "start"] 
# CMD ["sh", "-c", "echo 'Files in /app:' && tail -f /dev/null"]
