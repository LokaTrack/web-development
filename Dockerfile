# Use the official Bun image as the base image
FROM oven/bun:1.2.13-alpine AS base

# Set working directory
WORKDIR /app

# Copy package.json and bun.lock for dependency installation
COPY package.json bun.lock ./

# Install dependencies
RUN bun install --frozen-lockfile

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