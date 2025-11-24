function getSchema(fileNum){
    return {
            "remark": "持久化存储格式",
            "definition": {
                //通讯前发现的信息64字节,存储在片外flash0x00000000的处
                "Config":{
                    "class": "Config",
                    //启动标志 0 进boot , 1进app
                    "bootFlag":":u32",
                    //要运行的app下标
                    "appFileId":":u32",
                    //header的位置(其他bin的位置遍历header.fileMetaList获得)
                    "headerAddr":":u32",
                    "reserved":":byte52" ////凑够64字节
                },
                //描述单个文件信息,128字节
                "FileMeta": {
                    "class": "FileMeta",
                    "id":":u32",//文件id,对应文件下标
                    "startAddr": ":u32",//文件存储的起始地址
                    "length": ":u32",//文件长度
                    "capacity":":u32",//文件容量
                    "type": ":str16",//文件类别 [app,ivt,ats,font]文件类型
                    "fileName": ":str32",//在meger前的文件名(ats.bin)
                    "gmtCreate": ":u32",//下载时间
                    "gmtModified": ":u32",//修改时间,在更新单个bin时,需要修改这个值
                    "comment":":str32",//备注
                    "reserved": ":byte24" //凑够128字节
                },
                //文件目录,描述文件数量,下载时间,不定长
                "FileHeader": {//长度 52+128*2
                    "class": "FileHeader",
                    "length": ":u32",//FileHeader部分总长度
                    "capacity":":u32",//FileHeader部分容量
                    "fileName": ":str32",//对应包含所有bin的,flash.json
                    "gmtCreate": ":u32",//下载时间
                    "gmtModified": ":u32",//修改时间
                    "fileNum": ":u32",//文件总个数
                    "fileMetaList": [...Array(fileNum)].map(u=>"$FileMeta")
                }
            },
            "configuration": {
                //64字节
                "config":"$Config",
                //不定长,长度受文件个数影响
                "header": "$FileHeader",
                //不定长,长度受文件个数和文件内容影响
                "body": [...Array(fileNum)].map(u=>":bin")
            }
        }
}


export default getSchema;

