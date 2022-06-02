#!/bin/bash
cd /home/ubuntu/PICKSHARE/server
authbind --deep pm2 start dist/main.js