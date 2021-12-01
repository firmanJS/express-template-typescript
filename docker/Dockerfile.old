#stage 1
FROM node:16-alpine AS builder

WORKDIR /usr/apps/express-typescript

COPY package*.json ./

RUN yarn install --production=true && yarn cache clean --all

COPY tsconfig*.json ./

COPY src src

RUN yarn build

#stage 2
FROM node:16-alpine

ENV NODE_ENV=production

RUN apk add --no-cache tini

WORKDIR /usr/apps/express-typescript

RUN chown node:node .

USER node

COPY package*.json ./

RUN yarn install --production=true && yarn cache clean --all

COPY --from=builder /usr/apps/express-typescript/lib/ lib/

EXPOSE 8000

CMD ["yarn", "start"]