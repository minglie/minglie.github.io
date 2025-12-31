const useTimeoutFn=function (fn, wait, immediate){
    immediate = immediate || false;
    var timer = null;
    var count = 0;
    return {
        start:function () {
            var _this = this;
            var _arg = arguments;
            clearTimeout(timer);
            if (immediate && !count) {
                fn.apply(_this, _arg);
                count++;
            } else {
                timer = setTimeout(function () {
                    fn.apply(_this, _arg);
                    count++;
                }, wait);
            }
        }
    }
}
function addComMsg(isSend,v){
    let disv="";
    for (let i=0;i<v.length;i++){
        disv=disv+" "+v[i].toString(16).padStart(2,0);
    }
    disv=  disv.trim();

    if(isSend){
        document.querySelector("#right2").innerHTML= "\n=>:"
            +disv+ document.querySelector("#right2").innerHTML;
    }else {
        document.querySelector("#right2").innerHTML= "\n<=:"
            +disv+document.querySelector("#right2").innerHTML;
    }
}

class WebSerialPlugin {
    static  keepReading=false;
    static port=null;
    static recBuffer=[];
    static sendTime=0;
    static sendCallback=()=>{};
    constructor() {

    }

    static importBuffer=(buf,len)=>{

    }

    static messageEvent=(d)=>{
        console.log(JSON.stringify( d));
    }
    static async selectPort(){

        // 浏览器支持serial
        if ('serial' in navigator) {
            // 获取用户之前授予该网站访问权限的所有串口
            const ports = await navigator.serial.getPorts();
            if (WebSerialPlugin.port === null || WebSerialPlugin.port ==undefined) {
                if (ports.length > 0) {
                    // 已经连接过
                    WebSerialPlugin.port = ports[0]
                    await WebSerialPlugin.open()
                    return
                }
                // 提示用户选择一个串口
                WebSerialPlugin.port = await navigator.serial.requestPort()
                WebSerialPlugin.keepReading=false;
                await WebSerialPlugin.open()
            }
        } else {
            alert('你的浏览器不支持串口连接')
        }

    }

    static async open() {
        try {
            await WebSerialPlugin.port.open({
                baudRate: 112500,
                dataBits: 8,
                stopBits: 1,
                parity: 'none',
                flowControl: 'none'
            })

            if (WebSerialPlugin.port) {
                WebSerialPlugin.messageEvent({
                    type:"connect",
                    msg:"连接成功"
                })
            }
            WebSerialPlugin.reader = this.port.readable.getReader()
            WebSerialPlugin.writer = this.port.writable.getWriter()
            WebSerialPlugin.keepReading=true;
            WebSerialPlugin.recBuffer=[];
            const  {start} = useTimeoutFn(()=>{
                addComMsg(false, WebSerialPlugin.recBuffer);
                WebSerialPlugin.importBuffer(WebSerialPlugin.recBuffer, WebSerialPlugin.recBuffer.length)
                WebSerialPlugin.recBuffer=[];
            },20);


            while (WebSerialPlugin.port.readable &&   WebSerialPlugin.keepReading) {
                try {
                    while (true) {
                        const { value, done } = await  WebSerialPlugin.reader.read();
                        if (done) {
                            // Allow the serial port to be closed later.
                            WebSerialPlugin.reader.releaseLock();
                            // Allow the serial port to be closed later.
                            WebSerialPlugin.writer.releaseLock();
                            break;
                        }
                        if (value) {
                            let vArr= Array.from(value);
                            WebSerialPlugin.recBuffer.push(...vArr);
                            start();
                        }
                    }
                } catch (error) {
                    // Handle non-fatal read error.
                    console.error("EEEEEEEEE",error);

                } finally {

                }
            }
        }catch (e){
            alert("端口被占用"+e.toString())
        }

    }

    static async forget() {
        let serPortList= await navigator.serial.getPorts();
        for (let i=0;i<serPortList.length;i++){
            let serPort=serPortList[i];
            try {
                serPort.close();
            }catch (e){

            }
            serPort.forget();
        }
        WebSerialPlugin.port=null;
    }


    static async baseSend(v) {
        if(WebSerialPlugin.port ){
            WebSerialPlugin.keepReading=false;
            const data = new Uint8Array(v)
            await  WebSerialPlugin.writer.write(data)
            WebSerialPlugin.recBuffer=[]
            WebSerialPlugin.keepReading=true;
            WebSerialPlugin.sendTime=new Date().getTime();
        }

    }
    static async write(param){
        return WebSerialPlugin.send(param);
    }

    static async send(param) {
        return new Promise(
            async function (reslove) {
                addComMsg(true,param);
                await WebSerialPlugin.baseSend(param);
            }
        )
    }
}