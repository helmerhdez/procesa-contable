FROM node:23-alpine AS base


RUN apk add --no-cache libc6-compat && \
    npm install -g pnpm

WORKDIR /app


COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile


FROM base AS builder
WORKDIR /app
COPY . .


RUN pnpm run build


FROM node:23-alpine AS runner
WORKDIR /app


RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs


COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER nextjs

CMD ["npm", "start"]