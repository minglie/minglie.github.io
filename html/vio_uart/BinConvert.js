
class BinConvert{

    static arrayCopy(sourceArray, sourceIndex, destinationArray, destinationIndex, length){
        for (let i=0;i<length;i++){
            destinationArray[i+destinationIndex]=sourceArray[i+sourceIndex];
        }
    }

    static fill(arr,v,start,len){
        for (let i=0;i<len;i++){
            arr[start+i]=v;
        }
    }

    _v=new Uint8Array(256);

    m_readInx=0;
    m_writeInx=0;

    constructor() {

    }

    static buildByBuf(buf){
       let binConvert= new BinConvert()
        binConvert._v=buf;
        binConvert.m_readInx=0;
        binConvert.m_writeInx=buf.length;
        return binConvert;
    }

    reset(){
        this.m_readInx=0;
        this.m_writeInx=0;
    }


    importN(buf){
        this._v=buf;
        this.m_readInx=0;
        this.m_writeInx=0;
    }


    getNextStr(len=16){
        if(this.m_readInx> this._v.length-len){
            return "";
        }
         let s = BinConvert.bytes2Str(this._v, this.m_readInx, len);
         this.m_readInx= this.m_readInx+len;
         return s;
    }

    getNextInt(len){
        if(this.m_readInx>this._v.length-len){
            return null;
        }
        let retInt= BinConvert.bytes2Int(this._v,this.m_readInx,len);
        this.m_readInx= this.m_readInx+len;
        return retInt;
    }

    getNextIntForHex(len){
        if(this.m_readInx>this._v.length-len){
            return null;
        }
        let retInt= BinConvert.bytes2Int(this._v,this.m_readInx,len);
        this.m_readInx= this.m_readInx+len;
        return  "0x"+ retInt.toString(16).padStart(len*2,0);
    }

    getNextEmpty(len){
        if(this.m_readInx>this._v.length-len){
            return null;
        }
        this.m_readInx= this.m_readInx+len;
        return  null;
    }

    appendStr(str){
        let strBytes=BinConvert.str2bytes(str);
        BinConvert.arrayCopy(strBytes, 0, this._v,   this.m_writeInx, strBytes.length);
        this.m_writeInx= this.m_writeInx+strBytes.length;
    }
    appendInt(intVal,intLen){
        let int2Bytes=BinConvert.int2Bytes(intVal,intLen);
        BinConvert.arrayCopy(int2Bytes, 0, this._v,   this.m_writeInx, int2Bytes.length);
        this.m_writeInx= this.m_writeInx+intLen;
    }

    appendBuf(buf){
        BinConvert.arrayCopy(buf, 0, this._v,   this.m_writeInx, buf.length);
        this.m_writeInx= this.m_writeInx+buf.length;
    }

    toBuf(){
        let r= this._v.slice(0,this.m_writeInx)
        return r;
    }

    static bytes2Int(bs,start,length){
        switch (length){
            case 0:{
                return bs[start+0];
            }
            case 1:{
                return bs[start+0];
            }
            case 2: {
                return bs[start+0]+bs[start+0+1]*256;
            }
            case 4: {
                return bs[start+0]+ bs[start+0+1]*256+bs[start+0+2]*65536+bs[start+0+3]*16777216
            }
        }
        return 0;
    }

    static bytes2Str(bs,start,length=16){
        let arrDis=[];
        for (let i=0;i<length;i++){
            if(bs[start+i]==0){
                break;
            }
            arrDis[i]=bs[start+i];
        }
        let s=  String.fromCharCode.apply(String, arrDis).replaceAll("\0","");
        return s;
    }


   static  int2Bytes( v, length)   {
        switch (length){
            case 1:{
                return [v & 0xff];
            }
            case 2: {
                return [v &0xff ,v>>8 &0xff]
            }
            case 4:{
                return [v &0xff, v>>8 &0xff,v>>16 &0xff, v>>24 &0xff ]
            }
        }
        return null;
    }

    static str2bytes(str,space=16){
        let bytes = [];
        for (let i = 0; i <Math.min(str.length,space) ; i++) {
            bytes.push(str.charCodeAt(i));
        }
        let byteLength=bytes.length;
        if(bytes.length<space){
            for (let i=0;i<space-byteLength;i++){
                bytes.push(0);
            }
        }
        return bytes;
    }





    static text2bytes(str){
        let bytes = [];
        bytes[0]=(str.length+2) & 0xff;
        bytes[1]=(str.length+2) >>8 & 0xff;
        for (let i = 0; i <str.length ; i++) {
            bytes.push(str.charCodeAt(i));
        }
        return bytes;
    }

    static parseInt(strInt){
        return  Number.parseInt(strInt);
    }

    static isNumStr(str){
        let r=/^[0-9]+$/.test(str);
        return r;
    }


     static   arraySlice(bs, start){
        let bytes = Array(bs.length - start) ;
        BinConvert.arrayCopy(bs,start,bytes,0,bs.length - start);
        return bytes;
      }

    static   arrayMoveLeft(dstBs, start){
        if(dstBs.length<start){
            return;
        }
        let len=dstBs.length-start;
        for (let i=0;i<len;i++){
            dstBs[i]=dstBs[i+start];
        }
    }


      static bytes2HexStr(bytes, start, length){
          if(start==undefined){
              start=0;
          }
          if(length==undefined){
              length=bytes.length;
          }
          if (bytes == null) {
              return "";
          }
          let disv="";
          try {
              for (let i=0;i<length;i++){
                  disv=disv+" "+bytes[start+i].toString(16).padStart(2,0);
              }
          }catch (e) {
              console.error(e)
          }

          return disv.trim();
      }

    static hexStr2Bytes(str){
        let buf= str.replaceAll("\r\n"," ").trim().split(/\s+/).map(u=>parseInt(u,16));
        return buf;

    }

    static megerBuf(buf1,buf2){
        let r=[...buf1,...buf2];
        return r;
    }

}


function main(){
    if(0){
        let bc= new BinConvert();
        bc.appendInt(5,4);
        bc.appendInt(44,4);
        let a=  bc.getNextInt(4)
        console.log(a)
    }
    if(0){
       let str= BinConvert.bytes2Str([97,98,33,34],0);
       console.log(str)
    }

}
if(0){
    main()
}

export default BinConvert;