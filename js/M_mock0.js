//20190525

(function (window) {
    var M = {};
    var App = {
        _get: {},
        get (methodName, callback) {
            //在M.IO上注册一个方法
            M.IO.reg(methodName.replace("/", ""));
            App._get[methodName] = callback;
        },
        doget(methodName,params,callback) {
            req = {};
            res = {};
            req.params = params;
            res.send = function (d) {
                callback(d);
            }.bind(this);
            App._get[methodName](req, res);
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

    M.get = function (url, param) {
        let u;
        App.doget(url,param,(d)=>{
            u = d;
        });
        return u;
    };

    window.app = App;
    window.M = M;
})(window);