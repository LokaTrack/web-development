#!/bin/sh

# Create .env file from environment variables at runtime
echo "Creating .env file from runtime environment variables..."

cat > /usr/share/nginx/html/.env << EOF
VITE_ACCESS_TOKEN=${VITE_ACCESS_TOKEN:-}
VITE_API_URL=${VITE_API_URL:-https://lokatrack.me/api/v1}
VITE_SOCKET_URL=${VITE_SOCKET_URL:-https://lokatrack.me}
EOF

echo ".env file created at runtime:"
cat /usr/share/nginx/html/.env

# Start nginx
exec nginx -g "daemon off;"
