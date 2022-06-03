#!/bin/bash
cd /home/ubuntu/PICKSHARE/server
npm run build
export DATABASE_USER=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_USER --query Parameters[0].Value | sed 's/"//g')
export DATABASE_PASSWORD=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_PASSWORD --query Parameters[0].Value | sed 's/"//g')
export DATABASE_PORT=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_PORT --query Parameters[0].Value | sed 's/"//g')
export DATABASE_HOST=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_HOST --query Parameters[0].Value | sed 's/"//g')
export DATABASE_NAME=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_NAME --query Parameters[0].Value | sed 's/"//g')
export REFRESH=$(aws ssm get-parameters --region ap-northeast-2 --names REFRESH --query Parameters[0].Value | sed 's/"//g') 
export SECRET=$(aws ssm get-parameters --region ap-northeast-2 --names SECRET --query Parameters[0].Value | sed 's/"//g')
export REDIRECT_URI=$(aws ssm get-parameters --region ap-northeast-2 --names REDIRECT_URI --query Parameters[0].Value | sed 's/"//g')
export CLIENT_ID=$(aws ssm get-parameters --region ap-northeast-2 --names CLIENT_ID --query Parameters[0].Value | sed 's/"//g')
authbind --deep pm2 start dist/main.js