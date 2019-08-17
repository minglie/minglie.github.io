var M=require("ming_node");


app=M.server();

app.listener(8888);




app.get("/index",function (req,res) {

   res.send(M.result("登录成功"));

})


app.get("/addItem.do",function (req,res) {

    console.log("收到参数",req.param);
    console.log("----------------------------------------");
    console.log("\n")
    res.send(M.result({"请求参数":req.param,m:"添加商品"}));

})

app.get("/removeItem.do",function (req,res) {

    console.log("收到参数",req.param);
    console.log("----------------------------------------");
    console.log("\n")
    res.send(M.result({"请求参数":req.param,m:"删除商品"}));

})

app.get("/pay.do",function (req,res) {

    console.log("付款",req.param);
    console.log("----------------------------------------");
    console.log("\n")
    res.send(M.result({"请求参数":req.param,m:"付款"}));

})



