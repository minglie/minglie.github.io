var M=require("ming_node");


app=M.server();

app.listen(8888);


app.begin((req,res)=>{console.log(req.url,req.params)});

app.get("/",(req,res)=>{ app.dispatch("/index.html",req,res)});

app.get("/:X",(req,res)=>{ app.dispatch("/index.html",req,res)});

