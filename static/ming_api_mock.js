/**
 * File : index.js
 * By : Minglie
 * QQ: 934031452
 * Date :2021.12.01
 * version :3.0.2
 */
const http = require('http');
const https = require('https');
const url_module = require('url');
const querystring = require('querystring');
const fs = require('fs');
const path = require('path');
const child_process = require('child_process');
const EventEmitter = require('events').EventEmitter;
const event = new EventEmitter();
const privateObj = {};//本文件私有对�?
const M = {};
M.privateObj=privateObj;
M.sessions = {}//保存session
M.con_display_status_enable = false;//是否显示响应状态码
M.cookie = "JSESSIONID=" + "6E202D5A022EBD62705AA436EC54963B";//请求携带的cook
M.reqComQueryparams = undefined;//请求的公共的查询参数
M.reqComHeaders = undefined;//请求的公共请求头
M.host = "http://127.0.0.1:7001";
M.log_file_enable = true;//将日志输出到文件
M.log_console_enable = true;//将日志输出到控制�?
M.log_path = "./M.log";//输出日志文件路径
M.map_path = "./M_map.json";//全局作用域路�?
M.database_path = "./M_database.json";//文件型数据库路径
M.log_display_time = true;//日志是否显示当前时间
M.httpProxy = {};// http 代理配置
M._sseClientMap=new Map();
M._sseHeatTime=3000;
M._moduleMap=new Map();//模块map
M.httpBefore = (d) => {
    return d
}
M.httpEnd = (d) => {
}
//全局缓存map
M._globle_cacheMap = {}
//全局对象缓存
M._globle_lib_cacheMap={}
//全局插件地址缓存
M._globle_plugin_url_cacheMap={};
//全局插件
M._globle_plugin=new Set();
M._node_lib_path=process.cwd()+"/.ming_node_cacke";
//远程静态资源路�?
M.remoteStaticPath = "https://minglie.gitee.io/mingpage/static";
M.remoteStaticPathEnable = true;
//代理服务器配�?
M.proxyHost = "http://127.0.0.1:8888"
M.proxyHost = "";
M.IO={}
M.setModule=function (key,module){
    M._moduleMap.set(key,module);
}
M.getModule=function (key){
    M._moduleMap.get(key);
}

M.getGloblePlugin=(pluginKey)=>{
    let plugin=null;
    M._globle_plugin.forEach(u=>{
        if(u.key==pluginKey){
            plugin=u;
        }
    })
    return plugin;
}


/**
 * ----------------------客户端START--------------------------------------------
 */
//解析对象或函数返回�?
privateObj.getFunctionOrObjResult = function (objOrFunc, obj) {
    let c1;
    if (!objOrFunc) {
        return obj;
    }
    if (typeof objOrFunc == "function") {
        c1 = objOrFunc();
    } else {
        c1 = objOrFunc;
    }
    return Object.assign(obj, c1);
}

//将对象追加到url�?
privateObj.appendDataToUrl = function (url, data) {
    let getData = "";
    if (data) {
        getData = querystring.stringify(data);
        //url携带参数�?
        if (url.indexOf("?") > 0) {
            getData = "&" + getData;
        } else {
            getData = "?" + getData;
        }
    }
    let r = url + getData;
    return r;
}

M.get = function (url, callback, data, headers) {
    if (typeof callback == "function") {

    } else {
        headers = data || {'Content-Type': 'application/json'};
        data = callback;
        callback = () => {
        };
    }
    if (headers) {
    } else {
        headers = {
            'Content-Type': 'application/json',
            'Cookie': M.cookie
        }
    }
    let getData = "";
    if (data || M.reqComQueryparams) {
        data = privateObj.getFunctionOrObjResult(M.reqComQueryparams, data)
        getData = querystring.stringify(data);
        //url携带参数�?
        if (url.indexOf("?") > 0) {
            getData = "&" + getData;
        } else {
            getData = "?" + getData;
        }
    }
    //合并请求�?
    headers = privateObj.getFunctionOrObjResult(M.reqComHeaders, headers)
    let html = '';
    let urlObj = url_module.parse(url)
    let options = {
        hostname: urlObj.hostname,
        port: urlObj.port,
        path: urlObj.path + getData,
        method: 'GET',
        headers: headers
    }
    if (Object.keys(M.httpProxy).length > 0) {
        options.host = M.httpProxy.host;
        options.port = M.httpProxy.port;
        options.path = url + getData;
        delete options.hostname;
    }
    let reqHttp = http;
    if (url.startsWith("https")) {
        reqHttp = https;
    }

    return new Promise((resolve, reject) => {
        options = M.httpBefore(options);
        if (options == false) {
            return;
        }
        let req = reqHttp.request(options, function (res) {
            if (M.con_display_status_enable) console.log('STATUS:' + res.statusCode);
            if (global.debug && res.statusCode != 200) {
                while (1) {
                    M.sleep(1000);
                    console.log('STATUS:' + res.statusCode);
                    console.log("--------ERROR:" + res.req.path + "-------------");
                }
            }
            res.setEncoding('utf-8');
            res.on('data', function (chunk) {
                html += chunk;
            });
            res.on('end', function () {
                callback(html, res);
                try {
                    if(headers && headers['Content-Type']=='application/json'){
                        html = JSON.parse(html)
                    }else {
                        html = html;
                    }
                } catch (e) {
                    html = html;
                }
                M.httpEnd(html);
                resolve(html);
            });
        });
        req.on('error', function (err) {
            reject(err);
            console.error(err);

        });
        req.end();
    })
}
M._request = function (url, callback, data, headers,methed) {
    if (typeof callback == "function") {

    } else {
        headers = data || {};
        data = callback;
        callback = () => {
        };
    }

    url = privateObj.appendDataToUrl(url, M.reqComQueryparams);
    let html = '';
    let urlObj = url_module.parse(url)
    //发�? http Post 请求
    let postData = querystring.stringify(data);
    if( headers["Content-Type"]==undefined){
        headers["Content-Type"] ="application/json";
    }
    if (headers["Content-Type"] == "application/json") {
        postData = JSON.stringify(data);
    }else {
        headers = {
            'Content-Type': 'application/x-www-form-urlencoded; ' +
                'charset=UTF-8',
            'Content-Length': Buffer.byteLength(postData)
        }
    }

    //合并请求�?
    headers = privateObj.getFunctionOrObjResult(M.reqComHeaders, headers)
    let options = {
        hostname: urlObj.hostname,
        port: urlObj.port,
        path: urlObj.path,
        method: methed,
        headers: headers
    }
    if (Object.keys(M.httpProxy).length > 0) {
        options.host = M.httpProxy.host;
        options.port = M.httpProxy.port;
        options.path = url;
        delete options.hostname;
    }
    let reqHttp = http;
    if (url.startsWith("https")) {
        reqHttp = https;
    }

    return new Promise((resolve, reject) => {
        let req = reqHttp.request(options, function (res) {
            options = M.httpBefore(options);
            if (options == false) {
                return;
            }
            if (M.con_display_status_enable) console.log('STATUS:' + res.statusCode);
            if (global.debug && res.statusCode != 200) {
                while (1) {
                    M.sleep(1000);
                    console.log('STATUS:' + res.statusCode);
                    console.log("--------ERROR:" + res.req.path + "-------------");
                }
            }
            // console.log('headers:',JSON.stringify(res.headers));
            res.setEncoding('utf-8');
            res.on('data', function (chunk) {
                html += chunk;
            });
            res.on('end', function () {
                callback(html, res);
                try {
                    html = JSON.parse(html)
                } catch (e) {
                    html = html;
                }
                M.httpEnd(html);
                resolve(html);
            });

        });

        req.on('error', function (err) {
            console.error(err);
            throw err;
        });
        if(methed !="GET") req.write(postData);
        req.end();
    })
}
M.post=(url, callback, data, headers)=>M._request(url, callback, data, headers,"POST")
M.delete=(url, callback, data, headers)=>M._request(url, callback, data, headers,"DELETE")
M.put=(url, callback, data, headers)=>M._request(url, callback, data, headers,"PUT")
M.postJson = function (url, callback, data, headers) {
    if (typeof callback == "function") {

    } else {
        headers = data || {};
        data = callback;
        callback = () => {
        };
    }
    url = privateObj.appendDataToUrl(url, M.reqComQueryparams);
    let html = '';
    let urlObj = url_module.parse(url)
    //发�? http Post 请求
    let postData = JSON.stringify(data);
    if (!headers) {
        headers = {
            'Content-Type': 'application/json; ' +
                'charset=UTF-8',
            'Cookie': M.cookie
        }
    }
    //合并请求�?
    headers = privateObj.getFunctionOrObjResult(M.reqComHeaders, headers)
    let options = {
        hostname: urlObj.hostname,
        port: urlObj.port,
        path: urlObj.path,
        method: 'POST',
        headers: headers
    }
    if (Object.keys(M.httpProxy).length > 0) {
        options.host = M.httpProxy.host;
        options.port = M.httpProxy.port;
        options.path = url;
        delete options.hostname;
    }
    let reqHttp = http;
    if (url.startsWith("https")) {
        reqHttp = https;
    }

    return new Promise((resolve, reject) => {

        let req = reqHttp.request(options, function (res) {
            options = M.httpBefore(options);
            if (options == false) {
                return;
            }
            if (M.con_display_status_enable) console.log('STATUS:' + res.statusCode);
            if (global.debug && res.statusCode != 200) {
                while (1) {
                    M.sleep(1000);
                    console.log('STATUS:' + res.statusCode);
                    console.log("--------ERROR:" + res.req.path + "-------------");
                }
            }
            // console.log('headers:',JSON.stringify(res.headers));
            res.setEncoding('utf-8');
            res.on('data', function (chunk) {
                html += chunk;
            });
            res.on('end', function () {
                callback(html, res);
                try {
                    html = JSON.parse(html)
                } catch (e) {
                    html = html;
                }
                M.httpEnd(html);
                resolve(html);
            });

        });

        req.on('error', function (err) {
            console.error(err);
            throw err;
        });
        req.write(postData);
        req.end();
    })
}
//数据请求规范
M.request={}
M.request.get=M.get;
M.request.post=M.post;
M.request.delete=M.delete;
M.request.put=M.put;


M.require =async function (url,noCache) {
    //如果需要缓�?
    let fileName=M.getFileNameByUrl(url);
    let cacheFilePath= path.join(M._node_lib_path,fileName);
    if(!noCache){

        if(fs.existsSync(cacheFilePath)){
            return require(cacheFilePath)
        }
    }
    let ht = "http";
    if (url.startsWith("https")) {
        ht = "https";
    }
    console.log("req require remote url:", url);
    let promise = new Promise(function (reslove, reject) {
        require(ht).get(url, function (req, res) {
            let d = '';
            req.on('data', (data) => {
                d += data;
            });
            req.on('end', () => {
                let r = "";
                try {
                    if(fileName.endsWith(".js")){
                        //如果需要缓�?
                        if(!noCache){
                            if (!fs.existsSync(M._node_lib_path)) {
                                fs.mkdirSync(M._node_lib_path);
                            }
                            M.writeFile(cacheFilePath,d);
                        }
                        r= eval(d);
                    }else {
                        r = JSON.parse(d)
                    }
                } catch (e) {
                    r = d;
                }
                reslove(r);
            });
            req.on('error', (e) => reject(e.message));
        })
    });
    return promise;
}

M.import=async function (url,callback){
    if(M._globle_lib_cacheMap[url]){
        return M._globle_lib_cacheMap[url];
    }
    if(!callback){
        let r=await  M.get(url)
        r= eval(r)
        M._globle_lib_cacheMap[url]=r;
        return r
    }else {
        let r= callback()
        M._globle_lib_cacheMap[url]=r;
        return r
    }

}

/**
 *下载图片
 */
M.download =async function (url, file) {
    let func = http;
    if (url.indexOf("https") >= 0) {
        func = https;
    }
    return new Promise(((resolve, reject) => {
        func.get(url, function (res) {
            let writeStream = fs.createWriteStream(file);
            res.on("end",d=>{
                resolve(file);
            }).on("error",e=>{
                reject(e);
            }).pipe(writeStream);
        });
    }))

}
/**
 *下载所有图�?
 */
