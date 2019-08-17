
M.host="http://localhost:8888";


app.post("/listByPage",function (req,res) {

    console.log(req.params);
    var whereCase="parent_id !=-1";
if(req.params.name){
    whereCase=whereCase+` and name like '%${req.params.name}%'`
}

if(req.params.parent_id){
    whereCase=whereCase+` and parent_id=${req.params.parent_id}`
}

const sql=`
select * from resource where ${whereCase} limit ${(req.params.page-1)*req.params.rows},${req.params.rows};
select count(1) c from resource where ${whereCase};
`;
M.doSql(sql,(d)=>{
                    rows=d.data[0];
                    total=d.data[1][0].c;
res.send({rows,total});
})

});


app.post("/listAllRoot",function (req,res) {
    const sql=`
    select * from resource where parent_id=-1;
    `;
M.doSql(sql,(d)=>{
                    rows=d.data[0];
res.send({rows});
})

});



app.post("/add",function (req,res) {
const {parent_id,res_url,name}=req.params;
sql=`
insert into resource(parent_id,res_url,name) values
(
'${parent_id}','${res_url}', '${name}'
)
;
`;


console.log(sql);

M.doSql(sql,(d)=>{
                    r=d.data[0];
                    res.send(M.result("添加成功"));

                })
});




app.post("/update",function (req,res) {
sql=M.Db().getUpdateObjSql("resource",req.params,{id:req.params.id})+";";
M.doSql(sql,(d)=>{
                    r=d.data[0];
                    res.send(r);
                })
});



//存储过程遍历数组
  app.get("/delete",function (req,res) {

    console.log(req.params.ids.toString());
    ids="("+req.params.ids.toString()+")";

    let sql=`
    delete from resource where id in ${ids} or parent_id in ${ids};
    `;

    console.log(sql);

M.doSql(sql,(d)=>{
                    r=d.data[0];
                    res.send(r);
                })

});






app.get("/getChildsById",function (req,res) {

    Context.resource.getChildsById(55).then(d=>res.send(d))

});
















