FROM node:18 AS builder

WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .

RUN pnpm run prisma generate
RUN pnpm run build

FROM node:18 AS production

# Set the working directory
WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml ./

RUN npm install -g pnpm && pnpm install --prod --frozen-lockfile

# Expose the application port
ARG PORT=3000
ENV PORT=${PORT}
EXPOSE ${PORT}

# Command to run the application
CMD ["node", "dist/main.js"]
