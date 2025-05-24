# Use the official Bun image as the base image
FROM oven/bun:1.2.13-alpine AS base

# Set working directory
WORKDIR /app

# Define build arguments for environment variables
ARG VITE_ACCESS_TOKEN=""
ARG VITE_API_URL="https://lokatrack.me/api/v1"
ARG VITE_SOCKET_URL="https://lokatrack.me"

# Copy package.json and bun.lock for dependency installation
COPY package.json bun.lock ./

# Install dependencies
RUN bun install --frozen-lockfile

# Create .env file from build arguments (always create to ensure it exists)
RUN echo "VITE_ACCESS_TOKEN=${VITE_ACCESS_TOKEN}" > .env && \
    echo "VITE_API_URL=${VITE_API_URL}" >> .env && \
    echo "VITE_SOCKET_URL=${VITE_SOCKET_URL}" >> .env

# Copy the rest of the application code
COPY . .

# Build the application for production
RUN bun run build

# Production stage - use nginx to serve the built files
FROM nginx:alpine AS production

# Copy built files from the build stage to nginx html directory
COPY --from=base /app/dist /usr/share/nginx/html

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]