#!/bin/bash
NEXT_APP_DIR=apps/client
FRONTEND_PORT=3002

echo "Run frontend locally..."
cd ..
cd ${NEXT_APP_DIR} && npm install && npm run dev -- --port $FRONTEND_PORT