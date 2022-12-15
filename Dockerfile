FROM node:alpine AS base
WORKDIR /var/www

FROM base AS dependencies
COPY package*.json ./
RUN npm install --only=production
RUN cp -R node_modules/ prod_node_modules/
RUN npm install

FROM dependencies AS test
COPY . .
RUN npm test

FROM dependencies AS build
COPY . .
RUN npm run build

FROM base AS release
COPY package.json ./
COPY --from=dependencies /var/www/prod_node_modules/ node_modules/
COPY --from=build /var/www/dist/ dist/
COPY --from=build /var/www/src/server src/server/
ENV NODE_ENV=production
CMD ["npm", "start"]