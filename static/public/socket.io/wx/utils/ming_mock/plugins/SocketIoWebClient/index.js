import SocketIoWebPlugin from "./SocketIoWebPlugin.js";
import M from "../../ming_mock.js";


const socketIoWebPluginParam={
    async event(msg){
      console.log(msg)
    },
    async call(msg){
      switch (msg.method){
          case "call.exhibition2022SignIn":{
                if(M.Component["user"]){
                    M.Component["user"].fetch();
                }
          }
      }
    }
}

async function socketIoWebPluginInstall(){
    let socketIoWebPlugin= M.getGloblePlugin("SocketIoWebPlugin");
    if(socketIoWebPlugin==null){
        let r=await M.IO.appGetUserInfo();
        let socketIoWebPlugin= new SocketIoWebPlugin({
            key:"SocketIoWebPlugin",
            unionid: r.data.unionid
        });
        M.app.use(socketIoWebPlugin,socketIoWebPluginParam);
    }
    M.IO.socketConnect();
}

function socketIoWebPluginUnInstall(){
   let socketIoWebPlugin= M.getGloblePlugin("SocketIoWebPlugin")
    if(socketIoWebPlugin!=null){
        socketIoWebPlugin.socket.disconnect();
    }
}


export  {
    socketIoWebPluginInstall,
    socketIoWebPluginUnInstall
}