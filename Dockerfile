ARG NODE_VERSION=lts-alpine

# Built Sveltkit app
FROM node:${NODE_VERSION} AS builder
ARG PUBLIC_POCKETBASE_URL=https://pocketbase.alkiviadroot.net
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN cp -f ./deployment/svelte.config.js ./svelte.config.js
RUN npm run build
RUN npm ci --prod

# Download Pocketbase
FROM alpine:3 AS downloader
ARG PB_VERSION=0.18.1
# Download Pocketbase
RUN wget https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_linux_amd64.zip \
    && unzip pocketbase_${PB_VERSION}_linux_amd64.zip \
    && chmod +x /pocketbase


# Final image
FROM node:${NODE_VERSION}
RUN apk update && apk add --no-cache supervisor

# USER node:node

# Copy Sveltkit app files
COPY --from=builder  /app/build /app/build
COPY --from=builder  /app/node_modules /app/node_modules
COPY  package.json /app

# Copy pocketbase files
COPY --from=downloader /pocketbase /usr/local/bin/pocketbase

COPY ./deployment/supervisord.conf /etc/supervisord.conf

EXPOSE 8090
EXPOSE 3000

CMD ["/usr/bin/supervisord", "-c", "/etc/supervisord.conf"]
