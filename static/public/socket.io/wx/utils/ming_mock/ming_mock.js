

import config from '../../config/config.js';


const fetch = (url, method, data, callback) => {
    const app = getApp()
    const header = {
        "Content-Type":"application/json",
        openId:app.globalData.openId,
        unionId: app.globalData.unionId,
        avatar: app.globalData.avatar,
        appletName: config.appletName
    }
    wx.showLoading({
        title: '加载中...',
    })
    wx.request({
        url: url,
        method: method,
        data,
        header: header,
        success: function(res){
            wx.hideLoading()
            return typeof callback === "function" && callback(res.data)
        },
        fail: function(res){
            wx.hideLoading();
            return typeof callback === "function" && callback(false)
        }
    })
}



const get=async (api, params = {}, headers)=> {
     return new Promise((reslove)=>{
         fetch(api,"GET",params,res=>{
             reslove(res);
         })
     })
}

const post=async (api, params = {}, headers)=> {
  return new Promise((reslove)=>{
      fetch(api,"POST",params,res=>{
          reslove(res);
      })
  })
}


const mApp = {
  _use:{},
  _get: {},
  _begin: function () {
  },
  _end: function () {
  },
    use(url,callback){
        if(typeof url === 'function' || typeof url === 'object'  ){
            let plugin=url;
            let args=callback;
            if(plugin.installed){
                return mApp;
            }
            if (typeof plugin === 'function') {
                plugin(mApp, args);
            } else {
                plugin.install(mApp, args);
            }
            plugin.installed = true;
            M._globle_plugin.add(plugin);
        }else {
            if (Array.isArray(url)) {
                url.forEach(u=>{
                    let regExp=new RegExp(u)
                    mApp._use[u] = {url,regExp,callback};
                })
            } else {
                let regExp=new RegExp(url)
                mApp._use[url] = {url,regExp,callback};
            }
        }
        return mApp;
    },

  begin(callback) {
    mApp._begin = callback;
  },  
  end(callback) {
    mApp._end = callback;
  },
  get (methodName, callback) {
      //在M.IO上注册一个方法
      M.IO.reg(methodName.replace("/", ""));
      mApp._get[methodName] = callback;
  },
  async doget(methodName,params,callback) {
      const req = {};
      const res = {};
      req.params = params||{};
      req.url = methodName;
      res.send = function (d) {
          res.alreadySend = true;
          callback(d);
          mApp._end(req, d);
      }.bind(this);
      await mApp._begin(req, res);
      if (!res.alreadySend) await mApp._get[methodName](req, res);
  }
};

const M={
  _globle_plugin:new Set(),
  getGloblePlugin:(pluginKey)=>{
    let plugin=null;
    M._globle_plugin.forEach(u=>{
        if(u.key==pluginKey){
            plugin=u;
        }
    })
    return plugin;
},
  config:config,
  app:mApp,
  IO:{
    reg: function (methedName) {
         M.IO[methedName] = (param) => {
          return new Promise(
              function (reslove) {
                 mApp.doget("/" + methedName,param,(d)=>{
                      reslove(d);
                  })
              }
          )
      }
    }
  },
  request:{
    get,
    post
  }
}


M.checkR=function (r){
    return r.code==200 || r.code==0;
}

M.Component={}

export default M;

