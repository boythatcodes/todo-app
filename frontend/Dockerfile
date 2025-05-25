FROM oven/bun:latest as build

WORKDIR /app

COPY package*.json bun.lockb ./

RUN bun install --frozen-lockfile

COPY . .

RUN bun run build

FROM node:20-alpine

WORKDIR /app

COPY --from=build /app/dist ./dist

RUN npm install -g serve

EXPOSE 80

CMD ["serve", "-s", "dist", "-l", "tcp://0.0.0.0:80"]