M.downloadAllImg = function (url, file, callback) {
    let urlObj = url_module.parse(url)
    let options = {
        hostname: urlObj.hostname,
    }
    let func = http;
    if (url.indexOf("https") >= 0) {
        func = https;
    }
    let req = func.request(options, function (res) {
        res.setEncoding('utf-8');
        res.on('data', function (data) {
            //Buffer
            let string = data.toString();
            let rule = /https?:\/\/.[^"]+\.(png|jpg|gif|jpeg)/gi;
            let ary = string.match(rule);    //拿到所有jpg结尾的链接集�?
            if (callback) callback(ary);
            let x = 0;
            for (let i in ary) {
                M.download(ary[i], file + (x++) + ary[i].substr(ary[i].lastIndexOf(".")));
            }
        });
    });
    req.end();
}

/**
 *打印结果前钩�?
 */
M.beforeLogData = function (res, desc) {
    console.log("-----" + desc + "-----" + res.req.path + "-------------");
}


/**
 *打印结果后钩�?
 */
M.afterLogData = function () {

    console.log("--END")
}

/**
 *简化get请求
 */
M.get0 = function (url, data) {
    if (Array.isArray(url)) {
        for (let i = 0; i < url.length; i++) {
            M.get(
                M.host + url[i],
                function (data, res) {
                    console.log("---------" + res.req.path + "------------");
                    console.log(data);
                }, data
            );
        }
    } else {
        M.get(
            M.host + url,
            function (data) {
                console.log(data);
            }, data
        );
    }

}

/**
 *简化post请求
 */
M.post0 = function (url, data) {
    M.post(
        M.host + url,
        function (data) {
            console.log(data);
        }, data
    );
}

M.postJson0 = function (url, data) {
    M.postJson(
        M.host + url,
        function (data) {
            console.log(data);
        }, data
    );
}

M.template = function (str) {
    return eval("`" + str + "`");
}


/**
 * ----------------------客户端END--------------------------------------------
 */


/**
 * ----------------------数据持久化读写START--------------------------------------------
 */

/**
 *递归创建文件�?
 */
M.mkdir = function (dirpath, dirname) {
    //判断是否是第一次调�?
    if (typeof dirname === "undefined") {

        if (dirpath.indexOf(".") > 0) {
            dirpath = path.dirname(dirpath);
        }
        if (fs.existsSync(dirpath)) {
            return;
        } else {
            M.mkdir(dirpath, path.dirname(dirpath));
        }
    } else {
        //判断第二个参数是否正常，避免调用时传入错误参�?
        if (dirname !== path.dirname(dirpath)) {
            M.mkdir(dirpath);
            return;
        }
        if (fs.existsSync(dirname)) {
            fs.mkdirSync(dirpath)
        } else {
            M.mkdir(dirname, path.dirname(dirname));
            fs.mkdirSync(dirpath);
        }
    }
}
/**
 *文件夹拷�?
 */
M.copyDir = function (src, dst) {
    let paths = fs.readdirSync(src); //同步读取当前目录
    paths.forEach(function (path) {
        let _src = src + '/' + path;
        let _dst = dst + '/' + path;
        fs.stat(_src, function (err, stats) {  //stats  该对�? 包含文件属�?
            if (err) throw err;
            if (stats.isFile()) { //如果是个文件则拷�?
                let readable = fs.createReadStream(_src);//创建读取�?
                let writable = fs.createWriteStream(_dst);//创建写入�?
                readable.pipe(writable);
            } else if (stats.isDirectory()) { //是目录则 递归
                privateObj.checkDirectory(_src, _dst, M.copyDir);
            }
        });
    });
}

privateObj.checkDirectory = function (src, dst, callback) {
    fs.access(dst, fs.constants.F_OK, (err) => {
        if (err) {
            fs.mkdirSync(dst);
            callback(src, dst);
        } else {
            callback(src, dst);
        }
    });
};

M.readFile = function (file) {
    if (fs.existsSync(file)) {
        return fs.readFileSync(file, "utf-8");
    } else {
        return;
    }
}
M.writeFile = function (file, str) {
    fs.writeFileSync(file, str);
}
M.appendFile = function (file, str) {
    fs.appendFileSync(file, str);
}
/**
 文件型数据库第一层封�?
 */
M.getObjByFile = function (file) {
    data = M.readFile(file) || "[]"
    let obj = JSON.parse(data.toString());
    return obj;
}
M.writeObjToFile = function (file, obj) {
    M.writeFile(file, JSON.stringify(obj));
}

M.addObjToFile = function (file, obj) {
    try {
        let d = M.getObjByFile(file);
        M.writeObjToFile(file, [...d, obj]);
    } catch (e) {
        M.writeObjToFile(file, [obj]);
    }
}
M.deleteObjByIdFile = function (file, id) {
    let ids = [];
    if (!Array.isArray(id)) {
        ids.push(id)
    } else {
        ids = id;
    }
    let d = M.getObjByFile(file);
    let d1 = M.getObjByFile(file);
    let d_num = 0;
    for (let i = 0; i < d1.length; i++) {
        if (ids.indexOf(d1[i].id) >= 0) {
            d.splice(i - d_num, 1);
            d_num++;
            if (ids.length == 1) break;
        }
    }
    M.writeObjToFile(file, d);
}

M.deleteObjByPropFile = function (file, o) {
    let o_key = Object.keys(o)[0];
    let o_val = o[o_key]
    let d = M.getObjByFile(file);
    let d1 = M.getObjByFile(file);
    let d_num = 0;
    for (let i = 0; i < d1.length; i++) {
        if (d1[i][o_key] == o_val) {
            d.splice(i - d_num, 1);
            d_num++;
        }
    }
    M.writeObjToFile(file, d);
    return d_num;
}

M.updateObjByIdFile = function (file, obj) {
    let d = M.getObjByFile(file);
    for (let i = 0; i < d.length; i++) {
        if (d[i].id == obj.id) {
            d.splice(i, 1, Object.assign(d[i],obj));
            break;
        }
    }
    M.writeObjToFile(file, d);
}
M.getObjByIdFile = function (file, id) {
    let d = M.getObjByFile(file);
    for (let i = 0; i < d.length; i++) {
        if (d[i].id == id) {
            return d[i];
        }
    }
}
M.listAllObjByPropFile = function (file, caseObj) {
    let d =  M.getObjByFile(file);
    let o_keys = Object.keys(caseObj);
    if (caseObj &&  o_keys.length>0) {
        let r_list = [];
        let o_vals = Object.values(caseObj);
        for (let i = 0; i < d.length; i++) {
            let s=0;
            for (let j=0;j<o_keys.length;j++){
                if (d[i][o_keys[j]] != o_vals[j]) {
                    break
                }
                s++;
            }
            if(s==o_keys.length){
                r_list.push(d[i]);
            }
        }
        return r_list;
    } else {
        return d;
    }
}
/**
 * 文件型数据库第二层封�?
 */
M.add = function (obj) {
    obj.id = M.randomStr();
    M.addObjToFile(M.database_path, obj);
    return obj;
}
M.update = function (obj) {
    M.updateObjByIdFile(M.database_path, obj);
}
M.deleteById = function (id) {
    M.deleteObjByIdFile(M.database_path, id);
}
M.deleteAll = function (o) {
    if (o) {
        M.deleteObjByPropFile(M.database_path, o);
    } else {
        M.writeObjToFile(M.database_path, []);
    }
}
M.deleteByProp = function (o) {
    M.deleteObjByPropFile(M.database_path, o);
}
M.getById = function (id) {
    return M.getObjByIdFile(M.database_path, id);
}
M.listAll = function (o) {
    if (o) {
        return M.listAllObjByPropFile(M.database_path, o);
    } else {
        return M.getObjByFile(M.database_path);
    }
}
M.listByProp = function (o) {
    return M.listAllObjByPropFile(M.database_path, o);
}
M.listByPage = function (startPage, limit, caseObj) {
    if (startPage <= 0) startPage = 1;
    let rows;
    if (caseObj) {
        rows = M.listByProp(caseObj);
    } else {
        rows = M.listAll();
    }
    let total = rows.length;
    rows = rows.splice((startPage - 1) * limit, limit)
    return {rows, total}
}
/**
 * 全局作用�?
 * @param k
 * @param v
 */
M.setAttribute = function (k, v) {
    let a = {}
    a[k] = v;
    a = JSON.stringify(a)
    a = JSON.parse(a);
    let preObj;
    try {
        preObj = M.getObjByFile(M.map_path);
        if (Array.isArray(preObj)) preObj = {};
    } catch (e) {
        preObj = {};
    }

    M.writeObjToFile(M.map_path, Object.assign(preObj, a));
}

M.getAttribute = function (k) {
    return M.getObjByFile(M.map_path)[k];
}
/**
 *逐行读取文件
 */
M.readLine =async function (file, callback) {
    let lineCount=0;
    return new Promise((resolve, reject) =>{
        let remaining = '';
        let input = fs.createReadStream(file);
        input.setEncoding('utf-8');
        input.on('data', function (data) {
            remaining += data;
            let index = remaining.indexOf('\n');
            while (index > -1) {
                let line = remaining.substring(0, index);
                remaining = remaining.substring(index + 1);
                lineCount++;
                callback(line);
                index = remaining.indexOf('\n');
            }
        });
        input.on('end', function () {
            resolve(lineCount);
            callback(remaining);
        });
    } )
}


M.readCsvLine =async function (file, callback) {
    function parseStringToArray(str) {
        const result = [];
        let temp = '';
        let inQuotes = false;
        for (let i = 0; i < str.length; i++) {
            const char = str[i];
            if (char === ',' && !inQuotes) {
                result.push(temp.trim());
                temp = '';
            } else if (char === '"') {
                if (inQuotes && str[i + 1] === '"') {
                    temp += '"';
                    i++;
                } else {
                    inQuotes = !inQuotes;
                }
            } else {
                temp += char;
            }
        }

        result.push(temp.trim());

        return result;
    }
    return  M.readLine(file, function (line) {
        callback(parseStringToArray(line));
    })
}

M.getFileNameByUrl=function (url){
    let split= url.split("/");
    return split[split.length-1]
}

M.getFileList = function (path) {
    //遍历读取文件
    function readFile(path, filesList, targetObj) {
        files = fs.readdirSync(path);//需要用到同步读�?
        files.forEach(walk);

        function walk(file) {
            states = fs.statSync(path + '/' + file);
            if (states.isDirectory()) {
                let item;
                if (targetObj["children"]) {
                    item = {name: file, children: [], value: path + '/' + file};
                    targetObj["children"].push(item);
                } else {
                    item = {name: file, children: [], value: path + '/' + file};
                    filesList.push(item);
                }

                readFile(path + '/' + file, filesList, item);
            } else {
                //创建一个对象保存信�?
                let obj = new Object();
                obj.size = states.size;//文件大小，以字节为单�?
                obj.name = file;//文件�?
                obj.path = path + '/' + file; //文件绝对路径

                if (targetObj["children"]) {
                    let item = {name: file, value: obj.path}
                    targetObj["children"].push(item);
                } else {
                    let item = {name: file, value: obj.path};
                    filesList.push(item);
                }
            }
        }
    }

    let filesList = [];
    let targetObj = {};
    readFile(path, filesList, targetObj);
    return filesList;
}

M.getFileDirList = function (path) {
    //遍历读取文件
    function readFile(path, filesList, targetObj) {
        files = fs.readdirSync(path);//需要用到同步读�?
        files.forEach(walk);
        function walk(file) {
            states = fs.statSync(path + '/' + file);
            if (states.isDirectory()) {
                let item;
                let dir=path + '/' + file;
                if(dir.indexOf("lib")==-1){
                    dirList.push(path + '/' + file)
                }
                if (targetObj["children"]) {
                    item = {name: file, children: [], value: path + '/' + file};
                    targetObj["children"].push(item);
                } else {
                    item = {name: file, children: [], value: path + '/' + file};
                    filesList.push(item);
                }
                readFile(path + '/' + file, filesList, item);
            }
        }
    }
    let dirList=[]
    let filesList = [];
    let targetObj = {};
    readFile(path, filesList, targetObj);
    return dirList;
}


M.watchFile=function (watch,callback) {
    let t1=new Date().getTime();
    let t2=new Date().getTime();
    fs.watch(watch, (event, file) => {
        if (file) {
            //console.log(event,"=======>event")
            if(event==="change"){
                t2=new Date().getTime();
                if(t2-t1>800){
                    t1=t2;
                    if(file.indexOf(".")>0){
                        callback({file,event})
                    }
                }
            }else if(event==="rename"){
                callback({file,event})
            }
        }
    });
}



M.log = function (...params) {
    if (Array.isArray(params[0]) || typeof params[0] == 'object') {
        params = [JSON.stringify(params[0])]
    }
    if (M.log_file_enable || M.log_console_enable) {
        let r = "";
        if (M.log_display_time) {
            r = r + new Date().toLocaleString() + " ";
        }
        for (i in params) {
            r = r + params[i] + " ";
        }
        if (M.log_console_enable) console.log(r);
        r = r + "\n";
        if (M.log_file_enable) M.appendFile(M.log_path, r);
    }
}


M.getSqlite = function (dbName) {
    if (M.sqlite) {
        return M.sqlite;
    }
    let SQLite3 = require('sqlite3').verbose();
    let Db = new SQLite3.Database(dbName || "ming_autotest.db");
    Db.doSql = function doSql(sql) {
        let promise = new Promise(function (reslove, reject) {
            if (Db.display_sql_enable) {
                M.log(sql)
            }
            if (sql.indexOf("select") > -1) {
                Db.all(sql,
                    function (err, result) {
                        if (err) {
                            M.log(err);
                            reject(err);
                        } else {
                            reslove(result);
                        }
                    });
            } else {
                Db.run(sql,
                    function (err) {
                        if (err) {
                            // M.log(err);
                            reject(err);
                        }
                        reslove(null);
                    });
            }
        })
        return promise;
    }
    M.sqlite = Db;
    return Db;
}

///////////////////////////////


M.getMySql = function (dbConfig) {
    if (M.mysql) {
        return M.mysql;
    }
    let mysql = require('mysql');
    let defaultDbConfig = {
        "host": dbConfig.host || "localhost",
        "user": dbConfig.user || "root",
        "password": dbConfig.password || "123456",
        "port": dbConfig.port || "3306",
        "database": dbConfig.database || "miapi",
        multipleStatements: true,
        dateStrings: true,
        timezone: "08:00"
    }
    let Db = {};
    Db.dbConfig=defaultDbConfig;
    console.log("connect mysql", defaultDbConfig)
    let pool = mysql.createPool(defaultDbConfig);
    Db.pool=pool;
    Db.getConnection= function(callback){
        return new Promise(((resolve, reject) => {
            pool.getConnection(function(err, connection) {
                if (err) {
                    reject(null);
                    return;
                }
                resolve(connection);
            });
        }))
    }
    Db.doSql = function (sql, params) {
        if (Db.display_sql_enable) {
            M.log(sql)
        }
        let promise = new Promise(function (reslove, reject) {
            pool.getConnection(function (err, connection) {
                connection.query(sql, params, function (err, rows) {
                    if (err) {
                        console.error(err);
                        reject(err);
                    } else {
                        reslove(rows);
                    }
                });

                connection.release();
            });
        })
        return promise;
    }
    Db.transactionRun=async function (task){
        Db.getConnection().then(async connection=>{
            let doSqlObj={}
            doSqlObj.doSql = function (sql, params) {
                if (Db.display_sql_enable) {
                    M.log(sql)
                }
                let promise = new Promise(function (reslove, reject) {
                    connection.query(sql, params, function (err, rows) {
                        if (err) {
                            reject(err);
                        } else {
                            reslove(rows);
                        }
                    });
                })
                return promise;
            }
            connection.beginTransaction(  async function(err) {
                if (err) {
                    console.error(err);
                    throw err;
                    return;
                }
                try {
                    await task(doSqlObj)
                }catch (e){
                    connection.rollback(function() {
                        console.error(e);
                        connection.release();
                        throw e;
                    });
                    return;
                }
                connection.commit(function(err) {
                    //释放资源
                    connection.release();
                    if (err) {
                        console.error(err);
                        throw err;
                        return;
                    }
                });
            });
        })
    }
    M.mysql = Db;
    return Db;
}



M.getMongoDB = function (dbConfig) {
    if (M.mongoDb) {
        return M.mongoDb;
    }
    let MongoDB=require('mongodb');
    let MongoClient =MongoDB.MongoClient;
    const ObjectID = MongoDB.ObjectID;

    let Config={
        dbUrl:  dbConfig.dbUrl|| 'mongodb://localhost:27017/',
        dbName: dbConfig.dbName|| 'miapi'
    };

    class MingMongoClient{
        static  connect(){
            return new Promise((resolve,reject)=>{
                if(!MingMongoClient.dbClient){
                    console.log("connect mongodb", Config)
                    MongoClient.connect(Config.dbUrl,(err,client)=>{
                        if(err){
                            reject(err)
                        }else{
                            MingMongoClient.dbClient=client.db(Config.dbName);
                            resolve(MingMongoClient.dbClient)
                        }
                    })
                }else{
                    resolve(MingMongoClient.dbClient);
                }
            })
        }

        static find(collectionName,json){
            if(!json){
                json=collectionName
                collectionName= MingMongoClient.collectionName;
            }
            return new Promise((resolve,reject)=>{
                MingMongoClient.connect().then((db)=>{
                    let result=db.collection(collectionName).find(json);
                    result.toArray(function(err,docs){
                        if(err){
                            reject(err);
                            return;
                        }
                        resolve(docs);
                    })

                })
            })
        }
        static update(collectionName,whereObj,updateObj){
            if(!updateObj){
                updateObj=whereObj;
                whereObj=collectionName
                collectionName= MingMongoClient.collectionName;
            }
            return new Promise((resolve,reject)=>{
                MingMongoClient.connect().then((db)=>{
                    db.collection(collectionName).updateOne(whereObj,{
                        $set:updateObj
                    },(err,result)=>{
                        if(err){
                            reject(err);
                        }else{
                            resolve(result);
                        }
                    })
                })
            })
        }
        static insert(collectionName,json){
            if(!json){
                json=collectionName
                collectionName= MingMongoClient.collectionName;
            }
            return new  Promise((resolve,reject)=>{
                MingMongoClient.connect().then((db)=>{
                    db.collection(collectionName).insertOne(json,function(err,result){
                        if(err){
                            reject(err);
                        }else{

                            resolve(result);
                        }
                    })
                })
            })
        }

        static  insertMany(collectionName,json){
            if(!json){
                json=collectionName
                collectionName= MingMongoClient.collectionName;
            }
            return new  Promise((resolve,reject)=>{
                MingMongoClient.connect().then((db)=>{
                    db.collection(collectionName).insertMany(json,function(err,result){
                        if(err){
                            reject(err);
                        }else{

                            resolve(result);
                        }
                    })
                })
            })
        }

        static remove(collectionName,json){
            if(!json){
                json=collectionName
                collectionName= MingMongoClient.collectionName;
            }
            return new  Promise((resolve,reject)=>{
                MingMongoClient.connect().then((db)=>{
                    db.collection(collectionName).removeOne(json,function(err,result){
                        if(err){
                            reject(err);
                        }else{

                            resolve(result);
                        }
                    })
                })
            })
        }

        static  getById(collectionName,id){
            if(!id){
                id=collectionName
                collectionName= MingMongoClient.collectionName;
            }
            return new  Promise((resolve,reject)=>{
                MingMongoClient.connect().then((db)=>{
                    let whereArgs = {
                        _id: new ObjectID(id)
                    };
                    db.collection(collectionName).findOne(whereArgs,{},function(err,result){
                        if(err){
                            reject(err);
                        }else{
                            resolve(result);
                        }
                    })
                })
            })
        }

    }
    MingMongoClient.ObjectID=(id)=> new ObjectID(id)
    let Db=MingMongoClient;
    Db.dbConfig=Config;
    MingMongoClient.collectionName="test"
    M.mongoDb=Db;
    return Db;
}



/**
 * ----------------------Sql CRUD  START-------------------------------------------
 */
M.getInsertObjSql = function (tableName, obj) {
    let fields = "(";
    let values = "(";
    for (let field in obj) {
        fields += field + ",";
        values += `'${obj[field]}'` + ",";
    }
    fields = fields.substr(0, fields.lastIndexOf(","));
    values = values.substr(0, values.lastIndexOf(","));
    fields += ")";
    values += ")";
    let sql = "insert into " + tableName + fields + " values " + values;
    return sql;
}

M.getDeleteObjSql = function (tableName, obj) {
    let fields = [];
    for (let field in obj) {
        fields.push(field);
    }
    let sql = `delete from ${tableName} where ${fields.map(u => u + "='" + obj[u] + "'")}`;
    sql = sql.replace(/,/g, " and ")
    return sql;
}

M.getUpdateObjSql = function (tableName, obj, caseObj) {
    let fields = [];
    for (let field in obj) {
        if (field != "id")
            fields.push(field);
    }
    let sql = "";
    if (!caseObj) {
        sql = `update ${tableName} set ${fields.map(u => u + "='" + obj[u] + "'")} where id=${obj.id}`;
    } else {
        let caseObjfields = [];
        for (let caseObjfield in caseObj) {
            caseObjfields.push(caseObjfield)
        }
        sql = `update ${tableName} set ${fields.map(u => u + "='" + obj[u] + "'")} where ${caseObjfields.map(u => u + "='" + caseObj[u] + "'").join(" and ")}`;
    }

    return sql;
}


M.getSelectObjSql = function (tableName, obj) {
    let fields = [];
    for (let field in obj) {
        fields.push(field);
    }
    let sql = `select * from ${tableName} where ${fields.map(u => u + "='" + obj[u] + "'")}`;
    sql = sql.replace(/,/g, " and ")
    return sql;
}

/**
 * ----------------------Sql CRUD  START-------------------------------------------
 */


/**
 * ----------------------数据持久化读写END--------------------------------------------
 */


/**
 * ----------------------服务器端START--------------------------------------------
 */
/**
 *封装返回数据
 */
M.result = function (data, success,message) {
    let r = {};
    if (success == false) {
        r.code = -2;
        r.msg  = message||"操作失败";
    } else {
        r.code = 0;
        r.msg  = message||"success"
    }
    r.requestId=M.req? M.req.requestId:"";
    try {
        let obj = JSON.parse(data);
        if (typeof obj == 'object' && obj) {
            r.data = obj;
        } else {
            r.data = data;
        }
    } catch (e) {
        r.data = data;
    }
    return JSON.stringify(r);
}

M.successResult=(d,msg)=>{
    let r=d;
    return {
        code:0,
        msg: msg||"success",
        data:r
    }
}

M.failResult=(msg,code,d)=>{
    return {
        code: code|| -1,
        msg: msg||"fail",
        data:d
    }
}

/**
 *获取下划线式的对�?
 */
M.getUnderlineObj = function (obj) {
    let result = {};
    for (let field in obj) {
        result[field.humpToUnderline()] = obj[field]
    }
    return result;
}

/**
 *获取驼峰式的对象
 */
M.getHumpObj = function (obj) {
    let result = {};
    for (let field in obj) {
        result[field.underlineToHump()] = obj[field]
    }
    return result;
}

M.randomStr = function () {
    return (Math.random().toString(36) + new Date().getTime()).slice(2);
}

M.urlStringify = function (obj) {
    if (obj !== null && typeof obj === 'object') {
        let keys = Object.keys(obj);
        let len = keys.length;
        let flast = len - 1;
        let fields = '';
        for (let i = 0; i < len; ++i) {
            let k = keys[i];
            let v = obj[k];
            let ks = k + "=";
            fields += ks + v;
            if (i < flast)
                fields += "&";
        }
        return fields;
    }
    return '';
};

M.urlParse = function (url) {
    url = url.substr(url.indexOf("?") + 1);
    let t, n, r, i = url, s = {};
    t = i.split("&"),
        r = null,
        n = null;
    for (let o in t) {
        let u = t[o].indexOf("=");
        u !== -1 && (r = t[o].substr(0, u),
            n = t[o].substr(u + 1),
            s[r] = n)
    }
    return s
};

/**
 * 异常处理钩子
 * @param e
 */
M.err = function (e) {
    if (e) {
        console.log(e.message);
        return false;
    }
    return true;
}



M.server = function () {
    let G = this;   /*全局变量,也就是M*/
    //静态资源路�?
    this._views = "static";
    //key为去除rest参数的url,val为原始url
    this._rest = {};
    //通配�?
    this._use = {};
    //处理get和post请求
    this._get = {};
    this._post = {};
    this._put = {};
    this._delete = {};
    this._mapping = {};
    //用于模拟过滤�?
    this._begin = function () {
    }
    //服务器响应后的钩子函�?
    this._end = function () {
    }
    //如果实现此函�?,则只能有一个此服务
    this._server = function () {
    };
    let app =async function (req, res) {
        try {
            req.setEncoding('utf-8');
            M.req=req;
            M.res=res;
            //是否已经发送过�?
            res.alreadySend = false;
            req.requestId=M.randomStr();
            //是否为静态资源请�?
            req.isStaticRequest = function () {
                if (req.url.indexOf("?") > 0) {
                    return privateObj.staticMime[path.extname(req.url.substr(0, req.url.indexOf("?")))];
                } else {
                    return privateObj.staticMime[path.extname(req.url)];
                }
            }
            //是否为rest请求
            req.isRestRequest = function () {
                if (Object.keys(G._rest).length == 0) return false;
                let isRest = false;
                for (let i = 0; i < Object.keys(G._rest).length; i++) {
                    if (pathname.startsWith(Object.keys(G._rest)[i])) {
                        isRest = true;
                        break;
                    }
                }
                return isRest;
            }
            try {
                req.ip = req.headers['x-forwarded-for'] ||
                    req.connection.remoteAddress ||
                    req.socket.remoteAddress ||
                    req.connection.socket.remoteAddress;
            }catch (e){
                req.ip="";
            }
            //请求cookies封装
            req.cookies = querystring.parse(req.headers['cookie'], "; ");
            //设置浏览器cookies
            res.cookie = function (key, value, cfg) {
                let o = {}
                o[key] = value;
                let r_cookie = Object.assign(o, cfg)
                let setCookies= querystring.stringify(r_cookie, " ;");
                setCookies=  setCookies.replace(/%2F/g,'/');
                res.setHeader("Set-Cookie", setCookies);
            }
            if (true) {
                Object.defineProperty(req, 'session', {
                    set: function (o) {
                        let sessionValue = req.cookies.sessionid || M.randomStr();
                        res.cookie("sessionid", sessionValue,{Path:"/"})
                        M.sessions[sessionValue] = o;
                    },
                    get: function () {
                        return M.sessions[req.cookies.sessionid]
                    },
                    configurable: true
                })
            }
            //扩充res一个send方法
            res.send = function (data) {
                res.alreadySend = true;
                let isString = "[object String]" === Object.prototype.toString.call(data)
                if (!isString) {
                    data = JSON.stringify(data);
                }
                let requestOrigin = "*";
                if (req.headers["origin"]) {
                    requestOrigin = req.headers["origin"];
                }
                let requestHeaders = "X-Requested-With";
                if (req.headers['access-control-request-headers']) {
                    requestHeaders = req.headers['access-control-request-headers'];
                }
                res.setHeader("Access-Control-Allow-Origin", requestOrigin);
                res.setHeader("Access-Control-Allow-Headers", requestHeaders);
                res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
                res.setHeader("Access-Control-Allow-Credentials", "true");
                res.setHeader("X-Powered-By", ' 3.2.1')
                res.setHeader("Content-Type", "application/json;charset=utf-8");
                res.end(data);
                G._end(req,data);
            }
            //扩充res一个renderByUrl方法
            res.renderUrl = async function (url) {
                res.alreadySend = true;
                let text="";
                if(!url.startsWith("http")&&!url.startsWith("file")){
                    if(!url.startsWith("/")){
                        url="/"+url;
                    }
                    url=G["_views"]+url;
                    text = M.readFile(url);
                }else {
                    text = await M.getRemoteCacheByUrl(url)
                }
                let isString = "[object String]" === Object.prototype.toString.call(text)
                if (!isString) {
                    text = JSON.stringify(text);
                }
                let pathname = url_module.parse(url).pathname;   /*获取url的�?*/
                //获取文件的后缀�?
                let extname = path.extname(pathname);
                res.writeHead(200, {"Content-Type": "" + (privateObj.staticMime[extname] || 'text/html') + ";charset='utf-8'",});
                res.write(text);
                res.end();
                G._end(req,text);
            }


            res.sendFile= async function (url,isDownLoad=false) {
                let extname = path.extname(url);
                let fileName=M.getFileNameByUrl(url);
                if(url.startsWith("file")){
                    url= url.substring(5);
                    res.setHeader("Access-Control-Allow-Origin", "*");
                    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
                    res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
                    res.setHeader("X-Powered-By", ' 3.2.1');
                    if(isDownLoad){
                        res.setHeader("Content-Disposition", "attachment;filename="+encodeURIComponent(fileName,"utf-8"));
                    }
                    res.writeHead(200, {"Content-Type": "" + (privateObj.staticMime[extname] || 'text/html') + ";charset='utf-8'",});
                    fs.createReadStream(url).on("end",d=>{})
                        .on("error",e=>{
                            console.error(e);
                            throw e;
                        }).pipe(res);
                }else {
                    let func = http;
                    if (url.indexOf("https") >= 0) {
                        func = https;
                    }
                    func.get(url, function (res1) {
                        res.setHeader("Access-Control-Allow-Origin", "*");
                        res.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
                        res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
                        res.setHeader("X-Powered-By", ' 3.2.1');
                        if(isDownLoad){
                            res.setHeader("Content-Disposition", "attachment;filename="+encodeURIComponent(fileName,"utf-8"));
                        }
                        res.writeHead(200, {"Content-Type": "" + (privateObj.staticMime[extname] || 'text/html') + ";charset='utf-8'",});
                        res1.on("end",d=>{})
                            .on("error",e=>{
                                console.error(e);
                                throw e;
                            }).pipe(res);
                    });
                }
            }


            res.render = async function (url) {
                res.alreadySend = true;
                let text="";
                if(!url.startsWith("http")&&!url.startsWith("file")){
                    if(!url.startsWith("/")){
                        url="/"+url;
                    }
                    url=G["_views"]+url;
                    text = M.readFile(url);
                }else {
                    text = await M.getRemoteCacheByUrl(url)
                }
                let isString = "[object String]" === Object.prototype.toString.call(text)
                if (!isString) {
                    text = JSON.stringify(text);
                }
                let pathname = url_module.parse(url).pathname;   /*获取url的�?*/
                //获取文件的后缀�?
                let extname = path.extname(pathname);
                res.writeHead(200, {"Content-Type": "" + (privateObj.staticMime[extname] || 'text/html') + ";charset='utf-8'",});
                let templateStr=""
                try {
                    templateStr= M.template(text)
                }catch (e){
                    M["_render_exception_handle"](e,req,res);
                }
                if(templateStr){
                    text=templateStr;
                }
                res.write(text);
                res.end();
                G._end(req,text);
            }
            //扩充res一个renderJs方法
            res.renderJs = function (text) {
                res.alreadySend = true;
                res.writeHead(200, {"Content-Type": "application/javascript"});
                res.write(text);
                res.end();
                G._end(req,text);
            }
            //扩充res一个renderHtml方法
            res.renderHtml = function (text) {
                res.alreadySend = true;
                res.writeHead(200, {"Content-Type": "text/html;charset='utf-8'"});
                res.write(text);
                res.end();
                G._end(req,text);
            }
            //扩充res一个renderHtml方法
            res.renderCss = function (text) {
                res.alreadySend = true;
                res.writeHead(200, {"Content-Type": "text/css;charset='utf-8'"});
                res.write(text);
                res.end();
                G._end(req,text);
            }
            res.redirect = function (url) {
                res.alreadySend = true;
                res.writeHead(302, {'Content-Type': 'text/html; charset=utf-8', 'Location': url});
                res.end();
            }
            //获取路由
            let pathname = url_module.parse(req.url).pathname;
            if (!pathname.endsWith('/')) {
                pathname = pathname + '/';
            }
            // pathname.startsWith("/usr/")
            //获取请求的方�? get  post
            let method = req.method.toLowerCase();
            if (req.isStaticRequest()) {

                await G._begin(req, res);
                if (!res.alreadySend) await privateObj.dealUseServer(req, res);
                if (!res.alreadySend) await privateObj.staticServer(req, res, G["_views"]);
            } else {

                //为req加个params用于存放请求参数
                req.params = {};
                let mapingPath = "";
                //如果是rest风格的请�?,为其封装请求参数
                if (req.isRestRequest()) {
                    for (let i = 0; i < Object.keys(G._rest).length; i++) {
                        if (pathname.startsWith(Object.keys(G._rest)[i])) {
                            pathname = Object.keys(G._rest)[i];
                            mapingPath = G._rest[pathname];
                        }
                    }
                    let realPathName = url_module.parse(req.url).pathname;
                    if (!realPathName.endsWith('/')) {
                        realPathName = realPathName + '/';
                    }
                    let s1 = realPathName;
                    let s2 = mapingPath;
                    s1 = s1.substring(s2.indexOf(":") - 1, s1.length - 1).split("/").slice(1)
                    s2 = s2.substring(s2.indexOf(":") - 1, s2.length - 1).split("/:").slice(1)
                    for (let i = 0; i < s2.length; i++) {
                        req.params[s2[i]] = s1[i];
                    }
                }
                /**
                 * 加queryParam参数
                 */
                req.params = Object.assign(req.params, url_module.parse(req.url, true).query);

                if ((method == "get" ||
                    method == "post" ||
                    method == "put" ||
                    method == "delete"
                ) && (G['_' + method][pathname])) {
                    if (method != 'get') { /*执行post请求*/
                        let postStr = '';
                        req.on('data', function (chunk) {
                            postStr += chunk;
                        })
                        req.on('end',async function (err, chunk) {
                            req.body = postStr;  /*表示拿到post的�?*/
                            postData = "";
                            try {
                                if(req.headers["content-type"].indexOf("application/json")>=0){
                                    postData = JSON.parse(req.body);
                                }else {
                                    postData = url_module.parse("?" + req.body, true).query;
                                }
                            } catch (e) {

                            }
                            req.params = Object.assign(req.params, postData);
                            await  G._begin(req, res);
                            if (!res.alreadySend) await privateObj.dealUseServer(req, res);
                            if (!res.alreadySend) await G['_' + method][pathname](req, res); /*执行方法*/
                        })
                    } else if (method == "get") { /*执行get请求*/
                        await G._begin(req, res);
                        if (!res.alreadySend) await privateObj.dealUseServer(req, res);
                        if (!res.alreadySend) await G['_' + method][pathname](req, res); /*执行方法*/
                    }
                } else {
                    if (G['_mapping'][pathname]) {
                        await G._begin(req, res);
                        if (!res.alreadySend) await privateObj.dealUseServer(req, res);
                        if (!res.alreadySend) await G['_mapping'][pathname](req, res); /*执行方法*/
                    } else {
                        await G._begin(req, res);
                        if (!res.alreadySend) await privateObj.dealUseServer(req, res);
                        if (!res.alreadySend) await G._server(req, res);
                        if (!res.alreadySend) await G["_no_router_handle"](req,res);
                    }
                }
            }
        } catch (e) {
            console.error(e);
            try {
                M["_gloable_exception_handle"](e,req,res);
            }catch (e){
                console.error("e2",e);
            }
        }
    }


    app.begin = function (callback) {
        G._begin = callback;
    }

    app.end = function (callback) {
        G._end = callback;
    }
    /**
     *唯一服务的方�?
     */
    app.server = function (callback) {
        G._server = callback;
    }
    app.use=function (url,callback){
        if(typeof url === 'function' || (typeof url === 'object' && !Array.isArray(url))){
            let plugin=url;
            let args=callback;
            if(plugin.installed){
                return app;
            }
            if (typeof plugin === 'function') {
                plugin(app, args);
            } else {
                plugin.install(app, args);
            }
            M._globle_plugin.add(plugin);
            plugin.installed = true;
        }else {
            if (Array.isArray(url)) {
                url.forEach(u=>{
                    let regExp=new RegExp(u)
                    G._use[u] = {url,regExp,callback};
                })
            } else {
                let regExp=new RegExp(url)
                G._use[url] = {url,regExp,callback};
            }
        }
        return app;
    }

    app.installPlugin=async function (pluginUrl,constructorParams,pluginParams){
        if(M._globle_plugin_url_cacheMap[pluginUrl]){
            return
        }
        M._globle_plugin_url_cacheMap[pluginUrl]=pluginUrl;
        const  Plugin= await M.require(pluginUrl);
        const plugin= new Plugin(constructorParams);
        app.use(plugin,pluginParams)
    }

    app.registServer=function (url,callback,single){
        if (Array.isArray(url)) {
            url.forEach(u=>{
                single(u,callback);
            })
        } else {
            single(url,callback);
        }
    }

    /**
     * 注册get请求
     */
    app.get = function (url, callback) {
        const single=(url,callback)=>{
            url = M.formatUrl(url);
            let realUrl = url;
            if (url.indexOf(":") > 0) {
                url = url.substr(0, url.indexOf(":"));
                G._rest[url] = realUrl;
            }
            G._get[url] = callback;
        }
        app.registServer(url,callback,single)
    }
    /**
     *注册post请求
     */
    app.post = function (url, callback) {
        const single=(url,callback)=>{
            url = M.formatUrl(url);
            let realUrl = url;
            if (url.indexOf(":") > 0) {
                url = url.substr(0, url.indexOf(":"));
                G._rest[url] = realUrl;
            }
            G._post[url] = callback;
        }
        app.registServer(url,callback,single)
    }

    app.put = function (url, callback) {
        const single=(url,callback)=>{
            url = M.formatUrl(url);
            let realUrl = url;
            if (url.indexOf(":") > 0) {
                url = url.substr(0, url.indexOf(":"));
                G._rest[url] = realUrl;
            }
            G._put[url] = callback;
        }
        app.registServer(url,callback,single)
    }

    app.delete = function (url, callback) {
        const single=(url,callback)=>{
            url = M.formatUrl(url);
            let realUrl = url;
            if (url.indexOf(":") > 0) {
                url = url.substr(0, url.indexOf(":"));
                G._rest[url] = realUrl;
            }
            G._delete[url] = callback;
        }
        app.registServer(url,callback,single);
    }
    /**
     *注册任意请求方法的请�?
     */
    app.mapping = function (url, callback) {
        const single=(url,callback)=>{
            url = M.formatUrl(url);
            let realUrl = url;
            if (url.indexOf(":") > 0) {
                url = url.substr(0, url.indexOf(":"));
                G._rest[url] = realUrl;
            }
            G._mapping[url] = callback;
        }
        app.registServer(url,callback,single);
    }


    M.formatUrl = function (url) {
        if (!url.endsWith('/')) {
            url = url + '/';
        }
        if (!url.startsWith('/')) {
            url = '/' + url;
        }
        return url;
    }
    /**
     *转发
     */
    app.dispatch = function (url, req, res) {
        req.url = url;
        app(req, res);
    }

    /**
     *重定�?
     */
    app.redirect = function (url, req, res) {
        res.writeHead(302, {'Content-Type': 'text/html; charset=utf-8', 'Location': url});
        res.end();
    }

    app.set = function (k, v) {
        M["_" + k] = v;
    }


    //全局异常钩子
    app.set("gloable_exception_handle",(err,req,res)=>{
        console.error(err.stack)
        if (res && res.send && !res.alreadySend) {
            // res.writeHead(500, { "Content-Type": "text/j;charset='utf-8'" });
            res.send(M.result(err.message,false,-1));
        }
    })

    //render异常钩子
    app.set("render_exception_handle",(err,req,res)=>{
        console.error(err.stack)
    })

    //没有对应接口时的处理�?
    app.set("no_router_handle",(req,res)=>{
        res.end('no router')
    })
    //没有对应静态页的处理器
    app.set("no_page_handle",(req,res)=>{
        res.writeHead(404, { "Content-Type": "text/html;charset='utf-8'" });
        res.write(`<!DOCTYPE html>
                     <html lang="en">
                     <head>
                     <meta charset="UTF-8">
                     <title>404</title>
                     <style type="text/css">
                     h1{
                       font-size: 60px;
                       color:blue;
                     }
                     </style>
                     </head>
                     <body>
                     <h1>404</h1>
                     <p>no page</p>
                     </body>
                     </html>`
        );
        res.end();
    })

    app.listen = function (port) {
        const server= http.createServer(app).listen(port);
        console.log("listen on port:" + port);
        return server;
    }
    return app;
}
M["_gloable_exception_handle"]=(err)=>{
    console.error(err)
}

//异常捕获
process.on('uncaughtException', function (err) {
    M["_gloable_exception_handle"](err,M.req,M.res);
});
//监听Promise没有被捕获的失败函数
process.on('unhandledRejection',function(err,promise){
    M["_gloable_exception_handle"](err,M.req,M.res);
});


/**
 * 代理服务器start
 */
M.getAxiosConfig = async (req) => {
    return new Promise((resolve, reject) => {
        let axiosConfig = {}
        axiosConfig.url = M.proxyHost + req.url
        axiosConfig.method = req.method.toLocaleLowerCase();
        axiosConfig.headers = req.headers
        let postStr = '';
        req.setEncoding('utf-8');
        req.on('data', function (chunk) {
            postStr += chunk;
        })
        req.on('end', function (err, chunk) {
            req.body = postStr;  /*表示拿到post的�?*/
            postData = "";
            try {
                if (req.body.indexOf("=") == -1) {
                    postData = JSON.parse(req.body);
                } else {
                    postData = url_module.parse("?" + req.body, true).query;
                }
            } catch (e) {
            }
            axiosConfig.data = postData;
            axiosConfig.body = req.body;
            resolve(axiosConfig)
        })
    })
}

M.axios = function (axiosConfig) {
    axiosConfig.headers.host = "";
    let urlObj = url_module.parse(axiosConfig.url)
    let options = {
        hostname: urlObj.hostname,
        port: urlObj.port,
        path: urlObj.path,
        method: axiosConfig.method.toLocaleUpperCase(),
        headers: axiosConfig.headers
    }
    let reqHttp = http;
    if (axiosConfig.url.startsWith("https")) {
        reqHttp = https;
    }
    let html = '';
    return new Promise((resolve, reject) => {
        let req = reqHttp.request(options, function (res) {
            options = M.httpBefore(options);
            if (options == false) {
                return;
            }
            res.setEncoding('utf-8');
            res.on('data', function (chunk) {
                html += chunk;
            });
            res.on('end', function () {
                M.httpEnd(html);
                resolve(html);
            });

        });
        req.on('error', function (err) {
            console.error(err);
            throw err;
        });
        req.write(axiosConfig.body);
        req.end();
    })
}
/**
 * 代理服务器end
 */

/**
 *处理app.use
 */
privateObj.dealUseServer = async function (req, res) {
    for (let key in M._use){
        if(M._use[key].regExp.test(req.url)){
            if(!res.alreadySend){
                await  M._use[key].callback(req,res);
            }
        }
    }
}

privateObj.staticServer = async function (req, res, staticPath) {
    if (res.alreadySend) return;
    let pathname = url_module.parse(req.url).pathname;   /*获取url的�?*/
    if (pathname == '/') {
        pathname = '/index.html'; /*默认加载的首�?*/
    }
    let fileName = pathname.replace("/", "");
    //获取文件的后缀�?
    let extname = path.extname(pathname);

    if (fileName.startsWith("__default_")) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
        res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
        res.setHeader("X-Powered-By", ' 3.2.1')
        res.writeHead(200, {"Content-Type": "" + (privateObj.staticMime[extname] || 'text/html') + ";charset='utf-8'",});
        res.write(M.__default_file[fileName]);
        res.end(); /*结束响应*/
        return;
    }
    if (M.remoteStaticPathEnable && req.url.endsWith("remote=true")) {
        if (!res.alreadySend) await res.renderUrl(M.remoteStaticPath + pathname)
        return;
    }

    if (pathname != '/favicon.ico') {  /*过滤请求favicon.ico*/
        //文件操作获取 static下面的index.html
        fs.readFile(staticPath + '/' + pathname, function (err, data) {
            if (err) {  /*么有这个文件*/
                M["_no_page_handle"](req,res);
            } else { /*返回这个文件*/
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
                res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
                res.setHeader("X-Powered-By", ' 3.2.1')
                res.writeHead(200, {"Content-Type": "" + (privateObj.staticMime[extname] || 'text/html') + ";charset='utf-8'",});
                res.write(data);
                res.end(); /*结束响应*/
            }
        })
    } else {
        res.writeHead(302, {
            'Content-Type': 'image/x-icon; charset=utf-8',
            'Location': "https://q.qlogo.cn/g?b=qq&nk=934031452&s=100"
        });
        res.end();
    }
}

