app.get("/listByPage",function (req,res) {
    fetch(M.database_path1, {
        method: 'GET',
        mode: 'cors'}
    ).then((r)=>{return r.json()}).then(
        (json)=>
        {
            r=json.filter((d)=>d.parent_id==req.params.parent_id||req.params.parent_id=="#").filter((d)=>d.name.indexOf(req.params.name)>-1);
            res.send(r);
        }
    ).catch((error) => {
        console.error(error)
    });
});


app.get("/listAllRoot",function (req,res) {
    fetch(M.database_path1, {
        method: 'GET',
        mode: 'cors'}
    ).then((r)=>{return r.json()}).then(
        (json)=>
        {
            r=json.filter((d)=>d.parent_id==-1);
            res.send(r);
        }
    ).catch((error) => {
        console.error(error)
    });
});