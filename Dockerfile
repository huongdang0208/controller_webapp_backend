FROM node:18-alpine AS dependences
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --production --frozen-lockfile

FROM node:18-alpine AS builder
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn --frozen-lockfile

COPY . .

RUN npx prisma generate
RUN NODE_OPTIONS="--max-old-space-size=4096" yarn build

FROM node:18-alpine AS runner
WORKDIR /app

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

COPY --from=dependences /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY entrypoint.sh prisma/* ./

RUN chmod +x entrypoint.sh

EXPOSE 8000

ENTRYPOINT [ "./entrypoint.sh" ]
