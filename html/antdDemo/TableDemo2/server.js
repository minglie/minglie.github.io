app.get("/listByPage",function (req,res) {
    const empList=[
        {
            id: 1,
            name1: '天下1',
            age: 18,
        },
        {
            id: 2,
            name1: '晓晓2',
            age: 22,
        },
        {
            id: 3,
            name1: '天下3',
            age: 18,
        },
        {
            id: 4,
            name1: '晓晓4',
            age: 22,
        },
        {
            id: 5,
            name1: '天下5',
            age: 18,
        },
        {
            id: 6,
            name1: '晓晓6',
            age: 22,
        },
        {
            id: 7,
            name1: '天下7',
            age: 18,
        },
        {
            id: 8,
            name1: '晓晓8',
            age: 22,
        },
        {
            id: 9,
            name1: '天下9',
            age: 18,
        },
        {
            id: 10,
            name1: '晓晓10',
            age: 22,
        },
        {
            id: 11,
            name1: '天下11',
            age: 18,
        },
        {
            id: 12,
            name1: '晓晓12',
            age: 22,
        },
        {
            id: 13,
            name1: '天下13',
            age: 18,
        },
        {
            id: 14,
            name1: '晓晓14',
            age: 22,
        },
        {
            id: 15,
            name1: '天下15',
            age: 18,
        },
        {
            id: 16,
            name1: '晓晓16',
            age: 22,
        },
        {
            id: 17,
            name1: '天下17',
            age: 18,
        },
        {
            id: 18,
            name1: '晓晓18',
            age: 22,
        },
        {
            id: 19,
            name1: '天下19',
            age: 18,
        },
        {
            id: 20,
            name1: '晓晓20',
            age: 22,
        }
    ];
    console.log("收到参数",req.params);
    let r={};
    let  list=[];
    let startPage=req.params.startPage;
    let limit=req.params.limit;


    for (let i=(startPage-1)*limit;i<(startPage-1)*limit+limit;i++){
        list.push(empList[i])
    }

    r.rows=list;
    r.total=empList.length;
    res.send(M.result(r))
});

