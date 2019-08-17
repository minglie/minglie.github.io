
M.Db().doSql("select count(1) c from resource").catch(d=>{
    M.Db().doSql("CREATE TABLE resource (id INTEGER NOT NULL, name varchar (200) DEFAULT NULL, res_url varchar (200) DEFAULT NULL, parent_id INTEGER NOT NULL,sort_num INTEGER, PRIMARY KEY (id))")
});

app.post("/listByPage", function (req, res) {
       // console.log(req.params);
        var whereCase = "parent_id !=-1";

    if (req.params.name) {
        whereCase = whereCase + ` and name like '%${req.params.name}%'`
    }

    if (req.params.parent_id) {
            whereCase = whereCase + ` and parent_id=${req.params.parent_id}`
        }
        const sql1 = `
        select * from resource where ${whereCase};
        `;
        M.Db().doSql(sql1).then(d=>{
            let rows = d.rows;
            let total = 500000;
            res.send({rows, total});
        })
    }
);


app.post("/listAllRoot", function (req, res) {
    const sql = `
    select * from resource where parent_id=-1;
    `;
    M.Db().doSql(sql).then(d=>{
            rows = d.rows;
            res.send({rows});
    })
});


app.post("/add", function (req, res) {
    const {parent_id, res_url, name} = req.params;
    sql = `
insert into resource(parent_id,res_url,name) values
(
'${parent_id}','${res_url}', '${name}'
)
;
`;
    M.Db().doSql(sql).then(d=>{
        res.send("ok")
    })
});


app.post("/update", function (req, res) {
    sql = M.Db().getUpdateObjSql("resource", req.params, {id: req.params.id}) + ";";
    M.Db().doSql(sql)
});


//存储过程遍历数组
app.get("/delete", function (req, res) {

    console.log(req.params.ids.toString());
    ids = "(" + req.params.ids.toString() + ")";
    let sql = `
    delete from resource where id in ${ids} or parent_id in ${ids};
    `;
    M.Db().doSql(sql);
    }
 );















