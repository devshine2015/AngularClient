
# We label our stage as ‘builder’
FROM node:8.1.4-alpine as builder

RUN npm set progress=false && npm config set depth 0 && npm cache clean --force

# Copy dependency definitions
COPY package.json ./

RUN npm i && mkdir /app && cp -R ./node_modules ./app

WORKDIR /app

COPY . .

##RUN npm install enhanced-resolve@3.3.0

## Build the angular app in production mode and store the artifacts in dist folder
RUN $(npm bin)/ng build --env=prod

### STAGE 2: Setup ###


FROM nginx:1.13.3-alpine

## Copy our default nginx config
COPY nginx/default.conf /etc/nginx/conf.d/

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## From 'builder' stage copy over the artifacts in dist folder to default nginx public folder
COPY --from=builder /app/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
