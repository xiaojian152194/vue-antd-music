#!/usr/bin/expect
npm run build

set ip 39.106.44.210
set password Yzj152194

set timeout -1
spawn scp -o StrictHostKeyChecking=no  -P 22 -r dist root@$ip:/root/vue/dist
expect {
 "(yes/no)?" {
   send "yes\n"
   expect "*assword:" { send "$password\n"}
  }
  "*assword:" {
   send "$password\n"
  }
}
expect eof
