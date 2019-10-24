docker pull node
docker run -ti -p 8888:8888 --name node-1 -v $(pwd):/workspace node bash
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
