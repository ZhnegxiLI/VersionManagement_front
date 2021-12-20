FROM node:alpine as build
WORKDIR /src
COPY package.json .
RUN npm install
# webpack build
COPY . .
RUN npm run build


FROM nginx:alpine
EXPOSE 80
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
WORKDIR /usr/share/nginx/html
COPY --from=build /src/dist .