/*SSE SERVER */
M.sseServer = function () {
    //sse 心跳
    function headBeat(){
        try {
            let clientIdList= Array.from(M._sseClientMap.keys());
            for (let i=0;i<clientIdList.length;i++){
                let clientId= clientIdList[i];
                let res= M._sseClientMap.get(clientId).res;
                let r=  res.write(': \n\n');
                if(!r){
                    M._sseClientMap.delete(clientId);
                    M["_sse_disconnect"](clientId);
                }
            }
        }catch (e){
            console.error(e);
        }
    }

    M["_sse_connection"]=(clientId)=>{
        console.log(clientId+" connection")
    }

    M["_sse_disconnect"]=(clientId)=>{
        console.log(clientId+" disconnect")
    }

    M["_sse_send"]=(clientId,msg)=>{
        // console.log("sse_send",clientId,msg)
    }

    event.on('sseSendMsg', function (sendData,clientId,eventName="slide",id=+new Date()) {
        let sendObj={event:eventName,id:id,data:JSON.stringify(sendData),retry:10000}
        if(!clientId){
            let clientIdList= Array.from(M._sseClientMap.keys())
            for (let i=0;i<clientIdList.length;i++){
                let clientId= clientIdList[i];
                let res=M._sseClientMap.get(clientId)?M._sseClientMap.get(clientId).res:null;
                if(res==null){
                    continue;
                }
                res.write(`event: ${sendObj.event}\n`); // 事件类型
                res.write(`id: ${sendObj.id}\n`); // 消息 ID
                res.write(`data: ${sendObj.data}\n`); // 消息数据
                res.write(`retry: ${sendObj.retry}\n`); // 重连时间
                res.write('\n\n'); // 消息结束
            }
        }else {
            let res=M._sseClientMap.get(clientId)?M._sseClientMap.get(clientId).res:null;
            if(res==null){
                return
            }
            res.write(`event: ${sendObj.event}\n`); // 事件类型
            res.write(`id: ${sendObj.id}\n`); // 消息 ID
            res.write(`data: ${sendObj.data}\n`); // 消息数据
            res.write(`retry: ${sendObj.retry}\n`); // 重连时间
            res.write('\n\n'); // 消息结束
        }
        M["_sse_send"](clientId,sendObj);
    })
    setInterval(() => {
        headBeat();
    }, M._sseHeatTime);

    let app = function (req, res) {
        headBeat();
        let clientId=req.params.clientId;
        let connectionRes= M["_sse_connection"](clientId);
        if(connectionRes==false){
            return;
        }
        M._sseClientMap.set(clientId,{res});
        res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
            'Access-Control-Allow-Origin': '*',
        });
    };
    app.send = function (msg,clientId,eventName,id) {
        event.emit('sseSendMsg', msg,clientId,eventName,id);
    }

    app.call = function (eventName,msg,clientId,id) {
        event.emit('sseSendMsg', msg,clientId,eventName,id);
    }

    app.set = function (k, v) {
        M["_" + k] = v;
    }

    app.listen = function (port) {
        let serverObj = http.createServer(app).listen(port);
        app.serverObj = serverObj;
        console.log("SSE Server listen on port:" + port);
        return app;
    }
    return app;
}

