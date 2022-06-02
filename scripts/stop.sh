#!/bin/bash
cd /home/ubuntu/PICKSHARE/server
pm2 stop main.ts 2> /dev/null || true
pm2 delete main.ts 2> /dev/null || true