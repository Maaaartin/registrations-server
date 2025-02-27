
FROM node:18-alpine


WORKDIR /app

COPY temp ./

RUN yarn
RUN cp -r ./node_modules/@prisma/engines ./prisma/client
RUN yarn build

EXPOSE 3000


CMD ["sh", "-c", "yarn start"]
