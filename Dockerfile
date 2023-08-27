FROM node:18-alpine AS builder

RUN mkdir /app

COPY . /app

ARG PUBLIC_POCKETBASE_URL="http://localhost:8090"

RUN cd /app && yarn install && \
echo "PUBLIC_POCKETBASE_URL="$PUBLIC_POCKETBASE_URL > /app/.env && \
  yarn run build 


FROM node:18-alpine

RUN mkdir /app

COPY --from=builder /app/build /app/build
COPY --from=builder /app/package.json /app/yarn.lock /app/

RUN cd /app && \ 
  yarn install && \
  yarn cache clean

WORKDIR /app

CMD ["node", "build/index.js"]