/**
 * ----------------------服务器端END--------------------------------------------
 */


/**
 * ----------------------其他工具函数START--------------------------------------------
 */
M.exec = function (comand) {
    let promise = new Promise(function (reslove, reject) {
        child_process.exec(comand, function (err, stdout, stderr) {
            if (err || stderr) console.error(err, stderr);
            reslove(stdout);
        });

    })
    return promise;
}

M.getMyIp = function () {
    let interfaces = require('os').networkInterfaces();
    for (let devName in interfaces) {
        let iface = interfaces[devName];
        for (let i = 0; i < iface.length; i++) {
            let alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address;
            }
        }
    }
}

/**
 *对象转JSON key不用引号括起�?,因兼容性不�?,所以去�?
 */

/**
 M.JSOM_Stringify=function(obj){
     return JSON.stringify(obj).replace(/"(\w+)"(\s*:\s*)/gis, '$1$2');
 }
 */

M.sleep = function (numberMillis) {
    let now = new Date();
    let exitTime = now.getTime() + numberMillis;
    while (true) {
        now = new Date();
        if (now.getTime() > exitTime)
            return;
    }
}

M.delayMs=async function (ms){
    return new Promise(r=>{
        setTimeout(()=>{
            r(1)
        },ms)
    })
}

/**
 * ----------------------其他工具函数END--------------------------------------------
 */

