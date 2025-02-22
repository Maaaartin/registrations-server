
FROM node:18-alpine


WORKDIR /app


COPY package.json .prod.env ./


RUN cp .prod.env .env


RUN apk add --no-cache git


RUN REPO_URL=$(node -p "require('./package.json').repository.url") && \
    echo "Cloning repository: $REPO_URL" && \
    git clone --depth 1 $REPO_URL . && \
    git checkout docker \
    rm -rf .git

RUN yarn


RUN yarn build


EXPOSE 3000


CMD ["yarn", "start"]
