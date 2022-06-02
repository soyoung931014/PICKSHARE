#!/bin/bash
cd /home/ubuntu/PICKSHARE/server/dist
authbind --deep pm2 start main.js