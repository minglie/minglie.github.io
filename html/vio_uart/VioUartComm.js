import VioUartMsg from "./VioUartMsg.js";
import BinConvert from "./BinConvert.js";

class VioUartComm {

        m_comDriver={
                /**
                 * 接收数据
                 * @param buf
                 * @param bufLen
                 * @returns {number}
                 * @constructor
                 */
                Receive(buf, bufLen){
                    console.log("recv", BinConvert.bytes2HexStr(buf,0,bufLen));
                    return 0;
                }
                ,
                /**
                 * 发送数据
                 * @param buf
                 * @param bufLen
                 * @returns {number}
                 * @constructor
                 */
                Send(buf, bufLen){
                    console.log("send", BinConvert.bytes2HexStr(buf,0,bufLen));
                    return 0;
                }

     }

    constructor() {
        this.m_exInCacheSize = 512;
        this.m_exInCache=new Uint8Array(this.m_exInCacheSize);
        this.m_exInLen = 0;
        this.m_importMs=0;
        //回复报文
        this.m_replyRmsg=null;
        this.m_isReply=false;
        this.m_callCmdType=0;
        this.m_callEndpoint=0;

    }

    SetComDriver(comDriver) {
        this.m_comDriver = comDriver;
    }


    Import(buf, bufLen) {
        if (bufLen === 0 || bufLen > this.m_exInCacheSize) {
            return 0;
        }
        // 超时处理：超过50ms未收到数据，清空缓存（避免残留不完整帧）
        if(Date.now()-this.m_importMs>50){
            this.m_exInLen = 0;
        }
        // 缓存空间检查：若新增数据会超出缓存,清空原有数据
        if (this.m_exInLen + bufLen >= this.m_exInCacheSize) {
            this.m_exInLen = 0;
        }
        // 将新数据拷贝到缓存尾部
        BinConvert.arrayCopy(buf, 0, this.m_exInCache, this.m_exInLen, bufLen);
        this.m_exInLen += bufLen;
        this.m_importMs = Date.now();
        const vioUartMsg = new VioUartMsg();
        // 忽略多余字节
        if (this.m_exInLen >= 6) {
            vioUartMsg.Import(this.m_exInCache, this.m_exInLen);
            this.m_exInLen=0;
        }
        // 判断是否为回复报文
        if( this.m_isReply===false &&  vioUartMsg.GetCmdType()===this.m_callCmdType && vioUartMsg.GetEndpoint()===this.m_callEndpoint){
            this.m_isReply=true;
            this.m_replyRmsg=vioUartMsg;
        }
    }

    /**
     * 发送数据
     * @param  {VioUartMsg} reqRmsg 请求报文
     * @param {boolean} needReply
     * @constructor
     */
    async Call(reqRmsg,needReply) {
        let startMs;
        const sendBuf= reqRmsg.Buffer();
        //无需回复
        if(needReply===false){
            await this.m_comDriver.Send(sendBuf,6);
            return null;
        }
        startMs=Date.now();
        this.m_isReply = false;
        this.m_replyRmsg = null;
        this.m_callCmdType = reqRmsg.GetCmdType();
        this.m_callEndpoint = reqRmsg.GetEndpoint();
        this.m_comDriver.Send(sendBuf, 6);
        for (let i=0;i<100;i++){
            if(this.m_isReply){
                return this.m_replyRmsg;
            }
            if(Date.now()-startMs>2000){
                console.log( reqRmsg.ToHexString()+" timeout");
                return null;
            }
            await new Promise(resolve => setTimeout(resolve, 200));
        }
        return null;
    }
}

export default VioUartComm;