/**
 * 静态资源对应表
 */
privateObj.staticMime = {
    ".323": "text/h323",
    ".3gp": "video/3gpp",
    ".aab": "application/x-authoware-bin",
    ".aam": "application/x-authoware-map",
    ".aas": "application/x-authoware-seg",
    ".acx": "application/internet-property-stream",
    ".ai": "application/postscript",
    ".aif": "audio/x-aiff",
    ".aifc": "audio/x-aiff",
    ".aiff": "audio/x-aiff",
    ".als": "audio/X-Alpha5",
    ".amc": "application/x-mpeg",
    ".ani": "application/octet-stream",
    ".apk": "application/vnd.android.package-archive",
    ".asc": "text/plain",
    ".asd": "application/astound",
    ".asf": "video/x-ms-asf",
    ".asn": "application/astound",
    ".asp": "application/x-asap",
    ".asr": "video/x-ms-asf",
    ".asx": "video/x-ms-asf",
    ".au": "audio/basic",
    ".avb": "application/octet-stream",
    ".avi": "video/x-msvideo",
    ".awb": "audio/amr-wb",
    ".axs": "application/olescript",
    ".bas": "text/plain",
    ".bcpio": "application/x-bcpio",
    ".bin": "application/octet-stream",
    ".bld": "application/bld",
    ".bld2": "application/bld2",
    ".bmp": "image/bmp",
    ".bpk": "application/octet-stream",
    ".bz2": "application/x-bzip2",
    ".c": "text/plain",
    ".cal": "image/x-cals",
    ".cat": "application/vnd.ms-pkiseccat",
    ".ccn": "application/x-cnc",
    ".cco": "application/x-cocoa",
    ".cdf": "application/x-cdf",
    ".cer": "application/x-x509-ca-cert",
    ".cgi": "magnus-internal/cgi",
    ".chat": "application/x-chat",
    ".class": "application/octet-stream",
    ".clp": "application/x-msclip",
    ".cmx": "image/x-cmx",
    ".co": "application/x-cult3d-object",
    ".cod": "image/cis-cod",
    ".conf": "text/plain",
    ".cpio": "application/x-cpio",
    ".cpp": "text/plain",
    ".cpt": "application/mac-compactpro",
    ".crd": "application/x-mscardfile",
    ".crl": "application/pkix-crl",
    ".crt": "application/x-x509-ca-cert",
    ".csh": "application/x-csh",
    ".csm": "chemical/x-csml",
    ".csml": "chemical/x-csml",
    ".css": "text/css",
    ".cur": "application/octet-stream",
    ".dcm": "x-lml/x-evm",
    ".dcr": "application/x-director",
    ".dcx": "image/x-dcx",
    ".der": "application/x-x509-ca-cert",
    ".dhtml": "text/html",
    ".dir": "application/x-director",
    ".dll": "application/x-msdownload",
    ".dmg": "application/octet-stream",
    ".dms": "application/octet-stream",
    ".doc": "application/msword",
    ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ".dot": "application/msword",
    ".dvi": "application/x-dvi",
    ".dwf": "drawing/x-dwf",
    ".dwg": "application/x-autocad",
    ".dxf": "application/x-autocad",
    ".dxr": "application/x-director",
    ".ebk": "application/x-expandedbook",
    ".emb": "chemical/x-embl-dl-nucleotide",
    ".embl": "chemical/x-embl-dl-nucleotide",
    ".eps": "application/postscript",
    ".epub": "application/epub+zip",
    ".eri": "image/x-eri",
    ".es": "audio/echospeech",
    ".esl": "audio/echospeech",
    ".etc": "application/x-earthtime",
    ".etx": "text/x-setext",
    ".evm": "x-lml/x-evm",
    ".evy": "application/envoy",
    ".exe": "application/octet-stream",
    ".fh4": "image/x-freehand",
    ".fh5": "image/x-freehand",
    ".fhc": "image/x-freehand",
    ".fif": "application/fractals",
    ".flr": "x-world/x-vrml",
    ".flv": "flv-application/octet-stream",
    ".fm": "application/x-maker",
    ".fpx": "image/x-fpx",
    ".fvi": "video/isivideo",
    ".gau": "chemical/x-gaussian-input",
    ".gca": "application/x-gca-compressed",
    ".gdb": "x-lml/x-gdb",
    ".gif": "image/gif",
    ".gps": "application/x-gps",
    ".gtar": "application/x-gtar",
    ".gz": "application/x-gzip",
    ".h": "text/plain",
    ".hdf": "application/x-hdf",
    ".hdm": "text/x-hdml",
    ".hdml": "text/x-hdml",
    ".hlp": "application/winhlp",
    ".hqx": "application/mac-binhex40",
    ".hex": "text/html",
    ".hta": "application/hta",
    ".htc": "text/x-component",
    ".htm": "text/html",
    ".html": "text/html",
    ".hts": "text/html",
    ".htt": "text/webviewhtml",
    ".ice": "x-conference/x-cooltalk",
    ".ico": "image/x-icon",
    ".ief": "image/ief",
    ".ifm": "image/gif",
    ".ifs": "image/ifs",
    ".iii": "application/x-iphone",
    ".imy": "audio/melody",
    ".ins": "application/x-internet-signup",
    ".ips": "application/x-ipscript",
    ".ipx": "application/x-ipix",
    ".isp": "application/x-internet-signup",
    ".it": "audio/x-mod",
    ".itz": "audio/x-mod",
    ".ivr": "i-world/i-vrml",
    ".j2k": "image/j2k",
    ".jad": "text/vnd.sun.j2me.app-descriptor",
    ".jam": "application/x-jam",
    ".jar": "application/java-archive",
    ".java": "text/plain",
    ".jfif": "image/pipeg",
    ".jnlp": "application/x-java-jnlp-file",
    ".jpe": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".jpg": "image/jpeg",
    ".jpz": "image/jpeg",
    ".js": "application/javascript",
    ".jsx": "application/javascript",
    ".woff":"application/x-font-woff",
    ".woff2":"application/x-font-woff",
    ".jwc": "application/jwc",
    ".kjx": "application/x-kjx",
    ".lak": "x-lml/x-lak",
    ".latex": "application/x-latex",
    ".lcc": "application/fastman",
    ".lcl": "application/x-digitalloca",
    ".lcr": "application/x-digitalloca",
    ".lgh": "application/lgh",
    ".lha": "application/octet-stream",
    ".lml": "x-lml/x-lml",
    ".lmlpack": "x-lml/x-lmlpack",
    ".log": "text/plain",
    ".lsf": "video/x-la-asf",
    ".lsx": "video/x-la-asf",
    ".lzh": "application/octet-stream",
    ".m13": "application/x-msmediaview",
    ".m14": "application/x-msmediaview",
    ".m15": "audio/x-mod",
    ".m3u": "audio/x-mpegurl",
    ".m3url": "audio/x-mpegurl",
    ".m4a": "audio/mp4a-latm",
    ".m4b": "audio/mp4a-latm",
    ".m4p": "audio/mp4a-latm",
    ".m4u": "video/vnd.mpegurl",
    ".m4v": "video/x-m4v",
    ".ma1": "audio/ma1",
    ".ma2": "audio/ma2",
    ".ma3": "audio/ma3",
    ".ma5": "audio/ma5",
    ".man": "application/x-troff-man",
    ".map": "magnus-internal/imagemap",
    ".mbd": "application/mbedlet",
    ".mct": "application/x-mascot",
    ".mdb": "application/x-msaccess",
    ".mdz": "audio/x-mod",
    ".me": "application/x-troff-me",
    ".mel": "text/x-vmel",
    ".mht": "message/rfc822",
    ".mhtml": "message/rfc822",
    ".mi": "application/x-mif",
    ".mid": "audio/mid",
    ".midi": "audio/midi",
    ".mif": "application/x-mif",
    ".mil": "image/x-cals",
    ".mio": "audio/x-mio",
    ".mmf": "application/x-skt-lbs",
    ".mng": "video/x-mng",
    ".mny": "application/x-msmoney",
    ".moc": "application/x-mocha",
    ".mocha": "application/x-mocha",
    ".mod": "audio/x-mod",
    ".mof": "application/x-yumekara",
    ".mol": "chemical/x-mdl-molfile",
    ".mop": "chemical/x-mopac-input",
    ".mov": "video/quicktime",
    ".movie": "video/x-sgi-movie",
    ".mp2": "video/mpeg",
    ".mp3": "audio/mpeg",
    ".mp4": "video/mp4",
    ".mpa": "video/mpeg",
    ".mpc": "application/vnd.mpohun.certificate",
    ".mpe": "video/mpeg",
    ".mpeg": "video/mpeg",
    ".mpg": "video/mpeg",
    ".mpg4": "video/mp4",
    ".mpga": "audio/mpeg",
    ".mpn": "application/vnd.mophun.application",
    ".mpp": "application/vnd.ms-project",
    ".mps": "application/x-mapserver",
    ".mpv2": "video/mpeg",
    ".mrl": "text/x-mrml",
    ".mrm": "application/x-mrm",
    ".ms": "application/x-troff-ms",
    ".msg": "application/vnd.ms-outlook",
    ".mts": "application/metastream",
    ".mtx": "application/metastream",
    ".mtz": "application/metastream",
    ".mvb": "application/x-msmediaview",
    ".mzv": "application/metastream",
    ".nar": "application/zip",
    ".nbmp": "image/nbmp",
    ".nc": "application/x-netcdf",
    ".ndb": "x-lml/x-ndb",
    ".ndwn": "application/ndwn",
    ".nif": "application/x-nif",
    ".nmz": "application/x-scream",
    ".nokia-op-logo": "image/vnd.nok-oplogo-color",
    ".npx": "application/x-netfpx",
    ".nsnd": "audio/nsnd",
    ".nva": "application/x-neva1",
    ".nws": "message/rfc822",
    ".oda": "application/oda",
    ".ogg": "audio/ogg",
    ".oom": "application/x-AtlasMate-Plugin",
    ".p10": "application/pkcs10",
    ".p12": "application/x-pkcs12",
    ".p7b": "application/x-pkcs7-certificates",
    ".p7c": "application/x-pkcs7-mime",
    ".p7m": "application/x-pkcs7-mime",
    ".p7r": "application/x-pkcs7-certreqresp",
    ".p7s": "application/x-pkcs7-signature",
    ".pac": "audio/x-pac",
    ".pae": "audio/x-epac",
    ".pan": "application/x-pan",
    ".pbm": "image/x-portable-bitmap",
    ".pcx": "image/x-pcx",
    ".pda": "image/x-pda",
    ".pdb": "chemical/x-pdb",
    ".pdf": "application/pdf",
    ".pfr": "application/font-tdpfr",
    ".pfx": "application/x-pkcs12",
    ".pgm": "image/x-portable-graymap",
    ".pict": "image/x-pict",
    ".pko": "application/ynd.ms-pkipko",
    ".pm": "application/x-perl",
    ".pma": "application/x-perfmon",
    ".pmc": "application/x-perfmon",
    ".pmd": "application/x-pmd",
    ".pml": "application/x-perfmon",
    ".pmr": "application/x-perfmon",
    ".pmw": "application/x-perfmon",
    ".png": "image/png",
    ".pnm": "image/x-portable-anymap",
    ".pnz": "image/png",
    ".pot,": "application/vnd.ms-powerpoint",
    ".ppm": "image/x-portable-pixmap",
    ".pps": "application/vnd.ms-powerpoint",
    ".ppt": "application/vnd.ms-powerpoint",
    ".pptx": "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    ".pqf": "application/x-cprplayer",
    ".pqi": "application/cprplayer",
    ".prc": "application/x-prc",
    ".prf": "application/pics-rules",
    ".prop": "text/plain",
    ".proxy": "application/x-ns-proxy-autoconfig",
    ".ps": "application/postscript",
    ".ptlk": "application/listenup",
    ".pub": "application/x-mspublisher",
    ".pvx": "video/x-pv-pvx",
    ".qcp": "audio/vnd.qcelp",
    ".qt": "video/quicktime",
    ".qti": "image/x-quicktime",
    ".qtif": "image/x-quicktime",
    ".r3t": "text/vnd.rn-realtext3d",
    ".ra": "audio/x-pn-realaudio",
    ".ram": "audio/x-pn-realaudio",
    ".rar": "application/octet-stream",
    ".ras": "image/x-cmu-raster",
    ".rc": "text/plain",
    ".rdf": "application/rdf+xml",
    ".rf": "image/vnd.rn-realflash",
    ".rgb": "image/x-rgb",
    ".rlf": "application/x-richlink",
    ".rm": "audio/x-pn-realaudio",
    ".rmf": "audio/x-rmf",
    ".rmi": "audio/mid",
    ".rmm": "audio/x-pn-realaudio",
    ".rmvb": "audio/x-pn-realaudio",
    ".rnx": "application/vnd.rn-realplayer",
    ".roff": "application/x-troff",
    ".rp": "image/vnd.rn-realpix",
    ".rpm": "audio/x-pn-realaudio-plugin",
    ".rt": "text/vnd.rn-realtext",
    ".rte": "x-lml/x-gps",
    ".rtf": "application/rtf",
    ".rtg": "application/metastream",
    ".rtx": "text/richtext",
    ".rv": "video/vnd.rn-realvideo",
    ".rwc": "application/x-rogerwilco",
    ".s3m": "audio/x-mod",
    ".s3z": "audio/x-mod",
    ".sca": "application/x-supercard",
    ".scd": "application/x-msschedule",
    ".sct": "text/scriptlet",
    ".sdf": "application/e-score",
    ".sea": "application/x-stuffit",
    ".setpay": "application/set-payment-initiation",
    ".setreg": "application/set-registration-initiation",
    ".sgm": "text/x-sgml",
    ".sgml": "text/x-sgml",
    ".shar": "application/x-shar",
    ".shtml": "magnus-internal/parsed-html",
    ".shw": "application/presentations",
    ".si6": "image/si6",
    ".si7": "image/vnd.stiwap.sis",
    ".si9": "image/vnd.lgtwap.sis",
    ".sis": "application/vnd.symbian.install",
    ".sit": "application/x-stuffit",
    ".skd": "application/x-Koan",
    ".skm": "application/x-Koan",
    ".skp": "application/x-Koan",
    ".skt": "application/x-Koan",
    ".slc": "application/x-salsa",
    ".smd": "audio/x-smd",
    ".smi": "application/smil",
    ".smil": "application/smil",
    ".smp": "application/studiom",
    ".smz": "audio/x-smd",
    ".snd": "audio/basic",
    ".spc": "application/x-pkcs7-certificates",
    ".spl": "application/futuresplash",
    ".spr": "application/x-sprite",
    ".sprite": "application/x-sprite",
    ".sdp": "application/sdp",
    ".spt": "application/x-spt",
    ".src": "application/x-wais-source",
    ".sst": "application/vnd.ms-pkicertstore",
    ".stk": "application/hyperstudio",
    ".stl": "application/vnd.ms-pkistl",
    ".stm": "text/html",
    ".svg": "image/svg+xml",
    ".sv4cpio": "application/x-sv4cpio",
    ".sv4crc": "application/x-sv4crc",
    ".svf": "image/vnd",
    ".svh": "image/svh",
    ".svr": "x-world/x-svr",
    ".swf": "application/x-shockwave-flash",
    ".swfl": "application/x-shockwave-flash",
    ".t": "application/x-troff",
    ".tad": "application/octet-stream",
    ".talk": "text/x-speech",
    ".tar": "application/x-tar",
    ".taz": "application/x-tar",
    ".tbp": "application/x-timbuktu",
    ".tbt": "application/x-timbuktu",
    ".tcl": "application/x-tcl",
    ".tex": "application/x-tex",
    ".texi": "application/x-texinfo",
    ".texinfo": "application/x-texinfo",
    ".tgz": "application/x-compressed",
    ".thm": "application/vnd.eri.thm",
    ".tif": "image/tiff",
    ".tiff": "image/tiff",
    ".tki": "application/x-tkined",
    ".tkined": "application/x-tkined",
    ".toc": "application/toc",
    ".toy": "image/toy",
    ".tr": "application/x-troff",
    ".trk": "x-lml/x-gps",
    ".trm": "application/x-msterminal",
    ".tsi": "audio/tsplayer",
    ".tsp": "application/dsptype",
    ".tsv": "text/tab-separated-values",
    ".ttf": "application/octet-stream",
    ".ttz": "application/t-time",
    ".txt": "text/plain",
    ".uls": "text/iuls",
    ".ult": "audio/x-mod",
    ".ustar": "application/x-ustar",
    ".uu": "application/x-uuencode",
    ".uue": "application/x-uuencode",
    ".vcd": "application/x-cdlink",
    ".vcf": "text/x-vcard",
    ".vdo": "video/vdo",
    ".vib": "audio/vib",
    ".viv": "video/vivo",
    ".vivo": "video/vivo",
    ".vmd": "application/vocaltec-media-desc",
    ".vmf": "application/vocaltec-media-file",
    ".vmi": "application/x-dreamcast-vms-info",
    ".vms": "application/x-dreamcast-vms",
    ".vox": "audio/voxware",
    ".vqe": "audio/x-twinvq-plugin",
    ".vqf": "audio/x-twinvq",
    ".vql": "audio/x-twinvq",
    ".vre": "x-world/x-vream",
    ".vrml": "x-world/x-vrml",
    ".vrt": "x-world/x-vrt",
    ".vrw": "x-world/x-vream",
    ".vts": "workbook/formulaone",
    ".wav": "audio/x-wav",
    ".wax": "audio/x-ms-wax",
    ".wbmp": "image/vnd.wap.wbmp",
    ".wcm": "application/vnd.ms-works",
    ".wdb": "application/vnd.ms-works",
    ".web": "application/vnd.xara",
    ".wi": "image/wavelet",
    ".wis": "application/x-InstallShield",
    ".wks": "application/vnd.ms-works",
    ".wm": "video/x-ms-wm",
    ".wma": "audio/x-ms-wma",
    ".wmd": "application/x-ms-wmd",
    ".wmf": "application/x-msmetafile",
    ".wml": "text/vnd.wap.wml",
    ".wmlc": "application/vnd.wap.wmlc",
    ".wmls": "text/vnd.wap.wmlscript",
    ".wmlsc": "application/vnd.wap.wmlscriptc",
    ".wmlscript": "text/vnd.wap.wmlscript",
    ".wmv": "audio/x-ms-wmv",
    ".wmx": "video/x-ms-wmx",
    ".wmz": "application/x-ms-wmz",
    ".wpng": "image/x-up-wpng",
    ".wps": "application/vnd.ms-works",
    ".wpt": "x-lml/x-gps",
    ".wri": "application/x-mswrite",
    ".wrl": "x-world/x-vrml",
    ".wrz": "x-world/x-vrml",
    ".ws": "text/vnd.wap.wmlscript",
    ".wsc": "application/vnd.wap.wmlscriptc",
    ".wv": "video/wavelet",
    ".wvx": "video/x-ms-wvx",
    ".wxl": "application/x-wxl",
    ".x-gzip": "application/x-gzip",
    ".xaf": "x-world/x-vrml",
    ".xar": "application/vnd.xara",
    ".xbm": "image/x-xbitmap",
    ".xdm": "application/x-xdma",
    ".xdma": "application/x-xdma",
    ".xdw": "application/vnd.fujixerox.docuworks",
    ".xht": "application/xhtml+xml",
    ".xhtm": "application/xhtml+xml",
    ".xhtml": "application/xhtml+xml",
    ".xla": "application/vnd.ms-excel",
    ".xlc": "application/vnd.ms-excel",
    ".xll": "application/x-excel",
    ".xlm": "application/vnd.ms-excel",
    ".xls": "application/vnd.ms-excel",
    ".xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ".xlt": "application/vnd.ms-excel",
    ".xlw": "application/vnd.ms-excel",
    ".xm": "audio/x-mod",
    ".xml": "application/xml",
    ".xmz": "audio/x-mod",
    ".xof": "x-world/x-vrml",
    ".xpi": "application/x-xpinstall",
    ".xpm": "image/x-xpixmap",
    ".xsit": "text/xml",
    ".xsl": "text/xml",
    ".xul": "text/xul",
    ".xwd": "image/x-xwindowdump",
    ".xyz": "chemical/x-pdb",
    ".yz1": "application/x-yz1",
    ".z": "application/x-compress",
    ".zac": "application/x-zaurus-zac",
    ".zip": "application/zip",
    ".json": "application/json",
    ".go": "application/go",
    ".properties": "application/properties",
    ".yaml": "application/yaml",
    ".bat": "application/bat",
    ".sh": "application/sh",
    ".vue": "application/vue",
    ".less": "application/less",
    ".sass": "application/sass",
    ".csv": "application/csv",
    ".lua": "application/lua",
    ".apex": "application/apex",
    ".azcli": "application/azcli",
    ".clojure": "application/clojure",
    ".coffee": "application/coffee",
    ".cs": "application/cs",
    ".csp": "application/csp",
    ".dockerfile": "application/dockerfile",
    ".fsharp": "application/fsharp",
    ".handlebars": "text/plain",
    ".ini": "text/plain",
    ".md": "text/plain",
    ".perl": "text/plain",
    ".php": "text/plain",
    ".py": "text/plain",
    ".json5": "text/plain",
    ".redis": "text/plain",
    ".sql": "text/sql",
    ".ejs": "text/plain"
}

