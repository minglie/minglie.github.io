(function (window) {
    const M = {};

    //全局组件
    M.Component={}
    /**
     * 加载html文件 start
     */
    M._loadHtmlCache={};
    M._loadCssCache={};
    //全局缓存map
    M._globle_cacheMap = {}
    //全局对象缓存
    M._globle_lib_cacheMap={}
    //全局插件地址缓存
    M._globle_plugin_url_cacheMap={};
    //全局插件
    M._globle_plugin=new Set();

    M.pushRouter=function (){


    }

    //全局组件注册
    M.registComponent=function (key,component){
        M.Component[key]=component;
    }


    M.loadHtml= async function (htmlUrl){
        if(M._loadHtmlCache[htmlUrl]){
            return M._loadHtmlCache[htmlUrl];
        }
        return new Promise((resolve,reject)=>{
            fetch(htmlUrl).then(d=>d.text()).then(d=>{
                M._loadHtmlCache[htmlUrl]=d;
                //alert(d)
                resolve(d)
            })
        })
    }
    M.loadCss= async function (cssUrl){
        let cssContent=""
        if(M._loadCssCache[cssUrl]){
            cssContent= M._loadCssCache[cssUrl];
        }else {
            cssContent= await new Promise((resolve,reject)=>{
                fetch(cssUrl).then(d=>d.text()).then(d=>{
                    M._loadCssCache[cssUrl]=d;
                    resolve(d)
                })
            })
        }
        document.querySelector("#pageCss").innerHTML=cssContent;
    }

    M.setPageCss=function (cssContent){
        document.querySelector("#pageCss").innerHTML=cssContent;
    }

    M.html =function (htmlUrl){
        let r=  M._loadHtmlCache[htmlUrl]||"<h1>wait...</h1>";
        return r;
    }
    /**
     * 加载html文件 end
     */

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
                s[r] = n);
        }
        return s
    };


    window.importStyle=(id,url)=>{
        let styleCss= document.querySelector("#"+id);
        if(styleCss==null){
            var head = document.getElementsByTagName('HEAD').item(0);
            var style  = document.createElement("link");
            style.id=id;
            style.rel  = "stylesheet";
            style.href = url;
            head.appendChild(style);
        }else if(styleCss.href !=url){
            styleCss.href=url;
        }
    }

    window.importTemplate=async (id,url)=>{
        return new Promise(resolve => {
            let templateId= document.querySelector("#"+id);
            if(templateId==null){
                var bodyElement = document.getElementsByTagName('body').item(0);
                var templateEl  = document.createElement("template");
                templateEl.id=id;
                templateEl.url=url;
                M.loadHtml(url).then(d=>{
                    templateEl.innerHTML = d;
                    bodyElement.appendChild(templateEl);
                    resolve(true);
                })
            }else if(templateId.url !=url){
                templateId.url=url;
                M.loadHtml(url).then(d=>{
                    templateEl.innerHTML = d;
                    resolve(true);
                })
            }
        })
    }


    window.Page=async (pageObj)=>{
        let pageName= pageObj.name;
        let htmlUrl=`./views/${pageName}/${pageName}.html`;
        if(!pageObj.template){
            await M.loadHtml(htmlUrl)
        }
        return {
            ...pageObj,
            template: pageObj.template || M.html(htmlUrl),
        }
    }

    M.isPc=(()=>{
        var sUserAgent = navigator.userAgent.toLowerCase();
        if (/ipad|iphone|midp|rv:1.2.3.4|ucweb|android|windows ce|windows mobile/.test(sUserAgent)) {
            return false;
        }
        return true;
    })();



    M.isWeiXin=(()=>{
        var ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
            return true;
        } else {
            return false;
        }
    })();

    M.getGloblePlugin=(pluginKey)=>{
        let plugin=null;
        M._globle_plugin.forEach(u=>{
            if(u.key==pluginKey){
                plugin=u;
            }
        })
        return plugin;
    }


    var App = {
        _get: {},
        get (methodName, callback) {
            M.IO.reg(methodName.replace("/", ""));
            methodName = M.formatUrl(methodName);
            App._get[methodName] = callback;
        },
        _begin: function () {
        },
        _end: function () {
        },

        begin(callback) {
            App._begin = callback;
        },
        end(callback) {
            App._end = callback;
        },
        use(url,callback){
            if(typeof url === 'function' || typeof url === 'object'  ){
                let plugin=url;
                let args=callback;
                if(plugin.installed){
                    return App;
                }
                if (typeof plugin === 'function') {
                    plugin(App, args);
                } else {
                    plugin.install(App, args);
                }
                plugin.installed = true;
                M._globle_plugin.add(plugin);
            }else {
                if (Array.isArray(url)) {
                    url.forEach(u=>{
                        let regExp=new RegExp(u)
                        App._use[u] = {url,regExp,callback};
                    })
                } else {
                    let regExp=new RegExp(url)
                    App._use[url] = {url,regExp,callback};
                }
            }
            return App;
        },
        async installPlugin(pluginUrl,constructorParams,pluginParams){
            if(M._globle_plugin_url_cacheMap[pluginUrl]){
                return
            }
            M._globle_plugin_url_cacheMap[pluginUrl]=pluginUrl;
            return  new Promise(resolve => {
                import(pluginUrl).then(async modul=>{
                    const Plugin= modul.default;
                    const plugin= new Plugin(constructorParams);
                    App.use(plugin,pluginParams)
                    resolve(plugin);
                })
            })
        },
        async doget(methodName,params,callback) {
            const req = {};
            const res = {};
            if(params==0){
                req.params=0;
            }else {
                req.params = params||{};
            }
            req.url = methodName;
            res.send = function (d) {
                res.alreadySend = true;
                callback(d);
                App._end(req, d);
            }.bind(this);
            await App._begin(req, res);
            if (!res.alreadySend) await App._get[methodName](req, res);
        }
    };
    //服务方法注册
    M.IO = {};
    M.IO.reg = function (methedName) {
        M.IO[methedName] = (param) => {
            return new Promise(
                function (reslove) {
                    App.doget("/" + methedName,param,(d)=>{
                        reslove(d);
                    })
                }
            )
        }
    };

    /**
     * 去掉参数加让斜杠
     */
    M.formatUrl = function (url) {
        if (url.indexOf("?") > 0) {
            url = url.substr(0, url.indexOf("?"));
        } else {
            url = url;
        }
        if (!url.startsWith('/')) {
            url = '/' + url;
        }
        return url;
    };


    M.get = function (url, param) {
        let u;
        App.doget(url,param,(d)=>{
            u = d;
        });
        return u;
    };

    M.delayMs=async function (ms){
        return new Promise(r=>{
            setTimeout(()=>{
                r(1)
            },ms)
        })
    }


    M.init = function () {
        //格式化日期
        Date.prototype.format = function (fmt) {
            var o = {
                "M+": this.getMonth() + 1,                 //月份
                "d+": this.getDate(),                    //日
                "h+": this.getHours(),                   //小时
                "m+": this.getMinutes(),                 //分
                "s+": this.getSeconds(),                 //秒
                "q+": Math.floor((this.getMonth() + 3) / 3), //季度
                "S": this.getMilliseconds()             //毫秒
            };
            if (/(y+)/.test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            }
            for (var k in o) {
                if (new RegExp("(" + k + ")").test(fmt)) {
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                }
            }
            return fmt;
        }
    };

    M.removeUserData=function (){
        sessionStorage.removeItem("lj_member_data");
    }
    M.getUserData=function (){
        if(sessionStorage.getItem('lj_member_data')==null){
            return null
        }
        return JSON.parse(sessionStorage.getItem('lj_member_data'))
    }

    M.setUserData=async function (userInfoObj){
        sessionStorage.setItem("lj_member_data", JSON.stringify(userInfoObj));
        let r=  M.getUserInfo();
        return r;
    }


    M.getParameter = function (name) {
        let locationhref =window.location.href;
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = locationhref.substr(locationhref.indexOf('?')).substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    };

    M.urlStringify = function (obj) {
        if (obj !== null && typeof obj === 'object') {
            var keys = Object.keys(obj);
            var len = keys.length;
            var flast = len - 1;
            var fields = '';
            for (var i = 0; i < len; ++i) {
                var k = keys[i];
                var v = obj[k];
                var ks = k + "=";
                fields += ks + v;
                if (i < flast) {
                    fields += "&";
                }
            }
            return fields;
        }
        return '';
    };

    const translateApi=(api)=>{
        let url=M.config.baseUrl(api) ;
        if(!api.startsWith("http")){
            api=url
        }
        return api;
    }

    function resonsePreDeal(res){
        if(res.code==-100 || res.code==-6){
            if(M.isWeiXin){
                let redirect_uri= location.hash;
                redirect_uri= redirect_uri.replace(/#/,"");
              //  location.href=`/member/liuyanban?redirect_uri=${redirect_uri}`;
            }
        }
    }

    function preHeader(headers){
        let reqHeader=headers||{
            'Content-Type': 'application/json'
        }
        reqHeader.token=  M.p.userInfo.lj_token;
        return reqHeader;
    }


    const post  = async (api, params = {},headers) => {
        api=translateApi(api)
        return new Promise((reslove, reject) => {
            fetch(api, {
                method: 'POST',
                mode: 'cors',
                headers:preHeader(headers),
                body: JSON.stringify(params)
            }).then(function (response) {
                return response.json();
            }).then((res) => {
                resonsePreDeal(res);
                reslove(res)
            }).catch((err) => {
                reject(err)
            });
        })
    }
    const get = async (api, params = {},headers) => {
        api=translateApi(api)
        let getData = "";
        if (params) {
            getData = window.M.urlStringify(params);
            if (api.indexOf("?") > 0) {
                getData = "&" + getData;
            } else {
                getData = "?" + getData;
            }
        }
        api = api + getData;
        return new Promise((reslove, reject) => {
            fetch(api, {
                method: 'GET',
                mode: 'cors',
                headers: preHeader(headers),
            }).then(function (response) {
                return response.json();
            }).then((res) => {
                resonsePreDeal(res);
                reslove(res)
            }).catch((err) => {
                reject(err)
            });
        })
    };
    const jsonp=async (url, callbackFunction)=>{
        return new Promise(resolve => {
            let callbackStr = M.urlParse(url).callback;
            window[callbackStr]=(...params)=>{
                if(callbackFunction) {
                    callbackFunction(params);
                }
                document.body.removeChild(document.getElementById("ming_mock_jsonp_id"))
                resolve(params);
            }
            var scriptElement = document.createElement('script');
            scriptElement.src = url;
            scriptElement.id="ming_mock_jsonp_id"
            document.body.appendChild(scriptElement);
        })
    };

    M.checkR=function (r){
        return r.code==200 || r.code==0;
    }

    M.throttle  = function(func, wait, options) {
        var context, args, result;
        var timeout = null;
        var previous = 0;
        if (!options) options = {};
        var later = function() {
            previous = options.leading === false ? 0 : new Date().getTime();
            timeout = null;
            result = func.apply(context, args);
            if (!timeout) context = args = null;
        };
        return function() {
            var now = new Date().getTime();
            if (!previous && options.leading === false) previous = now;
            // 计算剩余时间
            var remaining = wait - (now - previous);
            //console.log("wait",wait,"now",now,"previous",previous)
            //console.log("AAA",remaining)
            context = this;
            args = arguments;
            // 当到达wait指定的时间间隔，则调用func函数
            // 精彩之处：按理来说remaining <= 0已经足够证明已经到达wait的时间间隔，但这里还考虑到假如客户端修改了系统时间则马上执行func函数。
            if (remaining <= 0 || remaining > wait) {
                // 由于setTimeout存在最小时间精度问题，因此会存在到达wait的时间间隔，但之前设置的setTimeout操作还没被执行，因此为保险起见，这里先清理setTimeout操作
                if (timeout) {
                    clearTimeout(timeout);
                    timeout = null;
                }
                previous = now;
                result = func.apply(context, args);
                if (!timeout) context = args = null;
            } else if (!timeout && options.trailing !== false) {
                // options.trailing=true时，延时执行func函数
                timeout = setTimeout(later, remaining);
            }
            return result;
        };
    };



    M.debounce =function(fn, wait, immediate) {
        immediate = immediate || false;
        var timer = null;
        var count = 0;
        return function () {
            var _this = this;
            var _arg = arguments;
            clearTimeout(timer);
            if (immediate && !count) {
                fn.apply(_this, _arg);
                count++;
            } else {
                timer = setTimeout(function () {
                    console.log(this);
                    fn.apply(_this, _arg);
                    count++;
                }, wait);
            }


        }

    }

    window.M = M;
    window.MIO = M.IO;
//将ajax请求挂到全局对象M上
    M.init();
    window.M.request={}
    window.M.request.get=get;
    window.M.request.post=post;
    window.M.request.jsonp=jsonp;
    window.app = App;
})(window);