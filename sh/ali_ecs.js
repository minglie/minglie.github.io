mkdir /usr/local/node
wget  https://nodejs.org/dist/v10.13.0/node-v10.13.0-linux-x64.tar.xz
tar -xvJf node-v10.13.0-linux-x64.tar.xz
mv node-v10.13.0-linux-x64 /usr/local/node
cd /usr/bin
ln -s /usr/local/node/node-v10.13.0-linux-x64/bin/node node
ln -s /usr/local/node/node-v10.13.0-linux-x64/bin/npm npm
cd ~
wget https://raw.githubusercontent.com/minglie/ming_mockServer0/master/index.js 
wget -P ~/static  https://raw.githubusercontent.com/minglie/ming_mockServer0/master/static/index.html 
npm i ming_node
node index.js
