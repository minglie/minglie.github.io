+async function () {
    //"https://minglie.github.io/js/ming_node.js
	M = eval("/**\n" +
                " * File : index.js\n" +
                " * By : Minglie\n" +
                " * QQ: 934031452\n" +
                " * Date :2019.9.28\n" +
                " * version : 1.5.1\n" +
                " */\n" +
                "var http=require('http');\n" +
                "var https=require('https');\n" +
                "var url_module=require('url');\n" +
                "var querystring=require('querystring');\n" +
                "var fs=require('fs');\n" +
                "var path=require('path');\n" +
                "var child_process = require('child_process');\n" +
                "var EventEmitter = require('events').EventEmitter;\n" +
                "var event = new EventEmitter();\n" +
                "var privateObj={};//本文件私有对象\n" +
                "var M={};\n" +
                "M.sessions={}//保存session\n" +
                "M.con_display_status_enable=false;//是否显示响应状态码\n" +
                "M.cookie=\"JSESSIONID=\"+\"6E202D5A022EBD62705AA436EC54963B\";//请求携带的cook\n" +
                "M.reqComQueryparams=undefined;//请求的公共的查询参数\n" +
                "M.reqComHeaders=undefined;//请求的公共请求头\n" +
                "M.host=\"http://127.0.0.1:7001\";\n" +
                "M.log_file_enable=true;//将日志输出到文件\n" +
                "M.log_console_enable=true;//将日志输出到控制台\n" +
                "M.log_path=\"./M.log\";//输出日志文件路径\n" +
                "M.map_path=\"./M_map.json\";//全局作用域路径\n" +
                "M.database_path=\"./M_database.json\";//文件型数据库路径\n" +
                "M.log_display_time=true;//日志是否显示当前时间\n" +
                "/**\n" +
                " * ----------------------客户端START--------------------------------------------\n" +
                " */\n" +
                "//解析对象或函数返回值\n" +
                "privateObj.getFunctionOrObjResult=function (objOrFunc,obj) {\n" +
                "    let c1;\n" +
                "    if(!objOrFunc){\n" +
                "        return obj;\n" +
                "    }\n" +
                "    if(typeof objOrFunc==\"function\"){\n" +
                "        c1=objOrFunc();\n" +
                "    }else {\n" +
                "        c1=objOrFunc;\n" +
                "    }\n" +
                "    return Object.assign(c1,obj);\n" +
                "}\n" +
                "\n" +
                "//将对象追加到url上\n" +
                "privateObj.appendDataToUrl=function (url,data) {\n" +
                "    var getData=\"\";\n" +
                "    if(data){\n" +
                "        getData=querystring.stringify(data);\n" +
                "        //url携带参数了\n" +
                "        if(url.indexOf(\"?\")>0){\n" +
                "            getData=\"&\"+getData;\n" +
                "        }else{\n" +
                "            getData=\"?\"+getData;\n" +
                "        }\n" +
                "    }\n" +
                "    let r=url+getData;\n" +
                "    return r;\n" +
                "}\n" +
                "\n" +
                "\n" +
                "M.get=function(url,callback,data,headers) {\n" +
                "    if(headers){}\n" +
                "    else {\n" +
                "        headers = {\n" +
                "            'Content-Type': 'application/json',\n" +
                "            'Cookie': M.cookie\n" +
                "        }\n" +
                "    }\n" +
                "    var getData=\"\";\n" +
                "    if(data || M.reqComQueryparams){\n" +
                "        data=privateObj.getFunctionOrObjResult(M.reqComQueryparams,data)\n" +
                "        getData=querystring.stringify(data);\n" +
                "        //url携带参数了\n" +
                "        if(url.indexOf(\"?\")>0){\n" +
                "            getData=\"&\"+getData;\n" +
                "        }else{\n" +
                "            getData=\"?\"+getData;\n" +
                "        }\n" +
                "    }\n" +
                "    //合并请求头\n" +
                "    headers=privateObj.getFunctionOrObjResult(M.reqComHeaders,headers)\n" +
                "    var html='';\n" +
                "    var urlObj=url_module.parse(url)\n" +
                "    var options={\n" +
                "        hostname:urlObj.hostname,\n" +
                "        port:urlObj.port,\n" +
                "        path:urlObj.path+getData,\n" +
                "        method:'GET',\n" +
                "            headers:headers\n" +
                "    }\n" +
                "    let reqHttp=http;\n" +
                "    if(url.startsWith(\"https\")){\n" +
                "        reqHttp=https;\n" +
                "    }\n" +
                "    var req=reqHttp.request(options,function(res){\n" +
                "        if(M.con_display_status_enable)console.log('STATUS:'+res.statusCode);\n" +
                "        if(global.debug && res.statusCode !=200){\n" +
                "            while(1){\n" +
                "                M.sleep(1000);\n" +
                "                console.log('STATUS:'+res.statusCode);\n" +
                "                console.log(\"--------ERROR:\"+res.req.path+\"-------------\");\n" +
                "            }\n" +
                "        }\n" +
                "        //console.log('HEADERS:'+JSON.stringify(res.headers));\n" +
                "        res.setEncoding('utf-8');\n" +
                "        res.on('data',function(chunk){\n" +
                "            html+=chunk;\n" +
                "        });\n" +
                "        res.on('end',function(){\n" +
                "            callback(html,res);\n" +
                "        });\n" +
                "    });\n" +
                "    req.on('error',function(err){\n" +
                "        console.error(err);\n" +
                "\n" +
                "    });\n" +
                "    req.end();\n" +
                "}\n" +
                "\n" +
                "M.post=function(url,callback,data,headers) {\n" +
                "    url=privateObj.appendDataToUrl(url,M.reqComQueryparams);\n" +
                "    var html='';\n" +
                "    var urlObj=url_module.parse(url)\n" +
                "    //发送 http Post 请求\n" +
                "    var postData=querystring.stringify(data);\n" +
                "\n" +
                "    if(headers){\n" +
                "        //console.log(headers);\n" +
                "        if(headers[\"Content-Type\"]==\"application/json\"){\n" +
                "            postData=JSON.stringify(data);\n" +
                "        }\n" +
                "    }\n" +
                "    else {\n" +
                "        headers = {\n" +
                "            'Content-Type':'application/x-www-form-urlencoded; ' +\n" +
                "            'charset=UTF-8',\n" +
                "            'Cookie': M.cookie,\n" +
                "            'Content-Length':Buffer.byteLength(postData)\n" +
                "        }\n" +
                "    }\n" +
                "    //合并请求头\n" +
                "    headers=privateObj.getFunctionOrObjResult(M.reqComHeaders,headers)\n" +
                "\n" +
                "    var options={\n" +
                "        hostname:urlObj.hostname,\n" +
                "        port:urlObj.port,\n" +
                "        path:urlObj.path,\n" +
                "        method:'POST',\n" +
                "        headers:headers\n" +
                "    }\n" +
                "    let reqHttp=http;\n" +
                "    if(url.startsWith(\"https\")){\n" +
                "        reqHttp=https;\n" +
                "    }\n" +
                "    var req=reqHttp.request(options, function(res) {\n" +
                "        if(M.con_display_status_enable)console.log('STATUS:'+res.statusCode);\n" +
                "        if(global.debug && res.statusCode !=200){\n" +
                "            while(1){\n" +
                "                M.sleep(1000);\n" +
                "                console.log('STATUS:'+res.statusCode);\n" +
                "                console.log(\"--------ERROR:\"+res.req.path+\"-------------\");\n" +
                "            }\n" +
                "        }\n" +
                "        // console.log('headers:',JSON.stringify(res.headers));\n" +
                "        res.setEncoding('utf-8');\n" +
                "        res.on('data',function(chunk){\n" +
                "            html+=chunk;\n" +
                "        });\n" +
                "        res.on('end',function(){\n" +
                "            callback(html,res);\n" +
                "        });\n" +
                "    });\n" +
                "\n" +
                "    req.on('error',function(err){\n" +
                "        console.error(err);\n" +
                "    });\n" +
                "    req.write(postData);\n" +
                "    req.end();\n" +
                "\n" +
                "}\n" +
                "\n" +
                "\n" +
                "M.postJson=function(url,callback,data,headers) {\n" +
                "    url=privateObj.appendDataToUrl(url,M.reqComQueryparams);\n" +
                "    var html='';\n" +
                "    var urlObj=url_module.parse(url)\n" +
                "    //发送 http Post 请求\n" +
                "    var postData=JSON.stringify(data);\n" +
                "    if(!headers){\n" +
                "        headers = {\n" +
                "            'Content-Type':'application/json; ' +\n" +
                "            'charset=UTF-8',\n" +
                "            'Cookie': M.cookie\n" +
                "        }\n" +
                "    }\n" +
                "    //合并请求头\n" +
                "    headers=privateObj.getFunctionOrObjResult(M.reqComHeaders,headers)\n" +
                "    var options={\n" +
                "        hostname:urlObj.hostname,\n" +
                "        port:urlObj.port,\n" +
                "        path:urlObj.path,\n" +
                "        method:'POST',\n" +
                "        headers:headers\n" +
                "    }\n" +
                "\n" +
                "    var req=http.request(options, function(res) {\n" +
                "        if(M.con_display_status_enable)console.log('STATUS:'+res.statusCode);\n" +
                "        if(global.debug && res.statusCode !=200){\n" +
                "            while(1){\n" +
                "                M.sleep(1000);\n" +
                "                console.log('STATUS:'+res.statusCode);\n" +
                "                console.log(\"--------ERROR:\"+res.req.path+\"-------------\");\n" +
                "            }\n" +
                "        }\n" +
                "        // console.log('headers:',JSON.stringify(res.headers));\n" +
                "        res.setEncoding('utf-8');\n" +
                "        res.on('data',function(chunk){\n" +
                "            html+=chunk;\n" +
                "        });\n" +
                "        res.on('end',function(){\n" +
                "            callback(html,res);\n" +
                "        });\n" +
                "    });\n" +
                "\n" +
                "    req.on('error',function(err){\n" +
                "        console.error(err);\n" +
                "    });\n" +
                "    req.write(postData);\n" +
                "    req.end();\n" +
                "}\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "M.getHttps= function(url,callback,data){\n" +
                "    var getData=\"\";\n" +
                "    if(data){\n" +
                "        getData=querystring.stringify(data);\n" +
                "        //url携带参数了\n" +
                "        if(url.indexOf(\"?\")>0){\n" +
                "            getData=\"&\"+getData;\n" +
                "        }else{\n" +
                "            getData=\"?\"+getData;\n" +
                "        }\n" +
                "    }\n" +
                "    https.get(url+getData, function (res) {\n" +
                "        var datas = [];\n" +
                "        var size = 0;\n" +
                "        res.on('data', function (data) {\n" +
                "            datas.push(data);\n" +
                "            size += data.length;\n" +
                "        });\n" +
                "        res.on(\"end\", function () {\n" +
                "            var buff = Buffer.concat(datas, size);\n" +
                "            var result = buff.toString();\n" +
                "            callback(result,res);\n" +
                "        });\n" +
                "    }).on(\"error\", function (err) {\n" +
                "        console.log(err.stack)\n" +
                "    });\n" +
                "}\n" +
                "\n" +
                "\n" +
                "M.require=function(url){\n" +
                "        let ht=\"http\";\n" +
                "        if(url.startsWith(\"https\")){\n" +
                "            ht=\"https\";\n" +
                "        }\n" +
                "        let promise=new Promise(function (reslove, reject) {\n" +
                "            require(ht).get(url,function(req,res){\n" +
                "                var d='';\n" +
                "                req.on('data',(data)=>{d+=data;});\n" +
                "                req.on('end',()=>{\n" +
                "                    let r=\"\";\n" +
                "                    try{\n" +
                "                        r=JSON.parse(d)\n" +
                "                    }catch(e){\n" +
                "                        try{\n" +
                "                            r=eval(d); \n" +
                "                        }catch(e1){\n" +
                "                            r=d;\n" +
                "                        } \n" +
                "                    }\n" +
                "                    reslove(r);\n" +
                "                });\n" +
                "                req.on('error',(e)=>reject(e.message));\n" +
                "    })});\n" +
                "    return promise;\n" +
                "}\n" +
                "\n" +
                "/**\n" +
                " *下载图片\n" +
                " */\n" +
                "M.download=function (url,file,callback) {\n" +
                "    var func=http;\n" +
                "    if(url.indexOf(\"https\")>=0){\n" +
                "        func=https;\n" +
                "    }\n" +
                "    func.get(url, function (res) {\n" +
                "        res.setEncoding('binary');//转成二进制\n" +
                "        var content = '';\n" +
                "        res.on('data', function (data) {\n" +
                "            content+=data;\n" +
                "        }).on('end', function () {\n" +
                "            if(callback)callback();\n" +
                "            fs.writeFile(file,content,'binary', function (err) {\n" +
                "                if (err) throw err;\n" +
                "            });\n" +
                "        });\n" +
                "    });\n" +
                "}\n" +
                "/**\n" +
                " *下载所有图片\n" +
                " */\n" +
                "M.downloadAllImg=function(url,file,callback){\n" +
                "    var urlObj=url_module.parse(url)\n" +
                "    var options={\n" +
                "        hostname:urlObj.hostname,\n" +
                "    }\n" +
                "    var func=http;\n" +
                "    if(url.indexOf(\"https\")>=0){\n" +
                "        func=https;\n" +
                "    }\n" +
                "    var req = func.request(options, function (res) {\n" +
                "        res.on('data', function (data) {\n" +
                "            //Buffer\n" +
                "            var string =  data.toString() ;\n" +
                "            var rule = /https?:\\/\\/.[^\"]+\\.(png|jpg|gif|jpeg)/gi;\n" +
                "            var ary = string.match(rule);    //拿到所有jpg结尾的链接集合\n" +
                "            if(callback)callback(ary);\n" +
                "            var x = 0;\n" +
                "            for(var i in ary) {\n" +
                "                M.download(ary[i],file+(x++)+ ary[i].substr(ary[i].lastIndexOf(\".\")));\n" +
                "            }\n" +
                "        });\n" +
                "    });\n" +
                "    req.end();\n" +
                "}\n" +
                "\n" +
                "/**\n" +
                " *打印结果前钩子\n" +
                " */\n" +
                "M.beforeLogData=function (res,desc) {\n" +
                "    console.log(\"-----\"+desc+\"-----\"+res.req.path+\"-------------\");\n" +
                "}\n" +
                "\n" +
                "\n" +
                "/**\n" +
                " *打印结果后钩子\n" +
                " */\n" +
                "M.afterLogData=function () {\n" +
                "\n" +
                "    console.log(\"--END\")\n" +
                "}\n" +
                "\n" +
                "/**\n" +
                " *简化get请求\n" +
                " */\n" +
                "M.get0=function(url,data){\n" +
                "    if(Array.isArray(url)){\n" +
                "        for(let i=0;i<url.length;i++){\n" +
                "            M.get(\n" +
                "                M.host+url[i],\n" +
                "                function (data,res) {\n" +
                "                    console.log(\"---------\"+res.req.path+\"------------\");\n" +
                "                    console.log(data);\n" +
                "                },data\n" +
                "            );\n" +
                "        }\n" +
                "    }else{\n" +
                "        M.get(\n" +
                "            M.host+url,\n" +
                "            function (data) {\n" +
                "                console.log(data);\n" +
                "            },data\n" +
                "        );\n" +
                "    }\n" +
                "\n" +
                "}\n" +
                "\n" +
                "/**\n" +
                " *简化post请求\n" +
                " */\n" +
                "M.post0=function(url,data){\n" +
                "    M.post(\n" +
                "        M.host+url,\n" +
                "        function (data) {\n" +
                "            console.log(data);\n" +
                "        },data\n" +
                "    );\n" +
                "}\n" +
                "\n" +
                "M.postJson0=function(url,data){\n" +
                "    M.postJson(\n" +
                "        M.host+url,\n" +
                "        function (data) {\n" +
                "            console.log(data);\n" +
                "        },data\n" +
                "    );\n" +
                "}\n" +
                "\n" +
                "M.template=function(str){\n" +
                "    return eval(\"`\"+str+\"`\");\n" +
                "}\n" +
                "\n" +
                "\n" +
                "\n" +
                "/**\n" +
                " * ----------------------客户端END--------------------------------------------\n" +
                " */\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "\n" +
                "/**\n" +
                " * ----------------------数据持久化读写START--------------------------------------------\n" +
                " */\n" +
                "\n" +
                "/**\n" +
                " *递归创建文件夹\n" +
                " */\n" +
                "M.mkdir=function(dirpath, dirname) {\n" +
                "    //判断是否是第一次调用\n" +
                "    if (typeof dirname === \"undefined\") {\n" +
                "\n" +
                "        if(dirpath.indexOf(\".\")>0){\n" +
                "            dirpath=path.dirname(dirpath);\n" +
                "        }\n" +
                "        if (fs.existsSync(dirpath)) {\n" +
                "            return;\n" +
                "        } else {\n" +
                "            M.mkdir(dirpath, path.dirname(dirpath));\n" +
                "        }\n" +
                "    } else {\n" +
                "        //判断第二个参数是否正常，避免调用时传入错误参数\n" +
                "        if (dirname !== path.dirname(dirpath)) {\n" +
                "            M.mkdir(dirpath);\n" +
                "            return;\n" +
                "        }\n" +
                "        if (fs.existsSync(dirname)) {\n" +
                "            fs.mkdirSync(dirpath)\n" +
                "        } else {\n" +
                "            M.mkdir(dirname, path.dirname(dirname));\n" +
                "            fs.mkdirSync(dirpath);\n" +
                "        }\n" +
                "    }\n" +
                "}\n" +
                "/**\n" +
                " *文件夹拷贝\n" +
                " */\n" +
                "M.copyDir=function(src,dst){\n" +
                "    let paths = fs.readdirSync(src); //同步读取当前目录\n" +
                "    paths.forEach(function(path){\n" +
                "        var _src=src+'/'+path;\n" +
                "        var _dst=dst+'/'+path;\n" +
                "        fs.stat(_src,function(err,stats){  //stats  该对象 包含文件属性\n" +
                "            if(err)throw err;\n" +
                "            if(stats.isFile()){ //如果是个文件则拷贝\n" +
                "                let  readable=fs.createReadStream(_src);//创建读取流\n" +
                "                let  writable=fs.createWriteStream(_dst);//创建写入流\n" +
                "                readable.pipe(writable);\n" +
                "            }else if(stats.isDirectory()){ //是目录则 递归\n" +
                "                privateObj.checkDirectory(_src,_dst,M.copyDir);\n" +
                "            }\n" +
                "        });\n" +
                "    });\n" +
                "}\n" +
                "\n" +
                "privateObj.checkDirectory=function(src,dst,callback){\n" +
                "    fs.access(dst, fs.constants.F_OK, (err) => {\n" +
                "        if(err){\n" +
                "            fs.mkdirSync(dst);\n" +
                "            callback(src,dst);\n" +
                "        }else{\n" +
                "            callback(src,dst);\n" +
                "        }\n" +
                "    });\n" +
                "};\n" +
                "\n" +
                "M.readFile=function(file){\n" +
                "    if(fs.existsSync(file)){\n" +
                "        return fs.readFileSync(file,\"utf-8\");\n" +
                "    }else {\n" +
                "        return;\n" +
                "    }\n" +
                "}\n" +
                "M.writeFile=function(file,str){\n" +
                "    fs.writeFileSync(file, str);\n" +
                "}\n" +
                "M.appendFile=function(file,str){\n" +
                "    fs.appendFileSync(file, str);\n" +
                "}\n" +
                "/**\n" +
                "  文件型数据库第一层封装\n" +
                " */\n" +
                "M.getObjByFile=function(file){\n" +
                "    data=M.readFile(file)||\"[]\"\n" +
                "    var obj=JSON.parse(data.toString());\n" +
                "    return obj;\n" +
                "}\n" +
                "M.writeObjToFile=function(file,obj){\n" +
                "    M.writeFile(file, JSON.stringify(obj));\n" +
                "}\n" +
                "\n" +
                "M.addObjToFile=function(file,obj){\n" +
                "    try {\n" +
                "        var d=M.getObjByFile(file);\n" +
                "        M.writeObjToFile(file,[...d,obj]);\n" +
                "    }catch (e) {\n" +
                "        M.writeObjToFile(file,[obj]);\n" +
                "    }\n" +
                "}\n" +
                "M.deleteObjByIdFile=function(file,id){\n" +
                "    let ids=[];\n" +
                "    if(!Array.isArray(id)){\n" +
                "        ids.push(id)\n" +
                "    }else {\n" +
                "        ids=id;\n" +
                "    }\n" +
                "    var d=M.getObjByFile(file);\n" +
                "    var d1=M.getObjByFile(file);\n" +
                "    let d_num=0;\n" +
                "    for(let i=0;i<d1.length;i++){\n" +
                "        if(ids.indexOf(d1[i].id)>=0){\n" +
                "            d.splice(i-d_num,1);\n" +
                "            d_num++;\n" +
                "            if(ids.length==1)break;\n" +
                "        }\n" +
                "    }\n" +
                "    M.writeObjToFile(file,d);\n" +
                "}\n" +
                "\n" +
                "M.deleteObjByPropFile=function(file,o){\n" +
                "    let o_key=Object.keys(o)[0];\n" +
                "    let o_val=o[o_key]\n" +
                "    var d=M.getObjByFile(file);\n" +
                "    var d1=M.getObjByFile(file);\n" +
                "    let d_num=0;\n" +
                "    for(let i=0;i<d1.length;i++){\n" +
                "        if(d1[i][o_key]==o_val){\n" +
                "            d.splice(i-d_num,1);\n" +
                "            d_num++;\n" +
                "        }\n" +
                "    }\n" +
                "    M.writeObjToFile(file,d);\n" +
                "}\n" +
                "\n" +
                "M.updateObjByIdFile=function(file,obj){\n" +
                "    var d=M.getObjByFile(file);\n" +
                "    for(let i=0;i<d.length;i++){\n" +
                "        if(d[i].id==obj.id){\n" +
                "            d.splice(i,1,obj);\n" +
                "            break;\n" +
                "        }\n" +
                "    }\n" +
                "    M.writeObjToFile(file,d);\n" +
                "}\n" +
                "M.getObjByIdFile=function(file,id){\n" +
                "    var d=M.getObjByFile(file);\n" +
                "    for(let i=0;i<d.length;i++){\n" +
                "        if(d[i].id==id){\n" +
                "           return d[i];\n" +
                "        }\n" +
                "    }\n" +
                "}\n" +
                "M.listAllObjByPropFile=function(file,o){\n" +
                "    let r_list=[];\n" +
                "    let o_key=Object.keys(o)[0];\n" +
                "    let o_val=o[o_key]\n" +
                "    var d=M.getObjByFile(file);\n" +
                "    for(let i=0;i<d.length;i++){\n" +
                "        if(d[i][o_key]==o_val){\n" +
                "            r_list.push(d[i]);\n" +
                "        }\n" +
                "    }\n" +
                "    return r_list;\n" +
                "}\n" +
                "/**\n" +
                " * 文件型数据库第二层封装\n" +
                " */\n" +
                "M.add=function (obj) {\n" +
                "    obj.id=M.randomStr();\n" +
                "    M.addObjToFile(M.database_path,obj);\n" +
                "    return obj;\n" +
                "}\n" +
                "M.update=function (obj) {\n" +
                "    M.updateObjByIdFile(M.database_path,obj);\n" +
                "}\n" +
                "M.deleteById=function (id) {\n" +
                "    M.deleteObjByIdFile(M.database_path,id);\n" +
                "}\n" +
                "M.deleteAll=function (o) {\n" +
                "    if(o){\n" +
                "        M.deleteObjByPropFile(M.database_path,o);\n" +
                "    }else {\n" +
                "        M.writeObjToFile(M.database_path,[]);\n" +
                "    }\n" +
                "}\n" +
                "M.deleteByProp=function (o) {\n" +
                "    M.deleteObjByPropFile(M.database_path,o);\n" +
                "}\n" +
                "M.getById=function (id) {\n" +
                "     return M.getObjByIdFile(M.database_path,id);\n" +
                "}\n" +
                "M.listAll=function (o) {\n" +
                "    if(o){\n" +
                "        return M.listAllObjByPropFile(M.database_path,o);\n" +
                "    }else {\n" +
                "        return M.getObjByFile(M.database_path);\n" +
                "    }\n" +
                "}\n" +
                "M.listByProp=function (o) {\n" +
                "    return M.listAllObjByPropFile(M.database_path,o);\n" +
                "}\n" +
                "M.listByPage=function (startPage,limit,caseObj) {\n" +
                "    if(startPage<=0)startPage=1;\n" +
                "    let rows;\n" +
                "    if(caseObj){\n" +
                "        rows=M.listByProp(caseObj);\n" +
                "    }else {\n" +
                "        rows= M.listAll();\n" +
                "    }\n" +
                "    let total=rows.length;\n" +
                "    rows=rows.splice((startPage-1)*limit,limit)\n" +
                "    return {rows,total}\n" +
                "}\n" +
                "/**\n" +
                " * 全局作用域\n" +
                " * @param k\n" +
                " * @param v\n" +
                " */\n" +
                "M.setAttribute=function (k,v) {\n" +
                "    let a={}\n" +
                "    a[k]=v;\n" +
                "    a=JSON.stringify(a)\n" +
                "    a=JSON.parse(a);\n" +
                "    let preObj;\n" +
                "    try{\n" +
                "        preObj=M.getObjByFile(M.map_path);\n" +
                "        if(Array.isArray(preObj))preObj={};\n" +
                "    }catch(e){\n" +
                "        preObj={};\n" +
                "    }\n" +
                "\n" +
                "    M.writeObjToFile(M.map_path,Object.assign(preObj,a));\n" +
                "}\n" +
                "\n" +
                "M.getAttribute=function (k) {\n" +
                "    return M.getObjByFile(M.map_path)[k];\n" +
                "}\n" +
                "/**\n" +
                " *逐行读取文件\n" +
                " */\n" +
                "M.readLine=function(file, callback) {\n" +
                "    var remaining = '';\n" +
                "    var input = fs.createReadStream(file);\n" +
                "    input.on('data', function(data) {\n" +
                "        remaining += data;\n" +
                "        var index = remaining.indexOf('\\n');\n" +
                "        while (index > -1) {\n" +
                "            var line = remaining.substring(0, index);\n" +
                "            remaining = remaining.substring(index + 1);\n" +
                "            callback(line);\n" +
                "            index = remaining.indexOf('\\n');\n" +
                "        }\n" +
                "    });\n" +
                "    input.on('end', function() {\n" +
                "        if (remaining.length > 0) {\n" +
                "            callback(remaining);\n" +
                "        }\n" +
                "    });\n" +
                "}\n" +
                "\n" +
                "\n" +
                "M.readCsvLine=function(file,callback){\n" +
                "    M.readLine(file,function (line) {\n" +
                "        callback(line.replace(\"\\r\",\"\").split(/(?<!\\\"[^,]+),(?![^,]+\\\")/));\n" +
                "    })\n" +
                "}\n" +
                "\n" +
                "\n" +
                "\n" +
                "M.log=function(...params){\n" +
                "    if(Array.isArray(params[0]) ||typeof params[0] == 'object' ){\n" +
                "        params=[JSON.stringify(params[0])]\n" +
                "    }\n" +
                "    if(M.log_file_enable || M.log_console_enable){\n" +
                "        let r=\"\";\n" +
                "        if(M.log_display_time){\n" +
                "            r=r+new Date().toLocaleString()+\" \";\n" +
                "        }\n" +
                "        for (i in params){\n" +
                "            r=r+params[i]+\" \";\n" +
                "        }\n" +
                "        if(M.log_console_enable)console.log(r);\n" +
                "        r=r+\"\\n\";\n" +
                "        if(M.log_file_enable)M.appendFile(M.log_path,r);\n" +
                "    }\n" +
                "}\n" +
                "\n" +
                "/**\n" +
                " * ----------------------Sql CRUD  START-------------------------------------------\n" +
                " */\n" +
                "M.getInsertObjSql=function(tableName,obj){\n" +
                "    var fields=\"(\";\n" +
                "    var values=\"(\";\n" +
                "    for(let field in obj){\n" +
                "        fields+=field+\",\";\n" +
                "        values+=`'${obj[field]}'`+\",\";\n" +
                "    }\n" +
                "    fields=fields.substr(0,fields.lastIndexOf(\",\"));\n" +
                "    values=values.substr(0,values.lastIndexOf(\",\"));\n" +
                "    fields+=\")\";\n" +
                "    values+=\")\";\n" +
                "    let sql = \"insert into \"+tableName+fields+\" values \"+values;\n" +
                "    return sql;\n" +
                "}\n" +
                "\n" +
                "M.getDeleteObjSql=function(tableName,obj){\n" +
                "    var fields=[];\n" +
                "    for(let field in obj){\n" +
                "        fields.push(field);\n" +
                "    }\n" +
                "    let sql=`delete from ${tableName} where ${fields.map(u=> u+\"='\"+obj[u]+\"'\")}`;\n" +
                "    sql=sql.replace(/,/g,\" and \")\n" +
                "    return sql;\n" +
                "}\n" +
                "\n" +
                "M.getUpdateObjSql=function(tableName,obj,caseObj){\n" +
                "    var fields=[];\n" +
                "    for(let field in obj){\n" +
                "        if(field !=\"id\")\n" +
                "            fields.push(field);\n" +
                "    }\n" +
                "    let sql=\"\";\n" +
                "    if(!caseObj){\n" +
                "        sql=`update ${tableName} set ${fields.map(u =>u + \"='\" + obj[u]+ \"'\")} where id=${obj.id}`;\n" +
                "    }else{\n" +
                "        var caseObjfields=[];\n" +
                "        for(let caseObjfield in caseObj){\n" +
                "            caseObjfields.push(caseObjfield)\n" +
                "        }\n" +
                "        sql=`update ${tableName} set ${fields.map(u =>u + \"='\" + obj[u]+ \"'\")} where ${caseObjfields.map(u=> u+\"='\"+caseObj[u]+\"'\").join(\" and \")}`;\n" +
                "    }\n" +
                "\n" +
                "    return sql;\n" +
                "}\n" +
                "\n" +
                "\n" +
                "M.getSelectObjSql=function(tableName,obj){\n" +
                "    var fields=[];\n" +
                "    for(let field in obj){\n" +
                "        fields.push(field);\n" +
                "    }\n" +
                "    let sql = `select * from ${tableName} where ${fields.map(u=> u+\"='\"+obj[u]+\"'\")}`;\n" +
                "    sql=sql.replace(/,/g,\" and \")\n" +
                "    return sql;\n" +
                "}\n" +
                "\n" +
                "/**\n" +
                " * ----------------------Sql CRUD  START-------------------------------------------\n" +
                " */\n" +
                "\n" +
                "\n" +
                "\n" +
                "/**\n" +
                " * ----------------------数据持久化读写END--------------------------------------------\n" +
                " */\n" +
                "\n" +
                "\n" +
                "\n" +
                "/**\n" +
                " * ----------------------服务器端START--------------------------------------------\n" +
                " */\n" +
                "/**\n" +
                " *封装返回数据\n" +
                " */\n" +
                "M.result=function(data,success){\n" +
                "    var r={};\n" +
                "    if(success==false){\n" +
                "        r.code=3003;\n" +
                "        r.message=\"操作失败\";\n" +
                "        r.success=success;\n" +
                "    }else{\n" +
                "        r.code=3002;\n" +
                "        r.message=\"操作成功\"\n" +
                "        r.success=true;\n" +
                "    }\n" +
                "    try {\n" +
                "        var obj=JSON.parse(data);\n" +
                "        if(typeof obj == 'object' && obj ){\n" +
                "            r.data=obj;\n" +
                "        }else{\n" +
                "            r.data=data;\n" +
                "        }\n" +
                "    } catch(e) {\n" +
                "        r.data=data;\n" +
                "    }\n" +
                "    return JSON.stringify(r);\n" +
                "}\n" +
                "/**\n" +
                " *获取下划线式的对象\n" +
                " */\n" +
                "M.getUnderlineObj=function (obj) {\n" +
                "    var result={};\n" +
                "    for(let field in obj){\n" +
                "        result[field.humpToUnderline()]=obj[field]\n" +
                "    }\n" +
                "    return result;\n" +
                "}\n" +
                "\n" +
                "/**\n" +
                " *获取驼峰式的对象\n" +
                " */\n" +
                "M.getHumpObj=function (obj) {\n" +
                "    var result={};\n" +
                "    for(let field in obj){\n" +
                "        result[field.underlineToHump()]=obj[field]\n" +
                "    }\n" +
                "    return result;\n" +
                "}\n" +
                "\n" +
                "M.randomStr=function () {\n" +
                "   return  (Math.random().toString(36)+new Date().getTime()).slice(2);\n" +
                "}\n" +
                "\n" +
                "/**\n" +
                " * 异常处理钩子\n" +
                " * @param e\n" +
                " */\n" +
                "M.err=function(e){\n" +
                "    if(e){\n" +
                "        console.log(e.message);\n" +
                "        return false;\n" +
                "    }\n" +
                "    return true;\n" +
                "}\n" +
                "\n" +
                "\n" +
                "M.server=function(){\n" +
                "    var G=this;   /*全局变量,也就是M*/\n" +
                "    //静态资源路径\n" +
                "    this._views=\"static\";\n" +
                "    //key为去除rest参数的url,val为原始url\n" +
                "    this._rest={};\n" +
                "    //处理get和post请求\n" +
                "    this._get={};\n" +
                "    this._post={};\n" +
                "    this._mapping={};\n" +
                "    //用于模拟过滤器\n" +
                "    this._begin=function(){}\n" +
                "    //服务器响应后的钩子函数\n" +
                "    this._end=function(){}\n" +
                "    //如果实现此函数,则只能有一个此服务\n" +
                "    this._server=function (){};\n" +
                "    var app=function(req,res){\n" +
                "        //是否已经发送过了\n" +
                "        res.alreadySend=false;\n" +
                "        //是否为静态资源请求\n" +
                "        req.isStaticRequest=function(){\n" +
                "                if(req.url.indexOf(\"?\")>0){\n" +
                "                    return  privateObj.staticMime[path.extname(req.url.substr(0,req.url.indexOf(\"?\")))];\n" +
                "                }else{\n" +
                "                    return  privateObj.staticMime[path.extname(req.url)];\n" +
                "                }\n" +
                "         }\n" +
                "        //是否为rest请求\n" +
                "        req.isGetRestRequest=function(){\n" +
                "            var method=req.method.toLowerCase();\n" +
                "            if(Object.keys(G._rest).length==0) return false;\n" +
                "            \n" +
                "            var isRest=false;\n" +
                "            for(let i=0;i<Object.keys(G._rest).length;i++){\n" +
                "                if(pathname.startsWith(Object.keys(G._rest)[i])){\n" +
                "                    isRest=true;\n" +
                "                    break;\n" +
                "                }\n" +
                "            }\n" +
                "            return method==\"get\" && isRest;\n" +
                "        }\n" +
                "\n" +
                "        req.ip=req.headers['x-forwarded-for'] ||\n" +
                "            req.connection.remoteAddress ||\n" +
                "            req.socket.remoteAddress ||\n" +
                "            req.connection.socket.remoteAddress;\n" +
                "        //请求cookies封装\n" +
                "        req.cookies=querystring.parse(req.headers['cookie'],\"; \");\n" +
                "        //设置浏览器cookies\n" +
                "        res.cookie=function(key,value,cfg){\n" +
                "            let o={}\n" +
                "            o[key]=value;\n" +
                "            let r_cookie= Object.assign(o,cfg)\n" +
                "            res.setHeader(\"Set-Cookie\", querystring.stringify(r_cookie,\" ;\"));\n" +
                "        }\n" +
                "        if(req.session){\n" +
                "            Object.defineProperty(req,'session',{\n" +
                "                set:function(o){\n" +
                "                    let sessionValue=req.cookies.sessionid||M.randomStr();\n" +
                "                    res.cookie(\"sessionid\",sessionValue)\n" +
                "                    M.sessions[sessionValue]=o;\n" +
                "                },\n" +
                "                get:function(){\n" +
                "                    return M.sessions[req.cookies.sessionid]\n" +
                "                }\n" +
                "            })\n" +
                "        }\n" +
                "        //扩充res一个send方法\n" +
                "        res.send=function(data){\n" +
                "            res.setHeader(\"Access-Control-Allow-Origin\", \"*\");\n" +
                "            res.setHeader(\"Access-Control-Allow-Headers\", \"X-Requested-With\");\n" +
                "            res.setHeader(\"Access-Control-Allow-Methods\",\"PUT,POST,GET,DELETE,OPTIONS\");\n" +
                "            res.setHeader(\"X-Powered-By\",' 3.2.1')\n" +
                "            res.setHeader(\"Content-Type\", \"application/json;charset=utf-8\");\n" +
                "            res.end(data);\n" +
                "            G._end(data);\n" +
                "            res.alreadySend=true;\n" +
                "        }\n" +
                "        try {\n" +
                "                //获取路由\n" +
                "                var pathname=url_module.parse(req.url).pathname;\n" +
                "                if(!pathname.endsWith('/')){\n" +
                "                    pathname=pathname+'/';\n" +
                "                }\n" +
                "               // pathname.startsWith(\"/usr/\")\n" +
                "                //获取请求的方式 get  post\n" +
                "                var method=req.method.toLowerCase();\n" +
                "\n" +
                "                if(req.isStaticRequest()){\n" +
                "                    G._begin(req,res);\n" +
                "                    if(!res.alreadySend)privateObj.staticServer(req,res,G[\"_views\"]);\n" +
                "\n" +
                "                }else{\n" +
                "\n" +
                "                    if((method==\"get\" || method==\"post\") && (G['_'+method][pathname] || req.isGetRestRequest())){\n" +
                "                        if(method=='post'){ /*执行post请求*/\n" +
                "                            var postStr='';\n" +
                "                            req.on('data',function(chunk){\n" +
                "                                postStr+=chunk;\n" +
                "                            })\n" +
                "                            req.on('end',function(err,chunk) {\n" +
                "                                req.body=postStr;  /*表示拿到post的值*/\n" +
                "                                postData=\"\";\n" +
                "                                try {\n" +
                "                                    postData = url_module.parse(\"?\"+req.body,true).query;\n" +
                "                                } catch (e) {\n" +
                "                                    try {\n" +
                "                                        postData = JSON.parse(req.body);\n" +
                "                                    }catch (e) {\n" +
                "                                    }\n" +
                "                                }\n" +
                "                                req.params = Object.assign(postData,url_module.parse(req.url,true).query) ;\n" +
                "                                G._begin(req,res);\n" +
                "                                if(!res.alreadySend)G['_'+method][pathname](req,res); /*执行方法*/\n" +
                "                            })\n" +
                "                        }else if(method==\"get\"){ /*执行get请求*/\n" +
                "\n" +
                "                            var mapingPath=\"\";\n" +
                "                            //如果是rest风格的get请求,为其封装请求参数\n" +
                "                            if(req.isGetRestRequest()){\n" +
                "                                for(let i=0;i< Object.keys(G._rest).length;i++){\n" +
                "                                    if(pathname.startsWith(Object.keys(G._rest)[i])){\n" +
                "                                        pathname=Object.keys(G._rest)[i];\n" +
                "                                        mapingPath=G._rest[pathname];\n" +
                "                                    }\n" +
                "                                }\n" +
                "                                var realPathName=url_module.parse(req.url).pathname;\n" +
                "                                if(!realPathName.endsWith('/')){\n" +
                "                                    realPathName=realPathName+'/';\n" +
                "                                }\n" +
                "                                let s1=realPathName;\n" +
                "                                let s2=mapingPath;\n" +
                "                                s1= s1.substring(s2.indexOf(\":\")-1,s1.length-1).split(\"/\").slice(1)\n" +
                "                                s2= s2.substring(s2.indexOf(\":\")-1,s2.length-1).split(\"/:\").slice(1)\n" +
                "                                req.params={};\n" +
                "                                for(let i=0;i<s2.length;i++){req.params[s2[i]]=s1[i];}\n" +
                "                            }else{\n" +
                "                                req.params=url_module.parse(req.url,true).query;\n" +
                "                            }\n" +
                "                            G._begin(req,res);\n" +
                "                            if(!res.alreadySend)G['_'+method][pathname](req,res); /*执行方法*/\n" +
                "                        }\n" +
                "                    }else{\n" +
                "                        if(G['_mapping'][pathname]){\n" +
                "                            G._begin(req,res);\n" +
                "                            if(!res.alreadySend)G['_mapping'][pathname](req,res); /*执行方法*/\n" +
                "                        }else{\n" +
                "                            G._begin(req,res);\n" +
                "                            if(!res.alreadySend)G._server(req,res);\n" +
                "                            if(!res.alreadySend)res.end('no router');\n" +
                "                        }\n" +
                "                    }\n" +
                "                }\n" +
                "            }catch(e) {\n" +
                "                 console.error(e);\n" +
                "                 if(!res.alreadySend){\n" +
                "                     res.writeHead(500,{\"Content-Type\":\"text/html;charset='utf-8'\"});\n" +
                "                     res.write(\"服务器内部错误\");\n" +
                "                     res.end(); /*结束响应*/\n" +
                "                 }\n" +
                "            }\n" +
                "     }\n" +
                "\n" +
                "\n" +
                "    app.begin=function(callback){\n" +
                "        G._begin=callback;\n" +
                "    }\n" +
                "\n" +
                "    app.end=function(callback){\n" +
                "        G._end=callback;\n" +
                "    }\n" +
                "    /**\n" +
                "     *唯一服务的方法\n" +
                "     */\n" +
                "    app.server=function(callback){\n" +
                "        G._server=callback;\n" +
                "    }\n" +
                "    /**\n" +
                "     * 注册get请求\n" +
                "     */\n" +
                "    app.get=function(url,callback){\n" +
                "        url=M.formatUrl(url);\n" +
                "        var realUrl=url;\n" +
                "        if(url.indexOf(\":\")>0){\n" +
                "            url=url.substr(0,url.indexOf(\":\"));\n" +
                "            G._rest[url]=realUrl;\n" +
                "        }\n" +
                "\n" +
                "        G._get[url]=callback;\n" +
                "    }\n" +
                "\n" +
                "    /**\n" +
                "     *注册post请求\n" +
                "     */\n" +
                "    app.post=function(url,callback){\n" +
                "        url=M.formatUrl(url);\n" +
                "        G._post[url]=callback;\n" +
                "    }\n" +
                "\n" +
                "    M.formatUrl=function (url) {\n" +
                "        if(!url.endsWith('/')){\n" +
                "            url=url+'/';\n" +
                "        }\n" +
                "        if(!url.startsWith('/')){\n" +
                "            url='/'+url;\n" +
                "        }\n" +
                "        return url;\n" +
                "    }\n" +
                "    /**\n" +
                "     *转发\n" +
                "     */\n" +
                "    app.dispatch=function(url,req,res){\n" +
                "        req.url=url;\n" +
                "        app(req,res);\n" +
                "    }\n" +
                "\n" +
                "    /**\n" +
                "     *重定向\n" +
                "     */\n" +
                "    app.redirect=function(url,req,res){\n" +
                "        res.writeHead(302, {'Content-Type': 'text/html; charset=utf-8','Location':url});\n" +
                "        res.end();\n" +
                "    }\n" +
                "\n" +
                "    /**\n" +
                "     *注册任意请求方法的请求\n" +
                "     */\n" +
                "    app.mapping=function(url,callback){\n" +
                "        url=M.formatUrl(url);\n" +
                "        G._mapping[url]=callback;\n" +
                "    }\n" +
                "\n" +
                "    app.set=function(k,v){\n" +
                "        G[\"_\"+k]=v;\n" +
                "    }\n" +
                "\n" +
                "    app.listen=function (port){\n" +
                "        http.createServer(app).listen(port);\n" +
                "        console.log(\"listen on port:\"+port);\n" +
                "        return app;\n" +
                "    }\n" +
                "\n" +
                "    return app;\n" +
                "}\n" +
                "\n" +
                "privateObj.staticServer=function (req,res,staticPath) {\n" +
                "    var pathname=url_module.parse(req.url).pathname;   /*获取url的值*/\n" +
                "    if(pathname=='/'){\n" +
                "        pathname='/index.html'; /*默认加载的首页*/\n" +
                "    }\n" +
                "    //获取文件的后缀名\n" +
                "    var extname=path.extname(pathname);\n" +
                "    if(pathname!='/favicon.ico'){  /*过滤请求favicon.ico*/\n" +
                "        //文件操作获取 static下面的index.html\n" +
                "        fs.readFile(staticPath+'/'+pathname,function(err,data){\n" +
                "            if(err){  /*么有这个文件*/\n" +
                "                res.writeHead(404,{\"Content-Type\":\"text/html;charset='utf-8'\"});\n" +
                "                res.write(`<!DOCTYPE html>\n" +
                "                                <html lang=\"en\">\n" +
                "                                <head>\n" +
                "                                    <meta charset=\"UTF-8\">\n" +
                "                                    <title>404</title>\n" +
                "                                    <style type=\"text/css\">\n" +
                "                                        h1{\n" +
                "                                            font-size: 60px;\n" +
                "                                            color:blue;\n" +
                "                                        }\n" +
                "                                    </style>\n" +
                "                                </head>\n" +
                "                                <body>\n" +
                "                                    <h1>404</h1>\n" +
                "                                    <p>对不起，没有这个页面</p>\n" +
                "                                </body>\n" +
                "                                </html>`\n" +
                "                );\n" +
                "                res.end(); /*结束响应*/\n" +
                "            }else{ /*返回这个文件*/\n" +
                "                res.setHeader(\"Access-Control-Allow-Origin\", \"*\");\n" +
                "                res.setHeader(\"Access-Control-Allow-Headers\", \"X-Requested-With\");\n" +
                "                res.setHeader(\"Access-Control-Allow-Methods\",\"PUT,POST,GET,DELETE,OPTIONS\");\n" +
                "                res.setHeader(\"X-Powered-By\",' 3.2.1')\n" +
                "                res.writeHead(200,{\"Content-Type\":\"\"+(privateObj.staticMime[extname]||'text/html')+\";charset='utf-8'\",});\n" +
                "                res.write(data);\n" +
                "                res.end(); /*结束响应*/\n" +
                "            }\n" +
                "        })\n" +
                "    }else{\n" +
                "        res.writeHead(302, {'Content-Type': 'image/x-icon; charset=utf-8','Location':\"https://q.qlogo.cn/g?b=qq&nk=934031452&s=100\"});\n" +
                "        res.end();\n" +
                "    }\n" +
                "}\n" +
                "\n" +
                "/*SSE SERVER */\n" +
                "M.sseServer=function(){\n" +
                "    let app=function(req,res){\n" +
                "        console.log(\"SSEServer connect success\")\n" +
                "        res.writeHead(200, {\n" +
                "            'Content-Type': 'text/event-stream',\n" +
                "            'Cache-Control': 'no-cache',\n" +
                "            'Connection': 'keep-alive',\n" +
                "            'Access-Control-Allow-Origin': '*',\n" +
                "        });\n" +
                "        event.removeAllListeners(\"sseSendMsg\")\n" +
                "        event.on('sseSendMsg', function(r){\n" +
                "            res.write('event: slide\\n'); // 事件类型\n" +
                "            res.write(`id: ${+new Date()}\\n`); // 消息 ID\n" +
                "            res.write(`data: ${r}\\n`); // 消息数据\n" +
                "            res.write('retry: 10000\\n'); // 重连时间\n" +
                "            res.write('\\n\\n'); // 消息结束\n" +
                "        })\n" +
                "        // 发送注释保持长连接\n" +
                "        setInterval(() => {\n" +
                "            res.write(': \\n\\n');\n" +
                "        }, 12000);\n" +
                "\n" +
                "    };\n" +
                "    app.send=function(msg){\n" +
                "        event.emit('sseSendMsg',msg);\n" +
                "    }\n" +
                "    app.listen=function (port){\n" +
                "        let serverObj=http.createServer(app).listen(port);\n" +
                "        app.serverObj=serverObj;\n" +
                "        console.log(\"SSE Server listen on port:\"+port);\n" +
                "        return app;\n" +
                "    }\n" +
                "    return app;\n" +
                "}\n" +
                "\n" +
                "/**\n" +
                " * ----------------------服务器端END--------------------------------------------\n" +
                " */\n" +
                "\n" +
                "\n" +
                "/**\n" +
                " * ----------------------其他工具函数START--------------------------------------------\n" +
                " */\n" +
                "M.exec=function(comand){\n" +
                "    var promise = new Promise(function(reslove,reject){\n" +
                "        child_process.exec(comand,function(err, stdout, stderr){\n" +
                "            if(err || stderr)console.error(err,stderr);\n" +
                "            reslove(stdout);\n" +
                "        });\n" +
                "\n" +
                "    })\n" +
                "    return promise;\n" +
                "}\n" +
                "\n" +
                "M.getMyIp=function(){\n" +
                "  var interfaces = require('os').networkInterfaces();\n" +
                "  for(var devName in interfaces){\n" +
                "      var iface = interfaces[devName];\n" +
                "      for(var i=0;i<iface.length;i++){\n" +
                "          var alias = iface[i];\n" +
                "          if(alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal){\n" +
                "              return alias.address;\n" +
                "          }\n" +
                "      }\n" +
                "  }\n" +
                "}\n" +
                "\n" +
                "/**\n" +
                " *对象转JSON key不用引号括起来,因兼容性不好,所以去掉\n" +
                "*/\n" +
                "\n" +
                "/**\n" +
                "M.JSOM_Stringify=function(obj){\n" +
                "    return JSON.stringify(obj).replace(/\"(\\w+)\"(\\s*:\\s*)/gis, '$1$2');\n" +
                "}\n" +
                " */\n" +
                "\n" +
                "M.sleep=function(numberMillis){\n" +
                "    var now = new Date();\n" +
                "    var exitTime = now.getTime() + numberMillis;\n" +
                "    while (true) {\n" +
                "        now = new Date();\n" +
                "        if (now.getTime() > exitTime)\n" +
                "            return;\n" +
                "    }\n" +
                "}\n" +
                "/**\n" +
                " * ----------------------其他工具函数END--------------------------------------------\n" +
                " */\n" +
                "\n" +
                "/**\n" +
                " * 静态资源对应表\n" +
                " */\n" +
                "privateObj.staticMime={ \".323\":\"text/h323\" ,\n" +
                "    \".3gp\":\"video/3gpp\" ,\n" +
                "    \".aab\":\"application/x-authoware-bin\" ,\n" +
                "    \".aam\":\"application/x-authoware-map\" ,\n" +
                "    \".aas\":\"application/x-authoware-seg\" ,\n" +
                "    \".acx\":\"application/internet-property-stream\" ,\n" +
                "    \".ai\":\"application/postscript\" ,\n" +
                "    \".aif\":\"audio/x-aiff\" ,\n" +
                "    \".aifc\":\"audio/x-aiff\" ,\n" +
                "    \".aiff\":\"audio/x-aiff\" ,\n" +
                "    \".als\":\"audio/X-Alpha5\" ,\n" +
                "    \".amc\":\"application/x-mpeg\" ,\n" +
                "    \".ani\":\"application/octet-stream\" ,\n" +
                "    \".apk\":\"application/vnd.android.package-archive\" ,\n" +
                "    \".asc\":\"text/plain\" ,\n" +
                "    \".asd\":\"application/astound\" ,\n" +
                "    \".asf\":\"video/x-ms-asf\" ,\n" +
                "    \".asn\":\"application/astound\" ,\n" +
                "    \".asp\":\"application/x-asap\" ,\n" +
                "    \".asr\":\"video/x-ms-asf\" ,\n" +
                "    \".asx\":\"video/x-ms-asf\" ,\n" +
                "    \".au\":\"audio/basic\" ,\n" +
                "    \".avb\":\"application/octet-stream\" ,\n" +
                "    \".avi\":\"video/x-msvideo\" ,\n" +
                "    \".awb\":\"audio/amr-wb\" ,\n" +
                "    \".axs\":\"application/olescript\" ,\n" +
                "    \".bas\":\"text/plain\" ,\n" +
                "    \".bcpio\":\"application/x-bcpio\" ,\n" +
                "    \".bin \":\"application/octet-stream\" ,\n" +
                "    \".bld\":\"application/bld\" ,\n" +
                "    \".bld2\":\"application/bld2\" ,\n" +
                "    \".bmp\":\"image/bmp\" ,\n" +
                "    \".bpk\":\"application/octet-stream\" ,\n" +
                "    \".bz2\":\"application/x-bzip2\" ,\n" +
                "    \".c\":\"text/plain\" ,\n" +
                "    \".cal\":\"image/x-cals\" ,\n" +
                "    \".cat\":\"application/vnd.ms-pkiseccat\" ,\n" +
                "    \".ccn\":\"application/x-cnc\" ,\n" +
                "    \".cco\":\"application/x-cocoa\" ,\n" +
                "    \".cdf\":\"application/x-cdf\" ,\n" +
                "    \".cer\":\"application/x-x509-ca-cert\" ,\n" +
                "    \".cgi\":\"magnus-internal/cgi\" ,\n" +
                "    \".chat\":\"application/x-chat\" ,\n" +
                "    \".class\":\"application/octet-stream\" ,\n" +
                "    \".clp\":\"application/x-msclip\" ,\n" +
                "    \".cmx\":\"image/x-cmx\" ,\n" +
                "    \".co\":\"application/x-cult3d-object\" ,\n" +
                "    \".cod\":\"image/cis-cod\" ,\n" +
                "    \".conf\":\"text/plain\" ,\n" +
                "    \".cpio\":\"application/x-cpio\" ,\n" +
                "    \".cpp\":\"text/plain\" ,\n" +
                "    \".cpt\":\"application/mac-compactpro\" ,\n" +
                "    \".crd\":\"application/x-mscardfile\" ,\n" +
                "    \".crl\":\"application/pkix-crl\" ,\n" +
                "    \".crt\":\"application/x-x509-ca-cert\" ,\n" +
                "    \".csh\":\"application/x-csh\" ,\n" +
                "    \".csm\":\"chemical/x-csml\" ,\n" +
                "    \".csml\":\"chemical/x-csml\" ,\n" +
                "    \".css\":\"text/css\" ,\n" +
                "    \".cur\":\"application/octet-stream\" ,\n" +
                "    \".dcm\":\"x-lml/x-evm\" ,\n" +
                "    \".dcr\":\"application/x-director\" ,\n" +
                "    \".dcx\":\"image/x-dcx\" ,\n" +
                "    \".der\":\"application/x-x509-ca-cert\" ,\n" +
                "    \".dhtml\":\"text/html\" ,\n" +
                "    \".dir\":\"application/x-director\" ,\n" +
                "    \".dll\":\"application/x-msdownload\" ,\n" +
                "    \".dmg\":\"application/octet-stream\" ,\n" +
                "    \".dms\":\"application/octet-stream\" ,\n" +
                "    \".doc\":\"application/msword\" ,\n" +
                "    \".docx\":\"application/vnd.openxmlformats-officedocument.wordprocessingml.document\" ,\n" +
                "    \".dot\":\"application/msword\" ,\n" +
                "    \".dvi\":\"application/x-dvi\" ,\n" +
                "    \".dwf\":\"drawing/x-dwf\" ,\n" +
                "    \".dwg\":\"application/x-autocad\" ,\n" +
                "    \".dxf\":\"application/x-autocad\" ,\n" +
                "    \".dxr\":\"application/x-director\" ,\n" +
                "    \".ebk\":\"application/x-expandedbook\" ,\n" +
                "    \".emb\":\"chemical/x-embl-dl-nucleotide\" ,\n" +
                "    \".embl\":\"chemical/x-embl-dl-nucleotide\" ,\n" +
                "    \".eps\":\"application/postscript\" ,\n" +
                "    \".epub\":\"application/epub+zip\" ,\n" +
                "    \".eri\":\"image/x-eri\" ,\n" +
                "    \".es\":\"audio/echospeech\" ,\n" +
                "    \".esl\":\"audio/echospeech\" ,\n" +
                "    \".etc\":\"application/x-earthtime\" ,\n" +
                "    \".etx\":\"text/x-setext\" ,\n" +
                "    \".evm\":\"x-lml/x-evm\" ,\n" +
                "    \".evy\":\"application/envoy\" ,\n" +
                "    \".exe\":\"application/octet-stream\" ,\n" +
                "    \".fh4\":\"image/x-freehand\" ,\n" +
                "    \".fh5\":\"image/x-freehand\" ,\n" +
                "    \".fhc\":\"image/x-freehand\" ,\n" +
                "    \".fif\":\"application/fractals\" ,\n" +
                "    \".flr\":\"x-world/x-vrml\" ,\n" +
                "    \".flv\":\"flv-application/octet-stream\" ,\n" +
                "    \".fm\":\"application/x-maker\" ,\n" +
                "    \".fpx\":\"image/x-fpx\" ,\n" +
                "    \".fvi\":\"video/isivideo\" ,\n" +
                "    \".gau\":\"chemical/x-gaussian-input\" ,\n" +
                "    \".gca\":\"application/x-gca-compressed\" ,\n" +
                "    \".gdb\":\"x-lml/x-gdb\" ,\n" +
                "    \".gif\":\"image/gif\" ,\n" +
                "    \".gps\":\"application/x-gps\" ,\n" +
                "    \".gtar\":\"application/x-gtar\" ,\n" +
                "    \".gz\":\"application/x-gzip\" ,\n" +
                "    \".h\":\"text/plain\" ,\n" +
                "    \".hdf\":\"application/x-hdf\" ,\n" +
                "    \".hdm\":\"text/x-hdml\" ,\n" +
                "    \".hdml\":\"text/x-hdml\" ,\n" +
                "    \".hlp\":\"application/winhlp\" ,\n" +
                "    \".hqx\":\"application/mac-binhex40\" ,\n" +
                "    \".hta\":\"application/hta\" ,\n" +
                "    \".htc\":\"text/x-component\" ,\n" +
                "    \".htm\":\"text/html\" ,\n" +
                "    \".html\":\"text/html\" ,\n" +
                "    \".hts\":\"text/html\" ,\n" +
                "    \".htt\":\"text/webviewhtml\" ,\n" +
                "    \".ice\":\"x-conference/x-cooltalk\" ,\n" +
                "    \".ico\":\"image/x-icon\" ,\n" +
                "    \".ief\":\"image/ief\" ,\n" +
                "    \".ifm\":\"image/gif\" ,\n" +
                "    \".ifs\":\"image/ifs\" ,\n" +
                "    \".iii\":\"application/x-iphone\" ,\n" +
                "    \".imy\":\"audio/melody\" ,\n" +
                "    \".ins\":\"application/x-internet-signup\" ,\n" +
                "    \".ips\":\"application/x-ipscript\" ,\n" +
                "    \".ipx\":\"application/x-ipix\" ,\n" +
                "    \".isp\":\"application/x-internet-signup\" ,\n" +
                "    \".it\":\"audio/x-mod\" ,\n" +
                "    \".itz\":\"audio/x-mod\" ,\n" +
                "    \".ivr\":\"i-world/i-vrml\" ,\n" +
                "    \".j2k\":\"image/j2k\" ,\n" +
                "    \".jad\":\"text/vnd.sun.j2me.app-descriptor\" ,\n" +
                "    \".jam\":\"application/x-jam\" ,\n" +
                "    \".jar\":\"application/java-archive\" ,\n" +
                "    \".java\":\"text/plain\" ,\n" +
                "    \".jfif\":\"image/pipeg\" ,\n" +
                "    \".jnlp\":\"application/x-java-jnlp-file\" ,\n" +
                "    \".jpe\":\"image/jpeg\" ,\n" +
                "    \".jpeg\":\"image/jpeg\" ,\n" +
                "    \".jpg\":\"image/jpeg\" ,\n" +
                "    \".jpz\":\"image/jpeg\" ,\n" +
                "    \".js\":\"application/javascript\" ,\n" +
                "    \".jsx\":\"application/octet-stream\" ,\n" +
                "    \".jwc\":\"application/jwc\" ,\n" +
                "    \".kjx\":\"application/x-kjx\" ,\n" +
                "    \".lak\":\"x-lml/x-lak\" ,\n" +
                "    \".latex\":\"application/x-latex\" ,\n" +
                "    \".lcc\":\"application/fastman\" ,\n" +
                "    \".lcl\":\"application/x-digitalloca\" ,\n" +
                "    \".lcr\":\"application/x-digitalloca\" ,\n" +
                "    \".lgh\":\"application/lgh\" ,\n" +
                "    \".lha\":\"application/octet-stream\" ,\n" +
                "    \".lml\":\"x-lml/x-lml\" ,\n" +
                "    \".lmlpack\":\"x-lml/x-lmlpack\" ,\n" +
                "    \".log\":\"text/plain\" ,\n" +
                "    \".lsf\":\"video/x-la-asf\" ,\n" +
                "    \".lsx\":\"video/x-la-asf\" ,\n" +
                "    \".lzh\":\"application/octet-stream\" ,\n" +
                "    \".m13\":\"application/x-msmediaview\" ,\n" +
                "    \".m14\":\"application/x-msmediaview\" ,\n" +
                "    \".m15\":\"audio/x-mod\" ,\n" +
                "    \".m3u\":\"audio/x-mpegurl\" ,\n" +
                "    \".m3url\":\"audio/x-mpegurl\" ,\n" +
                "    \".m4a\":\"audio/mp4a-latm\" ,\n" +
                "    \".m4b\":\"audio/mp4a-latm\" ,\n" +
                "    \".m4p\":\"audio/mp4a-latm\" ,\n" +
                "    \".m4u\":\"video/vnd.mpegurl\" ,\n" +
                "    \".m4v\":\"video/x-m4v\" ,\n" +
                "    \".ma1\":\"audio/ma1\" ,\n" +
                "    \".ma2\":\"audio/ma2\" ,\n" +
                "    \".ma3\":\"audio/ma3\" ,\n" +
                "    \".ma5\":\"audio/ma5\" ,\n" +
                "    \".man\":\"application/x-troff-man\" ,\n" +
                "    \".map\":\"magnus-internal/imagemap\" ,\n" +
                "    \".mbd\":\"application/mbedlet\" ,\n" +
                "    \".mct\":\"application/x-mascot\" ,\n" +
                "    \".mdb\":\"application/x-msaccess\" ,\n" +
                "    \".mdz\":\"audio/x-mod\" ,\n" +
                "    \".me\":\"application/x-troff-me\" ,\n" +
                "    \".mel\":\"text/x-vmel\" ,\n" +
                "    \".mht\":\"message/rfc822\" ,\n" +
                "    \".mhtml\":\"message/rfc822\" ,\n" +
                "    \".mi\":\"application/x-mif\" ,\n" +
                "    \".mid\":\"audio/mid\" ,\n" +
                "    \".midi\":\"audio/midi\" ,\n" +
                "    \".mif\":\"application/x-mif\" ,\n" +
                "    \".mil\":\"image/x-cals\" ,\n" +
                "    \".mio\":\"audio/x-mio\" ,\n" +
                "    \".mmf\":\"application/x-skt-lbs\" ,\n" +
                "    \".mng\":\"video/x-mng\" ,\n" +
                "    \".mny\":\"application/x-msmoney\" ,\n" +
                "    \".moc\":\"application/x-mocha\" ,\n" +
                "    \".mocha\":\"application/x-mocha\" ,\n" +
                "    \".mod\":\"audio/x-mod\" ,\n" +
                "    \".mof\":\"application/x-yumekara\" ,\n" +
                "    \".mol\":\"chemical/x-mdl-molfile\" ,\n" +
                "    \".mop\":\"chemical/x-mopac-input\" ,\n" +
                "    \".mov\":\"video/quicktime\" ,\n" +
                "    \".movie\":\"video/x-sgi-movie\" ,\n" +
                "    \".mp2\":\"video/mpeg\" ,\n" +
                "    \".mp3\":\"audio/mpeg\" ,\n" +
                "    \".mp4\":\"video/mp4\" ,\n" +
                "    \".mpa\":\"video/mpeg\" ,\n" +
                "    \".mpc\":\"application/vnd.mpohun.certificate\" ,\n" +
                "    \".mpe\":\"video/mpeg\" ,\n" +
                "    \".mpeg\":\"video/mpeg\" ,\n" +
                "    \".mpg\":\"video/mpeg\" ,\n" +
                "    \".mpg4\":\"video/mp4\" ,\n" +
                "    \".mpga\":\"audio/mpeg\" ,\n" +
                "    \".mpn\":\"application/vnd.mophun.application\" ,\n" +
                "    \".mpp\":\"application/vnd.ms-project\" ,\n" +
                "    \".mps\":\"application/x-mapserver\" ,\n" +
                "    \".mpv2\":\"video/mpeg\" ,\n" +
                "    \".mrl\":\"text/x-mrml\" ,\n" +
                "    \".mrm\":\"application/x-mrm\" ,\n" +
                "    \".ms\":\"application/x-troff-ms\" ,\n" +
                "    \".msg\":\"application/vnd.ms-outlook\" ,\n" +
                "    \".mts\":\"application/metastream\" ,\n" +
                "    \".mtx\":\"application/metastream\" ,\n" +
                "    \".mtz\":\"application/metastream\" ,\n" +
                "    \".mvb\":\"application/x-msmediaview\" ,\n" +
                "    \".mzv\":\"application/metastream\" ,\n" +
                "    \".nar\":\"application/zip\" ,\n" +
                "    \".nbmp\":\"image/nbmp\" ,\n" +
                "    \".nc\":\"application/x-netcdf\" ,\n" +
                "    \".ndb\":\"x-lml/x-ndb\" ,\n" +
                "    \".ndwn\":\"application/ndwn\" ,\n" +
                "    \".nif\":\"application/x-nif\" ,\n" +
                "    \".nmz\":\"application/x-scream\" ,\n" +
                "    \".nokia-op-logo\":\"image/vnd.nok-oplogo-color\" ,\n" +
                "    \".npx\":\"application/x-netfpx\" ,\n" +
                "    \".nsnd\":\"audio/nsnd\" ,\n" +
                "    \".nva\":\"application/x-neva1\" ,\n" +
                "    \".nws\":\"message/rfc822\" ,\n" +
                "    \".oda\":\"application/oda\" ,\n" +
                "    \".ogg\":\"audio/ogg\" ,\n" +
                "    \".oom\":\"application/x-AtlasMate-Plugin\" ,\n" +
                "    \".p10\":\"application/pkcs10\" ,\n" +
                "    \".p12\":\"application/x-pkcs12\" ,\n" +
                "    \".p7b\":\"application/x-pkcs7-certificates\" ,\n" +
                "    \".p7c\":\"application/x-pkcs7-mime\" ,\n" +
                "    \".p7m\":\"application/x-pkcs7-mime\" ,\n" +
                "    \".p7r\":\"application/x-pkcs7-certreqresp\" ,\n" +
                "    \".p7s\":\"application/x-pkcs7-signature\" ,\n" +
                "    \".pac\":\"audio/x-pac\" ,\n" +
                "    \".pae\":\"audio/x-epac\" ,\n" +
                "    \".pan\":\"application/x-pan\" ,\n" +
                "    \".pbm\":\"image/x-portable-bitmap\" ,\n" +
                "    \".pcx\":\"image/x-pcx\" ,\n" +
                "    \".pda\":\"image/x-pda\" ,\n" +
                "    \".pdb\":\"chemical/x-pdb\" ,\n" +
                "    \".pdf\":\"application/pdf\" ,\n" +
                "    \".pfr\":\"application/font-tdpfr\" ,\n" +
                "    \".pfx\":\"application/x-pkcs12\" ,\n" +
                "    \".pgm\":\"image/x-portable-graymap\" ,\n" +
                "    \".pict\":\"image/x-pict\" ,\n" +
                "    \".pko\":\"application/ynd.ms-pkipko\" ,\n" +
                "    \".pm\":\"application/x-perl\" ,\n" +
                "    \".pma\":\"application/x-perfmon\" ,\n" +
                "    \".pmc\":\"application/x-perfmon\" ,\n" +
                "    \".pmd\":\"application/x-pmd\" ,\n" +
                "    \".pml\":\"application/x-perfmon\" ,\n" +
                "    \".pmr\":\"application/x-perfmon\" ,\n" +
                "    \".pmw\":\"application/x-perfmon\" ,\n" +
                "    \".png\":\"image/png\" ,\n" +
                "    \".pnm\":\"image/x-portable-anymap\" ,\n" +
                "    \".pnz\":\"image/png\" ,\n" +
                "    \".pot,\":\"application/vnd.ms-powerpoint\" ,\n" +
                "    \".ppm\":\"image/x-portable-pixmap\" ,\n" +
                "    \".pps\":\"application/vnd.ms-powerpoint\" ,\n" +
                "    \".ppt\":\"application/vnd.ms-powerpoint\" ,\n" +
                "    \".pptx\":\"application/vnd.openxmlformats-officedocument.presentationml.presentation\" ,\n" +
                "    \".pqf\":\"application/x-cprplayer\" ,\n" +
                "    \".pqi\":\"application/cprplayer\" ,\n" +
                "    \".prc\":\"application/x-prc\" ,\n" +
                "    \".prf\":\"application/pics-rules\" ,\n" +
                "    \".prop\":\"text/plain\" ,\n" +
                "    \".proxy\":\"application/x-ns-proxy-autoconfig\" ,\n" +
                "    \".ps\":\"application/postscript\" ,\n" +
                "    \".ptlk\":\"application/listenup\" ,\n" +
                "    \".pub\":\"application/x-mspublisher\" ,\n" +
                "    \".pvx\":\"video/x-pv-pvx\" ,\n" +
                "    \".qcp\":\"audio/vnd.qcelp\" ,\n" +
                "    \".qt\":\"video/quicktime\" ,\n" +
                "    \".qti\":\"image/x-quicktime\" ,\n" +
                "    \".qtif\":\"image/x-quicktime\" ,\n" +
                "    \".r3t\":\"text/vnd.rn-realtext3d\" ,\n" +
                "    \".ra\":\"audio/x-pn-realaudio\" ,\n" +
                "    \".ram\":\"audio/x-pn-realaudio\" ,\n" +
                "    \".rar\":\"application/octet-stream\" ,\n" +
                "    \".ras\":\"image/x-cmu-raster\" ,\n" +
                "    \".rc\":\"text/plain\" ,\n" +
                "    \".rdf\":\"application/rdf+xml\" ,\n" +
                "    \".rf\":\"image/vnd.rn-realflash\" ,\n" +
                "    \".rgb\":\"image/x-rgb\" ,\n" +
                "    \".rlf\":\"application/x-richlink\" ,\n" +
                "    \".rm\":\"audio/x-pn-realaudio\" ,\n" +
                "    \".rmf\":\"audio/x-rmf\" ,\n" +
                "    \".rmi\":\"audio/mid\" ,\n" +
                "    \".rmm\":\"audio/x-pn-realaudio\" ,\n" +
                "    \".rmvb\":\"audio/x-pn-realaudio\" ,\n" +
                "    \".rnx\":\"application/vnd.rn-realplayer\" ,\n" +
                "    \".roff\":\"application/x-troff\" ,\n" +
                "    \".rp\":\"image/vnd.rn-realpix\" ,\n" +
                "    \".rpm\":\"audio/x-pn-realaudio-plugin\" ,\n" +
                "    \".rt\":\"text/vnd.rn-realtext\" ,\n" +
                "    \".rte\":\"x-lml/x-gps\" ,\n" +
                "    \".rtf\":\"application/rtf\" ,\n" +
                "    \".rtg\":\"application/metastream\" ,\n" +
                "    \".rtx\":\"text/richtext\" ,\n" +
                "    \".rv\":\"video/vnd.rn-realvideo\" ,\n" +
                "    \".rwc\":\"application/x-rogerwilco\" ,\n" +
                "    \".s3m\":\"audio/x-mod\" ,\n" +
                "    \".s3z\":\"audio/x-mod\" ,\n" +
                "    \".sca\":\"application/x-supercard\" ,\n" +
                "    \".scd\":\"application/x-msschedule\" ,\n" +
                "    \".sct\":\"text/scriptlet\" ,\n" +
                "    \".sdf\":\"application/e-score\" ,\n" +
                "    \".sea\":\"application/x-stuffit\" ,\n" +
                "    \".setpay\":\"application/set-payment-initiation\" ,\n" +
                "    \".setreg\":\"application/set-registration-initiation\" ,\n" +
                "    \".sgm\":\"text/x-sgml\" ,\n" +
                "    \".sgml\":\"text/x-sgml\" ,\n" +
                "    \".sh\":\"application/x-sh\" ,\n" +
                "    \".shar\":\"application/x-shar\" ,\n" +
                "    \".shtml\":\"magnus-internal/parsed-html\" ,\n" +
                "    \".shw\":\"application/presentations\" ,\n" +
                "    \".si6\":\"image/si6\" ,\n" +
                "    \".si7\":\"image/vnd.stiwap.sis\" ,\n" +
                "    \".si9\":\"image/vnd.lgtwap.sis\" ,\n" +
                "    \".sis\":\"application/vnd.symbian.install\" ,\n" +
                "    \".sit\":\"application/x-stuffit\" ,\n" +
                "    \".skd\":\"application/x-Koan\" ,\n" +
                "    \".skm\":\"application/x-Koan\" ,\n" +
                "    \".skp\":\"application/x-Koan\" ,\n" +
                "    \".skt\":\"application/x-Koan\" ,\n" +
                "    \".slc\":\"application/x-salsa\" ,\n" +
                "    \".smd\":\"audio/x-smd\" ,\n" +
                "    \".smi\":\"application/smil\" ,\n" +
                "    \".smil\":\"application/smil\" ,\n" +
                "    \".smp\":\"application/studiom\" ,\n" +
                "    \".smz\":\"audio/x-smd\" ,\n" +
                "    \".snd\":\"audio/basic\" ,\n" +
                "    \".spc\":\"application/x-pkcs7-certificates\" ,\n" +
                "    \".spl\":\"application/futuresplash\" ,\n" +
                "    \".spr\":\"application/x-sprite\" ,\n" +
                "    \".sprite\":\"application/x-sprite\" ,\n" +
                "    \".sdp\":\"application/sdp\" ,\n" +
                "    \".spt\":\"application/x-spt\" ,\n" +
                "    \".src\":\"application/x-wais-source\" ,\n" +
                "    \".sst\":\"application/vnd.ms-pkicertstore\" ,\n" +
                "    \".stk\":\"application/hyperstudio\" ,\n" +
                "    \".stl\":\"application/vnd.ms-pkistl\" ,\n" +
                "    \".stm\":\"text/html\" ,\n" +
                "    \".svg\":\"image/svg+xml\" ,\n" +
                "    \".sv4cpio\":\"application/x-sv4cpio\" ,\n" +
                "    \".sv4crc\":\"application/x-sv4crc\" ,\n" +
                "    \".svf\":\"image/vnd\" ,\n" +
                "    \".svg\":\"image/svg+xml\" ,\n" +
                "    \".svh\":\"image/svh\" ,\n" +
                "    \".svr\":\"x-world/x-svr\" ,\n" +
                "    \".swf\":\"application/x-shockwave-flash\" ,\n" +
                "    \".swfl\":\"application/x-shockwave-flash\" ,\n" +
                "    \".t\":\"application/x-troff\" ,\n" +
                "    \".tad\":\"application/octet-stream\" ,\n" +
                "    \".talk\":\"text/x-speech\" ,\n" +
                "    \".tar\":\"application/x-tar\" ,\n" +
                "    \".taz\":\"application/x-tar\" ,\n" +
                "    \".tbp\":\"application/x-timbuktu\" ,\n" +
                "    \".tbt\":\"application/x-timbuktu\" ,\n" +
                "    \".tcl\":\"application/x-tcl\" ,\n" +
                "    \".tex\":\"application/x-tex\" ,\n" +
                "    \".texi\":\"application/x-texinfo\" ,\n" +
                "    \".texinfo\":\"application/x-texinfo\" ,\n" +
                "    \".tgz\":\"application/x-compressed\" ,\n" +
                "    \".thm\":\"application/vnd.eri.thm\" ,\n" +
                "    \".tif\":\"image/tiff\" ,\n" +
                "    \".tiff\":\"image/tiff\" ,\n" +
                "    \".tki\":\"application/x-tkined\" ,\n" +
                "    \".tkined\":\"application/x-tkined\" ,\n" +
                "    \".toc\":\"application/toc\" ,\n" +
                "    \".toy\":\"image/toy\" ,\n" +
                "    \".tr\":\"application/x-troff\" ,\n" +
                "    \".trk\":\"x-lml/x-gps\" ,\n" +
                "    \".trm\":\"application/x-msterminal\" ,\n" +
                "    \".tsi\":\"audio/tsplayer\" ,\n" +
                "    \".tsp\":\"application/dsptype\" ,\n" +
                "    \".tsv\":\"text/tab-separated-values\" ,\n" +
                "    \".ttf\":\"application/octet-stream\" ,\n" +
                "    \".ttz\":\"application/t-time\" ,\n" +
                "    \".txt\":\"text/plain\" ,\n" +
                "    \".uls\":\"text/iuls\" ,\n" +
                "    \".ult\":\"audio/x-mod\" ,\n" +
                "    \".ustar\":\"application/x-ustar\" ,\n" +
                "    \".uu\":\"application/x-uuencode\" ,\n" +
                "    \".uue\":\"application/x-uuencode\" ,\n" +
                "    \".vcd\":\"application/x-cdlink\" ,\n" +
                "    \".vcf\":\"text/x-vcard\" ,\n" +
                "    \".vdo\":\"video/vdo\" ,\n" +
                "    \".vib\":\"audio/vib\" ,\n" +
                "    \".viv\":\"video/vivo\" ,\n" +
                "    \".vivo\":\"video/vivo\" ,\n" +
                "    \".vmd\":\"application/vocaltec-media-desc\" ,\n" +
                "    \".vmf\":\"application/vocaltec-media-file\" ,\n" +
                "    \".vmi\":\"application/x-dreamcast-vms-info\" ,\n" +
                "    \".vms\":\"application/x-dreamcast-vms\" ,\n" +
                "    \".vox\":\"audio/voxware\" ,\n" +
                "    \".vqe\":\"audio/x-twinvq-plugin\" ,\n" +
                "    \".vqf\":\"audio/x-twinvq\" ,\n" +
                "    \".vql\":\"audio/x-twinvq\" ,\n" +
                "    \".vre\":\"x-world/x-vream\" ,\n" +
                "    \".vrml\":\"x-world/x-vrml\" ,\n" +
                "    \".vrt\":\"x-world/x-vrt\" ,\n" +
                "    \".vrw\":\"x-world/x-vream\" ,\n" +
                "    \".vts\":\"workbook/formulaone\" ,\n" +
                "    \".wav\":\"audio/x-wav\" ,\n" +
                "    \".wax\":\"audio/x-ms-wax\" ,\n" +
                "    \".wbmp\":\"image/vnd.wap.wbmp\" ,\n" +
                "    \".wcm\":\"application/vnd.ms-works\" ,\n" +
                "    \".wdb\":\"application/vnd.ms-works\" ,\n" +
                "    \".web\":\"application/vnd.xara\" ,\n" +
                "    \".wi\":\"image/wavelet\" ,\n" +
                "    \".wis\":\"application/x-InstallShield\" ,\n" +
                "    \".wks\":\"application/vnd.ms-works\" ,\n" +
                "    \".wm\":\"video/x-ms-wm\" ,\n" +
                "    \".wma\":\"audio/x-ms-wma\" ,\n" +
                "    \".wmd\":\"application/x-ms-wmd\" ,\n" +
                "    \".wmf\":\"application/x-msmetafile\" ,\n" +
                "    \".wml\":\"text/vnd.wap.wml\" ,\n" +
                "    \".wmlc\":\"application/vnd.wap.wmlc\" ,\n" +
                "    \".wmls\":\"text/vnd.wap.wmlscript\" ,\n" +
                "    \".wmlsc\":\"application/vnd.wap.wmlscriptc\" ,\n" +
                "    \".wmlscript\":\"text/vnd.wap.wmlscript\" ,\n" +
                "    \".wmv\":\"audio/x-ms-wmv\" ,\n" +
                "    \".wmx\":\"video/x-ms-wmx\" ,\n" +
                "    \".wmz\":\"application/x-ms-wmz\" ,\n" +
                "    \".wpng\":\"image/x-up-wpng\" ,\n" +
                "    \".wps\":\"application/vnd.ms-works\" ,\n" +
                "    \".wpt\":\"x-lml/x-gps\" ,\n" +
                "    \".wri\":\"application/x-mswrite\" ,\n" +
                "    \".wrl\":\"x-world/x-vrml\" ,\n" +
                "    \".wrz\":\"x-world/x-vrml\" ,\n" +
                "    \".ws\":\"text/vnd.wap.wmlscript\" ,\n" +
                "    \".wsc\":\"application/vnd.wap.wmlscriptc\" ,\n" +
                "    \".wv\":\"video/wavelet\" ,\n" +
                "    \".wvx\":\"video/x-ms-wvx\" ,\n" +
                "    \".wxl\":\"application/x-wxl\" ,\n" +
                "    \".x-gzip\":\"application/x-gzip\" ,\n" +
                "    \".xaf\":\"x-world/x-vrml\" ,\n" +
                "    \".xar\":\"application/vnd.xara\" ,\n" +
                "    \".xbm\":\"image/x-xbitmap\" ,\n" +
                "    \".xdm\":\"application/x-xdma\" ,\n" +
                "    \".xdma\":\"application/x-xdma\" ,\n" +
                "    \".xdw\":\"application/vnd.fujixerox.docuworks\" ,\n" +
                "    \".xht\":\"application/xhtml+xml\" ,\n" +
                "    \".xhtm\":\"application/xhtml+xml\" ,\n" +
                "    \".xhtml\":\"application/xhtml+xml\" ,\n" +
                "    \".xla\":\"application/vnd.ms-excel\" ,\n" +
                "    \".xlc\":\"application/vnd.ms-excel\" ,\n" +
                "    \".xll\":\"application/x-excel\" ,\n" +
                "    \".xlm\":\"application/vnd.ms-excel\" ,\n" +
                "    \".xls\":\"application/vnd.ms-excel\" ,\n" +
                "    \".xlsx\":\"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet\" ,\n" +
                "    \".xlt\":\"application/vnd.ms-excel\" ,\n" +
                "    \".xlw\":\"application/vnd.ms-excel\" ,\n" +
                "    \".xm\":\"audio/x-mod\" ,\n" +
                "    \".xml\":\"text/plain\",\n" +
                "    \".xml\":\"application/xml\",\n" +
                "    \".xmz\":\"audio/x-mod\" ,\n" +
                "    \".xof\":\"x-world/x-vrml\" ,\n" +
                "    \".xpi\":\"application/x-xpinstall\" ,\n" +
                "    \".xpm\":\"image/x-xpixmap\" ,\n" +
                "    \".xsit\":\"text/xml\" ,\n" +
                "    \".xsl\":\"text/xml\" ,\n" +
                "    \".xul\":\"text/xul\" ,\n" +
                "    \".xwd\":\"image/x-xwindowdump\" ,\n" +
                "    \".xyz\":\"chemical/x-pdb\" ,\n" +
                "    \".yz1\":\"application/x-yz1\" ,\n" +
                "    \".z\":\"application/x-compress\" ,\n" +
                "    \".zac\":\"application/x-zaurus-zac\" ,\n" +
                "    \".zip\":\"application/zip\" ,\n" +
                "    \".json\":\"application/json\"\n" +
                "}\n" +
                "\n" +
                "M.test=function () {\n" +
                "    console.log(privateObj.staticMime[\".jssson\"]||\"aa\")\n" +
                "}\n" +
                "\n" +
                "M.init=function(){\n" +
                "    /***\n" +
                "     * 下划线命名转为驼峰命名\n" +
                "     */\n" +
                "    String.prototype.underlineToHump=function(){\n" +
                "        var re=/_(\\w)/g;\n" +
                "        str=this.replace(re,function($0,$1){\n" +
                "            return $1.toUpperCase();\n" +
                "        });\n" +
                "        return str;\n" +
                "    }\n" +
                "\n" +
                "    /***\n" +
                "     * 驼峰命名转下划线\n" +
                "     */\n" +
                "    String.prototype.humpToUnderline=function(){\n" +
                "        var re=/_(\\w)/g;\n" +
                "        str=this.replace(/([A-Z])/g,\"_$1\").toLowerCase();\n" +
                "        return str;\n" +
                "    }\n" +
                "\n" +
                "    //首字母变大写\n" +
                "    String.prototype.firstChartoUpper=function() {\n" +
                "        return this.replace(/^([a-z])/g, function(word) {\n" +
                "            return word.replace(word.charAt(0), word.charAt(0).toUpperCase());\n" +
                "        });\n" +
                "    }\n" +
                "    //首字母变小写\n" +
                "    String.prototype.firstChartoLower=function() {\n" +
                "        return this.replace(/^([A-Z])/g, function(word) {\n" +
                "            return word.replace(word.charAt(0), word.charAt(0).toLowerCase());\n" +
                "        });\n" +
                "    }\n" +
                "    //格式化日期\n" +
                "    Date.prototype.format = function(fmt) {\n" +
                "        var o = {\n" +
                "            \"M+\" : this.getMonth()+1,                 //月份\n" +
                "            \"d+\" : this.getDate(),                    //日\n" +
                "            \"h+\" : this.getHours(),                   //小时\n" +
                "            \"m+\" : this.getMinutes(),                 //分\n" +
                "            \"s+\" : this.getSeconds(),                 //秒\n" +
                "            \"q+\" : Math.floor((this.getMonth()+3)/3), //季度\n" +
                "            \"S\"  : this.getMilliseconds()             //毫秒\n" +
                "        };\n" +
                "        if(/(y+)/.test(fmt)) {\n" +
                "            fmt=fmt.replace(RegExp.$1, (this.getFullYear()+\"\").substr(4 - RegExp.$1.length));\n" +
                "        }\n" +
                "        for(var k in o) {\n" +
                "            if(new RegExp(\"(\"+ k +\")\").test(fmt)){\n" +
                "                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : ((\"00\"+ o[k]).substr((\"\"+ o[k]).length)));\n" +
                "            }\n" +
                "        }\n" +
                "        return fmt;\n" +
                "    }\n" +
                "\n" +
                "\n" +
                "}\n" +
                "M.init();\n" +
                "\n" +
                "module.exports=M;\n" +
                "\n" +
                "\n")
	//url = require("url");

	var app = M.server();
	app.set("views", "./")
	app.listen(8888);

	app.get("/", async (req, res) => {
		res.writeHead(200, { "Content-Type": "text/html;charset='utf-8'" });
		res.write(`
		  <!DOCTYPE html>
<html>

<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta http-equiv="Content-Type" content="text/html;charset=utf-8">
    <link rel="stylesheet" href="https://cdn.staticfile.org/twitter-bootstrap/3.3.7/css/bootstrap.min.css">
    <script src="https://cdn.bootcss.com/jquery/3.3.1/jquery.js"></script>
    <script src="https://cdn.staticfile.org/twitter-bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <script src="https://minglie.gitee.io/ming_autotest/src/static/lib/monacoeditor/min/vs/loader.js"></script>
    <script>
        M = {}
    </script>
    <script src="https://minglie.gitee.io/mingpage/static/smalltool/share_edit/static/launge_default_value.js"></script>
    <style>
        #resize {
            width: 5px;
            height: 10px;
        }

        option {
            font-weight: bold;
            font-size: large;
            color: #00b4ef;
        }
    </style>
</head>

<body>
    <div>
        <select id="laungeSelectId" class="form-control" style="width:10%; float: left;" onchange="selectOnchang(this)">
            <option>javascript</option>
            <option>abap</option>
            <option>aes</option>
            <option>apex</option>
            <option>azcli</option>
            <option>bat</option>
            <option>c</option>
            <option>cameligo</option>
            <option>clojure</option>
            <option>coffeescript</option>
            <option>cpp</option>
            <option>csharp</option>
            <option>csp</option>
            <option>css</option>
            <option>dockerfile</option>
            <option>fsharp</option>
            <option>go</option>
            <option>graphql</option>
            <option>handlebars</option>
            <option>html</option>
            <option>ini</option>
            <option>java</option>
            <option>json</option>
            <option>kotlin</option>
            <option>less</option>
            <option>lua</option>
            <option>markdown</option>
            <option>mips</option>
            <option>msdax</option>
            <option>mysql</option>
            <option>objective-c</option>
            <option>pascal</option>
            <option>pascaligo</option>
            <option>perl</option>
            <option>pgsql</option>
            <option>php</option>
            <option>plaintext</option>
            <option>postiats</option>
            <option>powerquery</option>
            <option>powershell</option>
            <option>pug</option>
            <option>python</option>
            <option>r</option>
            <option>razor</option>
            <option>redis</option>
            <option>redshift</option>
            <option>restructuredtext</option>
            <option>ruby</option>
            <option>rust</option>
            <option>sb</option>
            <option>scheme</option>
            <option>scss</option>
            <option>shell</option>
            <option>sol</option>
            <option>sql</option>
            <option>st</option>
            <option>swift</option>
            <option>tcl</option>
            <option>twig</option>
            <option>typescript</option>
            <option>vb</option>
            <option>xml</option>
            <option>yaml</option></select>
        </select>
        <div align="center">
            <button id="btn" style="float: left; width: 80%; height: 35px;" align="center" type="button" class="btn btn-success btn-lg btn-block">Run</button>
        </div>
        <select  id="themeSelectId"  class="form-control" style="width: 10%; float: right;"  onchange="selectOnThemechang(this)">
            <option>vs</option>
            <option>vs-dark</option>
            <option>hc-black</option>
        </select>
 
    </div>
 
     
    <div id="container" style="width:100%;height:2000px;float:left; border:1px solid grey"></div>
    <script>
        M.language =localStorage.language || "javascript"
        M.theme=localStorage.theme || "vs-dark";  
       
        require.config({
            baseUrl: 'https://minglie.gitee.io/ming_autotest/src/static/lib/monacoeditor/', paths: { 'vs': 'min/vs' }
        });

        function selectOnchang(d) {
            localStorage.language=d.value;
            M.language = d.value;
            $("#container").children().remove();
            $.ajax({
                type: "GET",
                url: "__ming_file." + M.language + ".txt",
                async: false,
                success: function (data) {
                    if (data == "no router") {
                        data = null;
                    }
                    require(['vs/editor/editor.main'], function () {
                    
                        var editor = monaco.editor.create(document.getElementById('container'), {
                            value: [
                                data || M.laungeInitValue[M.language]
                            ].join('\\n'),
                            language: M.language,
                            theme: M.theme,
                            automaticLayout: true,
                            scrollbar: {
                                useShadows: false,
                                vertical: 'visible',
                                horizontal: 'visible',
                                horizontalSliderSize: 5,
                                verticalSliderSize: 5,
                                horizontalScrollbarSize: 15,
                                verticalScrollbarSize: 15,
                            },
                            quickSuggestions: true,
                            overviewRulerBorder: true,
                            minimap: {
                                enabled: false
                            }
                        });
                        M.editor = editor;
                        if( $("#themeSelectId").val()!=M.theme){
                            $("#themeSelectId").val(M.theme) 
                            selectOnThemechang({ value: M.theme })
                        }
                    }
                    );
                }, error: function () {
                    require(['vs/editor/editor.main'], function () {

                        var editor = monaco.editor.create(document.getElementById('container'), {
                            value: [
                                M.laungeInitValue[M.language]
                            ].join('\\n'),
                            language: M.language,
                            theme: M.theme,
                            automaticLayout: true,
                            scrollbar: {
                                useShadows: false,
                                vertical: 'visible',
                                horizontal: 'visible',
                                horizontalSliderSize: 5,
                                verticalSliderSize: 5,
                                horizontalScrollbarSize: 15,
                                verticalScrollbarSize: 15,
                            },
                            quickSuggestions: true,
                            overviewRulerBorder: true,
                            minimap: {
                                enabled: false
                            }
                        });
                        M.editor = editor;

                        if( $("#themeSelectId").val()!=M.theme){
                            $("#themeSelectId").val(M.theme) 
                            selectOnThemechang({ value: M.theme })
                        }


                    }
                    );
                }
            });
        }

       function selectOnThemechang(d){
            M.theme=d.value;  
            localStorage.theme= M.theme;
            monaco.editor.setTheme(M.theme);
        }

    
        function ming_alert(str) {
            btn.innerHTML = str;
            window.setTimeout(() => {
                btn.innerHTML = "Run";
            }, 500);
        }
        btn.onclick = function () {
            let fun = M.editor.getValue();
            localStorage.fun = fun;
            $.ajax({
                type: "post",
                url: "/_run_?language=" + M.language,
                data: { fun },
                dataType: "json",
                success: function (data) {
                    ming_alert(JSON.stringify(data));
                },
                error: function (e) {
                    ming_alert(JSON.stringify(e));
                }
            });
        }

        $("#laungeSelectId").val(M.language)
        selectOnchang({value:M.language})
        console.log(M.language,M.theme);
    </script>
</body>

</html>
		`
		);
		res.end();
	})
	
	
	
	
	
	app.post("/_run_", async (req, res) => {
        try {
            M.writeFile("./__ming_file." + req.params.language + ".txt", req.params.fun);
            if (req.params.language == "javascript") {
                eval(req.params.fun)
            }
            res.send(M.result("ok"))

        } catch (e) {
            res.send(M.result("error", false))
        }
    })

    eval(M.readFile("./__ming_file.javascript.txt"))
	
	
}();