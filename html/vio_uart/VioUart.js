import VioUartMsg from "./VioUartMsg.js";
import  VioUartComm from "./VioUartComm.js";


// 定长10字节
// 发：[u8]cmdType + [u8]endpoint + [u32]data
// 收：[u8]cmdType + [u8]endpoint + [u32]data
class VioUart {

    static g_sid=0;

    static g_vioUartComm=new VioUartComm( );
    static Sid(){
        return VioUart.g_sid;
    }

    static init=async function (send){
        VioUart.g_vioUartComm.m_comDriver.Send=send;
        return ;
    }

    static async  Import(buf,bufLen){
        VioUart.g_vioUartComm.Import(buf,bufLen);
    }


    static async  Read(address){
        const vioUartMsg= new VioUartMsg();
        vioUartMsg.BuildRead(VioUart.Sid(),address,0);
        const  readData=await VioUart.g_vioUartComm.Call(vioUartMsg,true);
        return readData.GetData();
    }

    static async  Write(address,data){
        const vioUartMsg= new VioUartMsg();
        vioUartMsg.BuildWrite(VioUart.Sid(),address,data);
        return  VioUart.g_vioUartComm.Call(vioUartMsg,true);
    }

    static async  Rpc(funId,data){
        const vioUartMsg= new VioUartMsg();
        vioUartMsg.BuildRpc(VioUart.Sid(),funId,data);
        return  VioUart.g_vioUartComm.Call(vioUartMsg,true);
    }

}


async function main(){
    VioUart.Rpc(1,1)

}
if(0){
    main();
}
export default VioUart;