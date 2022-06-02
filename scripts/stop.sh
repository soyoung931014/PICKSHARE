#!/bin/bash
cd /home/ubuntu/PICKSHARE/server
pm2 stop main.js 2> /dev/null || true
pm2 delete main.js 2> /dev/null || true