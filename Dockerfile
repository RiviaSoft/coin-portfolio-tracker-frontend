# Stage 1

# FROM node:14-alpine as build-step
# RUN mkdir -p /app
# WORKDIR /app
# COPY package.json /app
# RUN npm install
# COPY . /app
# RUN npm run build --prod

# Stage 2

# FROM nginx:1.17.1-alpine

# COPY --from=build-step /app/dist/coin-portfolio-tracker /usr/share/nginx/html

# stage 1

FROM node:alpine AS my-app-build
WORKDIR /app
COPY . .
RUN npm ci && npm run build

# stage 2

FROM nginx:alpine
COPY --from=my-app-build /app/dist/coin-portfolio-tracker /usr/share/nginx/html
EXPOSE 80