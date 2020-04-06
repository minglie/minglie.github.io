// M.doSql=M.Db().doSql
let Db=M.Db()

app.begin(req=>{
    console.log("app.begin",req.pureUrl,req.params)
})

app.get("/miApiListByPage",function (req,res) {
    let whereCase="1=1 ";
    if(req.params.name){
        whereCase=whereCase+` and name like '%${req.params.name}%'`
    }
    if(req.params.parent_id){
        whereCase=whereCase+` and parent_id = '${req.params.parent_id}'`
    }
    const sql1=` 
    select * from mi_api  where ${whereCase}  limit  ${(req.params.startPage-1)*req.params.limit},${req.params.limit}`
   const sql2= `
        select count(1) c from mi_api  where ${whereCase};
    `;
    M.doSql(sql1).then((d) => {
        let rows = d;
        M.doSql(sql2).then((d) => {
            let total = d[0].c; 
            res.send({rows ,total});
        });
    })
});


app.post("/miApiAdd",async function (req,res) {
    let miApi=req.params;
    delete miApi.id;
    miApi.leaf=1;
    if(!miApi.parent_id){
        miApi.parent_id=-1;
    }
    let r=await M.doSql(
        ` select (substr(max(long_code),LENGTH(max(long_code))-4,LENGTH(max(long_code)))+1) c from mi_api where parent_id=${miApi.parent_id};
        `)
     if(!r[0].c){
         r[0].c=0;
     }
     let parent_long_code_r=await M.doSql(
        `
          select long_code c from mi_api where id=${miApi.parent_id};
        `)
     let parent_long_code="";
    if(parent_long_code_r && parent_long_code_r[0]){
        parent_long_code=parent_long_code_r[0].c;
    }
    let long_code=parent_long_code+"/"+Array(6-(''+r[0].c).length+1).join(0)+ r[0].c;
    miApi.long_code=long_code;
    miApi.gmt_create=new Date().getTime();
    miApi.gmt_modified=new Date().getTime();
    let sql = Db.getInsertObjSql("mi_api",miApi) + ";";
    M.doSql(sql).then(d=>{
        M.doSql(Db.getUpdateObjSql("mi_api",{leaf:0},{id:miApi.parent_id})).then(e=>  res.send("ok"))
    })
});

app.post("/miApiUpdate",function (req,res) {
    let miApi=req.params;
    let sql =Db.getUpdateObjSql("mi_api",miApi) + ";";
    M.doSql(sql).then(d=>{
        res.send("ok");
    })
});


app.get("/miApiDelete",async function (req,res) {
    let sql=`DELETE from mi_api WHERE id in (SELECT id from mi_api WHERE long_code like (SELECT long_code || '%' from mi_api WHERE id=${req.params.id}))`
    M.doSql(sql).then(async d=>{
        let r=await M.doSql(`select count(1) c from mi_api where parent_id=${req.params.parent_id}`)
         if(!r[0].c){
           await  M.doSql(Db.getUpdateObjSql("mi_api",{leaf:1},{id:req.params.parent_id}))
         }
         res.send("ok");
    })
});


app.get("/miApiDeleteAll",function (req,res) {
    let sql=`DELETE from mi_api where 1=1`
    M.doSql(sql).then(d=>{
         res.send("ok")
    })
});

app.get("/miApiSetStatus",function (req,res) {
    let sql=`update mi_api set status='${req.params.status}' where id=${req.params.id};`
    M.doSql(sql).then(d=>{
        res.send("ok");
    })
});


M.log=function(d){
    let sql=`insert into mi_log (content) values('${d}');`
    M.doSql(sql).then(d=>{})
}



