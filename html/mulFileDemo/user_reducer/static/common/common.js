M.global={};


M.global.maplist = (data) => {
    const databox = data.map((item) => {
        return Object.assign({}, item, {
            key: item.id
        })
    });
    return databox;
};



M.global.json_template=`{
    "name": "SO JSON在线",
    "url": "https://www.sojson.com",
    "address": {
        "city": "北京",
        "country": "中国"
    },
    "domain_list": [
        {
            "name": "ICP备案查询",
            "url": "https://icp.sojson.com"
        },
        {
            "name": "JSON在线解析",
            "url": "https://www.sojson.com"
        },
        {
            "name": "房贷计算器",
            "url": "https://fang.sojson.com"
        }
    ]
}`;


M.global.javascript_template=
`(req,res)=>{ 
    console.log(req.params);
    res.send("ok");
}`;

