#!/bin/bash
cd /home/ubuntu/PICKSHARE/server
npm run build
authbind --deep pm2 start dist/main.js