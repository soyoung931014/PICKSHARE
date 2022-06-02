#!/bin/bash
cd /home/ubuntu/PICKSHARE/server/dist
pm2 stop main.js 2> /dev/null || true
pm2 delete main.js 2> /dev/null || true