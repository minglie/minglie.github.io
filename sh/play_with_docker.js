docker pull node:12.6.0-buster-slim
docker run -ti -p 8888:8888 --name node-1 -v $(pwd):/workspace node:12.6.0-buster-slim bash
cd ~
wget              https://raw.githubusercontent.com/minglie/ming_mockServer0/master/index.js 
wget -P ~/static  https://raw.githubusercontent.com/minglie/ming_mockServer0/master/static/index.html 
npm i ming_node
node index.js
