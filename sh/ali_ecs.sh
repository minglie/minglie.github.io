mkdir /usr/local/node
wget https://npm.taobao.org/mirrors/node/v6.3.1/node-v6.3.1-linux-x64.tar.gz
tar zxf node-v6.3.1-linux-x64.tar.gz 
mv node-v6.3.1-linux-x64 /usr/local/node
cd /usr/bin
ln -s /usr/local/node/node-v6.3.1-linux-x64/bin/node node
ln -s /usr/local/node/node-v6.3.1-linux-x64/bin/npm npm
cd ~
echo "
var M=require(\"ming_node\");
var app=M.server();
app.listen(8888);
app.get(\"/\",function (req,res){
   app.redirect(\"/index.html\",req,res)
})
app.post(\"/_run_\",function (req,res){
    eval(req.params.fun)
    res.send(M.result(\"ok\"))
})" > index.js
wget -P ~/static  https://raw.githubusercontent.com/minglie/ming_mockServer0/master/src/static/index.html 
npm i ming_node
node index.js
