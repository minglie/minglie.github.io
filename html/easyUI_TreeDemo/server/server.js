var M=require("ming_node");


app=M.server();

app.listener(8888);


var resData=
    {"success":true,"code":3002,"message":"操作成功","data":[{"id":362,"resName":"mingie","childrens":[{"id":1128,"resName":"minglie01","sortNum":null,"icon":"","childrens":[{"id":1129,"resName":"minglie01_01"}]}]}]};

ids=
    {"success":true,"code":3002,"message":"操作成功","data":[362,1129]};
resData=resData.data;
ids=ids.data;

//转换为easyUI所需要的格式
function convertEasyUITree(resList,resultRes,ids) {
    if(resList){
        for (let i=0;i<resList.length;i++){
            if(1){
                var r={};
                r.id=resList[i].id;
                r.text=resList[i].id+"  "+resList[i].resName;
                r.checked=false;
                r.state=null;
                if(ids.indexOf(resList[i].id)>=0)r.checked=true;
                else   r.checked=false;

                resultRes.push(r);
                r.children=[];
                convertEasyUITree(resList[i].childrens,r.children,ids)
            }
        }
    }
}



//转换为easyUI所需要的格式
function convertEasyUITree(resList,resultRes,ids) {
    if(resList){
        for (let i=0;i<resList.length;i++){
            if(1){
                var r={};
                r.id=resList[i].id;
                r.text=resList[i].id+"  "+resList[i].resName;
                r.checked=false;
                r.state=null;
                if(ids.indexOf(resList[i].id)>=0)r.checked=true;
                else   r.checked=false;

                resultRes.push(r);
                r.children=[];
                convertEasyUITree(resList[i].childrens,r.children,ids)
            }
        }
    }
}


app.get("/",function  (req,res) {
    app.dispatch("/index.html",req,res);
});






app.post("/tree_data",function  (req,res) {
    nodes=[ ];
    convertEasyUITree(resData, nodes,  ids);
    res.send(JSON.stringify(nodes));
});


