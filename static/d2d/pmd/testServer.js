M=require("ming_node");

app= M.server();
app.listen(8888)

app.get("/log",async (req,res)=>{

    console.log(req.params.p);
    res.send(M.successResult("ok"));

})