#!/bin/bash
NEST_APP_DIR=apps/server

echo "Run backend locally..."
cd ..
cd ${NEST_APP_DIR} && npm install && npm run start:dev