app.get("/miEnvListByPage",function (req,res) {
    let whereCase="1=1 ";
    if(req.params.name){
        whereCase=whereCase+` and name like '%${req.params.name}%'`
    }
    const sql1=` 
    select * from mi_env  where ${whereCase}  limit  ${(req.params.startPage-1)*req.params.limit},${req.params.limit}`
   const sql2= `
        select count(1) c from mi_env  where ${whereCase};
    `;
    M.doSql(sql1).then((d) => {
        let rows = d;
        M.doSql(sql2).then((d) => {
            let total = d[0].c; 
            res.send({rows ,total});
        });
    })
});


app.post("/miEnvAdd",async function (req,res) {
    let miEnv=req.params;
    delete miEnv.id; 
    M.doSql(M.Db().getInsertObjSql("mi_env",miEnv)).then(e=>  res.send("ok"))
});

app.post("/miEnvUpdate",function (req,res) {
    let miEnv=req.params;
    let sql =Db.getUpdateObjSql("mi_env",miEnv) + ";";
    M.doSql(sql).then(d=>{
        res.send("ok");
    })
});

app.get("/miEnvDelete",async function (req,res) {
    let sql=`DELETE from mi_env where id=${req.params.id};`;
    M.doSql(sql).then(d=>{
         res.send("ok");
    })
});

app.get("/miEnvDeleteAll",function (req,res) {
    let sql=`DELETE from mi_env where 1=1`
    M.doSql(sql).then(d=>{
         res.send("ok")
    })
});





