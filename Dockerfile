# Stage 1: Build Stage
FROM node:lts AS builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM node:lts-slim

ENV NODE_ENV=production

USER node

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --production

COPY --from=builder /usr/src/app/dist ./dist
EXPOSE 3000

CMD ["sh", "-c", "npx node-pg-migrate up && node dist/server.js"] 