import BinConvert from "./BinConvert.js";

const CmdType={
    READ: 0x00,
    WRITE: 0x01,
    RPC: 0x02
};

// VioUartMsg 格式,收发采用一样的数据格式
// 发：[u8]cmdType + [u8]endpoint + [u32]data
// 收：[u8]cmdType + [u8]endpoint + [u32]data
class VioUartMsg {
    constructor() {
        this.m_bBuffer = new Uint8Array(6);
    }

    Build( cmdType, sid,endpoint,data)
    {
        this.m_bBuffer[0] = (sid<<2)|(cmdType&0x3);
        this.m_bBuffer[1] = endpoint;
        this.m_bBuffer[2] = data &0xff;
        this.m_bBuffer[3] = data>>8 &0xff;
        this.m_bBuffer[4] = data>>16 &0xff;
        this.m_bBuffer[5] = data>>24 &0xff;
    }

    BuildWrite(sid,address,data)
    {
      return this.Build(CmdType.WRITE,sid,address,data);
    }

    BuildRead(sid,address,data)
    {
        return this.Build(CmdType.READ,sid,address,data);
    }

    BuildRpc(sid,funId,data)
    {
       return this.Build(CmdType.RPC,sid,funId,data);
    }

    Buffer(){
        return  this.m_bBuffer;
    }


    GetSid(){
        return this.m_bBuffer[0] >>6;
    }

    GetFunId(){
        return this.m_bBuffer[1];
    }

    GetEndpoint(){
        return this.m_bBuffer[1];
    }

    GetAddress(){
        return this.m_bBuffer[1];
    }

    GetCmdType(){
        return this.m_bBuffer[0];
    }



    GetData(){
        return this.m_bBuffer[2]+256*this.m_bBuffer[3]+256*256*this.m_bBuffer[4]+256*256*256*this.m_bBuffer[5];
    }



    Import(bBuffer,length)
    {
        if(length<6){
            return null;
        }
        BinConvert.arrayCopy(bBuffer,0,this.m_bBuffer,0,6);
    }

    ToHexString(){
        return BinConvert.bytes2HexStr(this.m_bBuffer, 0, 6);
    }
}

function main() {
    let vioUartMsg= new VioUartMsg();
    vioUartMsg.BuildRead(0,2,4);
    console.log(vioUartMsg.ToHexString())
}

if(0){
    main();
}

export default VioUartMsg;