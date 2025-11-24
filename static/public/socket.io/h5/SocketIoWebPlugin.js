
class SocketIoWebPlugin {
    constructor(socketIoConfig) {
        this.key=socketIoConfig.key;
        this.clientId=socketIoConfig.clientId;
        this.path=socketIoConfig.path;
        this.host=socketIoConfig.host;
        this.unionid="";
        this.connectFun=()=>{};
        this.disConnectFun=()=>{};
        this.eventFun=()=>{};
        this.callFun=()=>{};
        this.replayFun=()=>{};
        this.datagramArray=[]
        this.JsonRpcReplayMap={}
    }
    async connect({connectGroup}){
        let that=this;
        let r= await M.request.post(M.config.plcmcontrollerHost("/plcm/socketio/applySocketio"),{
            "terminalType":"wx",
            "direction":1,
            "connectGroup": M.config.oncegame_host.indexOf("dev")>0? "gameh5dev":"gameh5",
            "app":M.config.oncegame_host.indexOf("dev")>0? "gameh5dev":"gameh5",
            "share":1,
            "productTerminal":"node"
        });
        let socketConfig=r.data;
        this.host=socketConfig.socketioHost;
        this.clientId=socketConfig.clientId;
        this.unionid=M.p.userInfo.unionid;
        var socket = window.io(
            that.host+ '/?clientId='+this.clientId+"&unionid="+this.unionid
            ,{path:``});
        this.socket=socket;

        socket.on("event",async function (msg) {
            that.eventFun(msg);
        });
        socket.on("call",async function (msg) {
            that.callFun(msg);
        });
        socket.on("replay",async function (msg) {
            that.replayFun(msg);
        });
        socket.on('connect',async function(data){
            //连接正常的事件
            that.connectFun(data);

            console.log( '- connect');
        });
        socket.on('connect_error', function(data){
            console.log(JSON.stringify(data)+ ' - connect_error');
        });
        socket.on('connect_timeout', function(data){
            console.log(JSON.stringify(data)+ ' - connect_timeout');
        });
        socket.on('error', function(data){
            console.log(JSON.stringify(data) + ' - error');
        });
        socket.on('disconnect', function(data){
            //失去连接的事件
            that.disConnectFun(data);
            console.log(JSON.stringify(data)+ ' - disconnect');
        });
        socket.on('reconnect', function(data){
            //console.log(JSON.stringify(data) + ' - reconnect');

        });
        socket.on('reconnect_attempt', function(data){
           // console.log(JSON.stringify(data));
        });
    }

    async install(app,args){
        if(args.event){
            this.eventFun=args.event;
        }
        if(args.call){
            this.callFun=args.call ;
        }
        if(args.replay){
            this.replayFun=args.replay;
        }
        if(args.connect){
            this.connectFun=args.connect;
        }
        if(args.disconnect){
            this.disConnectFun=args.disconnect;
        }
        let that=this;
        MIO.socketConnect=this.connect.bind(this);
        MIO.socketEmitCall=async (method,params,id,callback)=>{
            let reqBody={
                "method": "call"+"."+ method,
                "params": params
            };
            if(id){
                reqBody.id=id;
                that.JsonRpcReplayMap["reply."+ method]={
                    id: id,
                    callback:callback
                };
            }
            await MIO.socketRequest(reqBody);
        }

    }

}

export default  SocketIoWebPlugin;

