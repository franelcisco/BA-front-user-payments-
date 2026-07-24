FROM node:22 AS build

RUN apt-get update -y && apt-get install -y libvips-dev

WORKDIR /app

COPY ./package.json ./
COPY ./yarn.lock ./

RUN yarn install --frozen-lockfile --ignore-engines

ENV NODE_ENV=production

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
