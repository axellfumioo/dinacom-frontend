# ---------- Dependencies ----------
FROM node:20-alpine AS deps

WORKDIR /app

# Install dependencies berdasarkan lock file
COPY package*.json ./
RUN npm ci --only=production && \
    cp -R node_modules /tmp/prod_node_modules && \
    npm ci


# ---------- Builder ----------
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependencies dari stage sebelumnya
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build Next.js dengan standalone output
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build


# ---------- Runner ----------
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3030
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy only necessary files
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3030

CMD ["node", "server.js"]
