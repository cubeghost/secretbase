FROM composer as php
WORKDIR /usr/src/app
COPY composer.* ./
RUN composer install

FROM node:10-alpine AS node

FROM node AS npm
WORKDIR /usr/src/app
COPY package*.json ./
RUN apk add --no-cache --virtual .gyp python make g++ inotify-tools
RUN npm install

FROM node as build
WORKDIR /usr/src/app
COPY --from=npm /usr/src/app/node_modules ./node_modules
COPY --from=php /usr/src/app/vendor ./vendor
COPY . ./

RUN chown -R node: /usr/src/app
USER node

CMD export NODE_ENV=production && npm run build