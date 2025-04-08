
FROM node:18-alpine

WORKDIR /app

COPY temp ./

RUN rm -rf db
RUN yarn --frozen-lockfile
RUN yarn build
RUN rm -rf src
RUN apk add --no-cache curl

EXPOSE 3000

CMD sh -c 'yarn start & \
  echo "Waiting for Next.js to be reachable..."; \
  until curl -sf http://localhost:3000/api/health; do sleep 1; done; \
  echo "Next.js is up and running."; \
  wait'
