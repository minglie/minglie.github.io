M = {};
const translateApi=(api)=>{
    let url=M.config?M.config.baseUrl(api):api ;
    if(!api.startsWith("http")){
        api=url
    }
    return api;
}
M.hex=(v)=>{
    s="0x"+v.toString(16).padStart(4,0);
    return s
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
            if (i < flast) {
                fields += "&";
            }
        }
        return fields;
    }
    return '';
};
M.getParameter = function (name) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    let r = window.location.href.substr(window.location.href.indexOf('?')).substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
};
const request= async function ({methed,api,params,headers}){
    api=translateApi(api)
    // alert(api)
    return new Promise((reslove, reject) => {
        fetch(api, {
            method: methed,
            mode: 'cors',
            headers: headers||{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        }).then(function (response) {
            return response.json();
        }).then((res) => {
            reslove(res)
        }).catch((err) => {
            reject(err)
        });
    })
}
const post  = async (api, params = {},headers) => request({methed:"POST",api,params,headers})
const del  = async (api, params = {},headers) => request({methed:"DELETE",api,params,headers})
const put  = async (api, params = {},headers) => request({methed:"PUT",api,params,headers})
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
            headers: headers||{
                'Content-Type': 'application/json'
            }
        }).then(function (response) {
            return response.json();
        }).then((res) => {
            reslove(res)
        }).catch((err) => {
            reject(err)
        });
    })
};

window.M.request={}
window.M.request.get=get;
window.M.request.post=post;
window.M.request.delete=del;
window.M.request.put=put;