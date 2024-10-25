# Use a multi-stage build to keep the final image lightweight
FROM node:20-alpine AS builder

WORKDIR /app

RUN npm install -g pnpm

# Copy the package.json and lock file and install deps
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN pnpm build

# Production stage
FROM node:20-alpine AS production

# Set the working directory for the production image
WORKDIR /app

# Copy the built application and necessary files from the builder stage
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml ./

# Install only production dependencies
RUN npm install -g pnpm prisma-kysely && pnpm install --prod --frozen-lockfile

# Expose the application port
ARG PORT
ENV PORT=${PORT}
EXPOSE ${PORT}

# Command to run the application
CMD ["sh", "-c", "pnpx prisma migrate dev && pnpm prisma db seed && node dist/main.js"]
