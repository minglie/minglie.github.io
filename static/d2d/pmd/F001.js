let input=`{
        "config":{ //定长64字节
            "bootFlag":0,//启动标志 0 进boot , 1进app
            "appInx":"1",    //要运行的app下标
            "headerAddr":"0x080101b4",//文件目录位置
            "unused":":byte61"
        },
        //文件目录
        "header": {
            "length": 2238,
            "capacity":2238,
            "fileName": "711.flash.json",
            "gmtCreate": 1704676779,
            "gmtModified": 1704676779,
            "fileNum":2,
            "fileMetaList": [
                {
                    "startAddr": "0x2000100",
                    "length": "0x1120",
                    "capacity":"0x2000000",
                    "tag": "ivt",
                    "fileName": "711.ivt.bin",
                    "gmtCreate": 1704676779,
                    "gmtModified": 1704676779,
                    "reserved": ":byte44"
                },
                {
                    //KEIL配置  0x8020004
                    //VECT_TAB_OFFSET=0x00020004U
                    "startAddr": "0x8020000",
                    //根据app.bin动态改变
                    "length": "0x40002",
                    "capacity": "0x60000",
                    "tag": "app",
                    "fileName": "711.app.bin",
                    "gmtCreate": 1704676779,
                    "gmtModified": 1704676779,
                    "reserved": ":byte44"
                }
            ]
        },
        //文件内容
        "body": [
            [11,22,33,55,66,44],//对应711.ivt.bin
            [11,22,33,55,66,44]//对应711.app.bin
        ]
    }`
;

let output=`
    {
        //config
        "0x00000000":"00 22 33 55 66 47 77 66 66",
        //header
        "0x080101b4":"00 22 33 55 66 47 77 66 66",
        //body[0]
        "0x2000100":"00 22 33 55 66 47 77 66 66",
        //body[1]
        "0x8020000":"00 22 33 55 66 47 77 66 66",
    }
`

const help=`
    711.flash.json  =>    flash.711.hex.json
`;



class F {
    static run(nodeJObject){
        return [nodeJObject.definition,nodeJObject.configuration];
    }

}



async function main(param){
    input=param;
    let r= await F.run(input);
    return r;
}

export default {
    F,
    leftLanguage:"javascript",
    rightLanguage:"javascript",
    input,
    output,
    help,
    main
}