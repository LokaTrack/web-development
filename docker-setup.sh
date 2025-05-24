#!/bin/sh

#!/bin/sh

# Create .env file from environment variables
echo "Creating .env file from environment variables..."

cat > .env << EOF
VITE_ACCESS_TOKEN=${VITE_ACCESS_TOKEN:-}
VITE_API_URL=${VITE_API_URL:-https://lokatrack.me/api/v1}
VITE_SOCKET_URL=${VITE_SOCKET_URL:-https://lokatrack.me}
EOF

echo ".env file created:"
cat .env

# Build the application with the environment variables
echo "Building application with environment variables..."
bun run build
