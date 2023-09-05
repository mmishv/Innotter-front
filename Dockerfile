FROM node:20-alpine AS build

WORKDIR /usr/local/app

COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.25.2-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/local/app/dist/innotter-front /usr/share/nginx/html