M.test = function () {
    console.log(privateObj.staticMime[".jssson"] || "aa")
}

M.getRemoteCacheByUrl = async function (url) {
    if (url in M._globle_cacheMap) {
        return M._globle_cacheMap[url];
    }
    let text = "";
    if (url.startsWith("file:")) {
        text = M.readFile(url.substring(5));
    } else {
        text = await M.get(url,{},{});
    }
    console.log("req remote url:", url);
    M._globle_cacheMap[url] = text;
    return text;
}

M.init = function () {
    /***
     * 下划线命名转为驼峰命�?
     */
    String.prototype.underlineToHump = function () {
        let re = /_(\w)/g;
        str = this.replace(re, function ($0, $1) {
            return $1.toUpperCase();
        });
        return str;
    }

    /***
     * 驼峰命名转下划线
     */
    String.prototype.humpToUnderline = function () {
        let re = /_(\w)/g;
        str = this.replace(/([A-Z])/g, "_$1").toLowerCase();
        return str;
    }

    //首字母变大写
    String.prototype.firstChartoUpper = function () {
        return this.replace(/^([a-z])/g, function (word) {
            return word.replace(word.charAt(0), word.charAt(0).toUpperCase());
        });
    }
    //首字母变小写
    String.prototype.firstChartoLower = function () {
        return this.replace(/^([A-Z])/g, function (word) {
            return word.replace(word.charAt(0), word.charAt(0).toLowerCase());
        });
    }
    //格式化日�?
    Date.prototype.format = function (fmt) {
        let o = {
            "M+": this.getMonth() + 1,                 //月份
            "d+": this.getDate(),                    //�?
            "h+": this.getHours(),                   //小时
            "m+": this.getMinutes(),                 //�?
            "s+": this.getSeconds(),                 //�?
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds()             //毫秒
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (let k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
        return fmt;
    }


}
M.init();

global.M=M;
global.MIO=M.IO;

module.exports = M;

///////////////////////////////



const indexHtml="<!DOCTYPE html>\n" +
"<html>\n" +
"<head>\n" +
"    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\" />\n" +
"    <meta http-equiv=\"Content-Type\" content=\"text/html;charset=utf-8\">\n" +
"    <link rel=\"stylesheet\" href=\"https://cdn.staticfile.org/twitter-bootstrap/3.3.7/css/bootstrap.min.css\">\n" +
"    <script src=\"https://cdn.bootcss.com/jquery/3.3.1/jquery.js\"></script>\n" +
"    <script src=\"https://langjie.oss-cn-hangzhou.aliyuncs.com/space/root/project/viphelp/js/lib/monacoeditor/min/vs/loader.js\"></script>\n" +
"    <script>\n" +
"        M = {}\n" +
"    </script>\n" +
"    <style>\n" +
"        * { \n" +
"            touch-action: none;\n" +
"             } \n" +
"        #resize {\n" +
"            width: 5px;\n" +
"            height: 10px;\n" +
"        }\n" +
"        option {\n" +
"            font-weight: bold;\n" +
"            font-size: large;\n" +
"            color: #00b4ef;\n" +
"        }\n" +
"\n" +
"    </style>\n" +
"</head>\n" +
"\n" +
"<body>\n" +
"    <div id=\"app\">\n" +
"        <select id=\"laungeSelectId\" class=\"form-control\" style=\"width:50%; float: left;\" onchange=\"selectOnchang(this)\">\n" +
"            \n" +
"        </select>\n" +
"        <div align=\"center\">\n" +
"            <button id=\"btn\" onclick=\"btnOnclick(this)\" style=\"float: left; width: 40%; height: 35px;\" align=\"center\" type=\"button\" class=\"btn btn-success btn-lg btn-block\">Run</button>\n" +
"        </div>\n" +
"        <select  id=\"themeSelectId\"  class=\"form-control\" style=\"width: 10%; float: right;\"  onchange=\"selectOnThemechang(this)\">\n" +
"            <option>vs</option>\n" +
"            <option>vs-dark</option>\n" +
"            <option>hc-black</option>\n" +
"        </select>\n" +
"    </div>\n" +
" \n" +
"    <div id=\"container\" style=\"width:100%;height:2000px;float:left; border:1px solid grey\"></div>\n" +
"    <script>\n" +
"\n" +
"        M.languageMap={\n" +
"            \"js\":\"javascript\",\n" +
"            \"jsx\":\"javascript\",\n" +
"            \"md\":\"markdown\",\n" +
"            \"conf\":\"lua\"\n" +
"        }\n" +
"\n" +
"        M.file =localStorage.file || \"server.js\"\n" +
"        M.theme=localStorage.theme || \"vs-dark\";  \n" +
"        function getlanguage(file){\n" +
"            M.language = file.split(\".\")[1];\n" +
"            if(Object.keys(M.languageMap).indexOf(M.language)>=0){\n" +
"                 M.language=M.languageMap[M.language];\n" +
"            }\n" +
"            return   M.language;\n" +
"        }\n" +
"        require.config({\n" +
"            baseUrl: 'https://langjie.oss-cn-hangzhou.aliyuncs.com/space/root/project/viphelp/js/lib/monacoeditor/', paths: { 'vs': 'min/vs' }\n" +
"        });\n" +
"\n" +
"        function selectOnchang(d) {\n" +
"            localStorage.file=d.value;\n" +
"            M.file=d.value;\n" +
"         \n" +
"            $(\"#container\").children().remove();\n" +
"            $.ajax({\n" +
"                type: \"GET\",\n" +
"                url: \"./\"+ M.file,\n" +
"                async: false,\n" +
"                dataType:\"text\",\n" +
"                success: function (data) {\n" +
"                    if (data == \"no router\") {\n" +
"                        data = null;\n" +
"                    }\n" +
"                    require(['vs/editor/editor.main'], function () {\n" +
"                        var editor = monaco.editor.create(document.getElementById('container'), {\n" +
"                            value: [\n" +
"                                data\n" +
"                            ].join('\\n'),\n" +
"                            language: getlanguage(M.file),\n" +
"                            theme: M.theme,\n" +
"                            automaticLayout: true,\n" +
"                            scrollbar: {\n" +
"                                useShadows: false,\n" +
"                                vertical: 'visible',\n" +
"                                horizontal: 'visible',\n" +
"                                horizontalSliderSize: 5,\n" +
"                                verticalSliderSize: 5,\n" +
"                                horizontalScrollbarSize: 15,\n" +
"                                verticalScrollbarSize: 15,\n" +
"                            },\n" +
"                            quickSuggestions: true,\n" +
"                            overviewRulerBorder: true,\n" +
"                            minimap: {\n" +
"                                enabled: false\n" +
"                            }\n" +
"                        });\n" +
"                        M.editor = editor;\n" +
"                        if( $(\"#themeSelectId\").val()!=M.theme){\n" +
"                            $(\"#themeSelectId\").val(M.theme) \n" +
"                            selectOnThemechang({ value: M.theme })\n" +
"                        }\n" +
"                    }\n" +
"                    );\n" +
"                }, error: function () {\n" +
"                    require(['vs/editor/editor.main'], function () {\n" +
"                        var editor = monaco.editor.create(document.getElementById('container'), {\n" +
"                            value: [\n" +
"                               \"ss\"\n" +
"                            ].join('\\n'),\n" +
"                            language: getlanguage(M.file),\n" +
"                            theme: M.theme,\n" +
"                            automaticLayout: true,\n" +
"                            scrollbar: {\n" +
"                                useShadows: false,\n" +
"                                vertical: 'visible',\n" +
"                                horizontal: 'visible',\n" +
"                                horizontalSliderSize: 5,\n" +
"                                verticalSliderSize: 5,\n" +
"                                horizontalScrollbarSize: 15,\n" +
"                                verticalScrollbarSize: 15,\n" +
"                            },\n" +
"                            quickSuggestions: true,\n" +
"                            overviewRulerBorder: true,\n" +
"                            minimap: {\n" +
"                                enabled: false\n" +
"                            }\n" +
"                        });\n" +
"                        M.editor = editor;\n" +
"\n" +
"                        if( $(\"#themeSelectId\").val()!=M.theme){\n" +
"                            $(\"#themeSelectId\").val(M.theme) \n" +
"                            selectOnThemechang({ value: M.theme })\n" +
"                        }\n" +
"\n" +
"\n" +
"                    }\n" +
"                    );\n" +
"                }\n" +
"            });\n" +
"        }\n" +
"\n" +
"       function selectOnThemechang(d){\n" +
"            M.theme=d.value;  \n" +
"            localStorage.theme= M.theme;\n" +
"            monaco.editor.setTheme(M.theme);\n" +
"        }\n" +
"\n" +
"    \n" +
"        function ming_alert(str) {\n" +
"            btn.innerHTML = str;\n" +
"            window.setTimeout(() => {\n" +
"                btn.innerHTML = \"Run\";\n" +
"            }, 500);\n" +
"        }\n" +
"\n" +
"        btnOnclick = function () {\n" +
"            let fun = M.editor.getValue();\n" +
"            $.ajax({\n" +
"                type: \"post\",\n" +
"                url: \"/_run_?file=\" + M.file,\n" +
"                data: { fun },\n" +
"                dataType: \"json\",\n" +
"                success: function (data) {\n" +
"                    ming_alert(JSON.stringify(data));\n" +
"                },\n" +
"                error: function (e) {\n" +
"                    ming_alert(JSON.stringify(e));\n" +
"                }\n" +
"            });\n" +
"        }\n" +
"\n" +
"       \n" +
"        $.get(\"/_curFileList\").then(d=>{\n" +
"                 let fileList=d.data.split(\"\\n\").filter(u=>u.includes(\".\")).map(u=>{\n" +
"                     return  `<option>${u}</option>`\n" +
"                 })\n" +
"                 let fileListStr=fileList.toLocaleString().replace(/,/g,\"\")\n" +
"                 document.getElementById(\"laungeSelectId\").innerHTML=fileListStr;               \n" +
"                 setTimeout(()=>{\n" +
"                    selectOnchang({value:M.file}) \n" +
"                    laungeSelectId.value=M.file;\n" +
"                 },200)\n" +
"            \n" +
"       })\n" +
"</script>\n" +
"</body>\n" +
"\n" +
"</html>";



var os = require('os');
var args = process.argv.splice(2)
let argsPath=args[0] || "./";
if(/^[1-9][0-9]*$/.test(args[1])){
    port=args[1];
}else{
    port=8888;
}
M.__default_file={};
M.__default_file["__default_server.js"]="console.log(1)";
M.__default_file["__default_index.html"]="hello";
staticPath=argsPath.replace(/\\/g,"/") || "./" ;
var g_args={}
g_args.args=[]
g_args.port=port;
g_args.staticPath=staticPath;
for(let i=0;i<args.length;i++){
	 g_args.args.push(args[i]);
     if(args[i].includes("=")){
       let paArr=  args[i].split("=")
        g_args[paArr[0]]=paArr[1]
     }
}
console.log("g_args==>",g_args)
var app = M.server();
app.listen(port);
app.set("views", staticPath);
M.log_path = staticPath+"M.log";
M.map_path =staticPath+ "M_map.json";
M.database_path = staticPath+"M_database.json";
M.endRun=()=>{};
M.beforeRun=()=>{return true};
M.beforeWriteFile=()=>{return true};
app.get("/", async (req, res) => {
    res.renderHtml(indexHtml);
})


app.post("/_run_", async (req, res) => {
    try {
        if(M.beforeWriteFile(req.url)){
             //默认__default_不必存储
            if(req.params.file.startsWith("__default_")){
                M.__default_file[req.params.file]=req.params.fun;
            }else{
                M.writeFile(staticPath + req.params.file, req.params.fun);
            }
        }
        if( M.beforeRun(req.url))
        {
            if (req.params.file.endsWith(".js")) {
                eval(req.params.fun)
            }
        }
        res.send(M.result("ok"))
        M.endRun(req.params);
    } catch (e) {
        console.error(e)
        res.send(M.result("error", false))
    }
})
app.get("/_curFileList",async (req,res)=>{ 
    let s1="__default_server.js\n__default_index.html\n";
   if(os.type().startsWith("Window")){
       s=await M.exec("dir /b  "+`"${staticPath}"`)
   }else{
       s=await M.exec("ls "+staticPath)
   }
    res.send(M.result(s1+s))
})


app.get("/_t",async (req,res)=>{ 
    console.log(req.params);
    res.send(M.result("ok"));
})


app.use("/",(req, res)=>{
    console.log(req.url);
    if(req.method=="OPTIONS"){ res.send({}); return}
})




if(!g_args.args[2].startsWith("http") && g_args.args[2].endsWith(".js") ){
	console.log("run " + g_args.args[2]);
    eval(M.readFile("./"+g_args.args[2]));
}else{
	if(!g_args.args[1].startsWith("http") && g_args.args[1].endsWith(".js") ){
	  console.log("run " + g_args.args[1]);
	  eval(M.readFile("./"+g_args.args[1]));
	}else{
	   console.log("run server.js")
	   eval(M.readFile("./server.js"));
	}
}
