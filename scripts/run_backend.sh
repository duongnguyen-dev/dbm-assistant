#!/bin/bash
NEST_APP_DIR=apps/server
BACKEND_PORT=3003

echo "Run backend locally..."
cd ..
cd ${NEST_APP_DIR} && npm install && npm run start:dev -- --port $BACKEND_PORT