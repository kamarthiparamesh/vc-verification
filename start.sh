#!/bin/bash

# Start Next.js (port 3000)
npm run app &

# Start Express/WebSocket (port 4000)
npm run ws &

# Start Nginx in foreground
nginx -g "daemon off;"
