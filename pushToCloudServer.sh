#!/bin/sh
#脚本运行
echo "脚本运行"
#打包vue程序
npm run build
#上传程序到云服务器
scp -r dist root@39.106.44.210:/root/dist
echo "运行完成"

