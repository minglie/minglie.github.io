let input=[
    {
        "Product": {
            "class": "Product",
            "model": 1711,
            "rev": 0,
            "osver": 0.6,
            "sn": 2001711,
            "client": 0,
            "manufacturer": "LANGJIE",
            "device": "my_d711"
        },
        "Drawer": {
            "class": "Drawer",
            "params": [
                0,
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                0
            ]
        },
        "Modbus": {
            "class": "Modbus",
            "address": 1,
            "baudrate": 115200,
            "x1": 0,
            "x2": 0
        },
        "Vin": {
            "class": "Vin",
            "tag": "#%Vin",
            "minScale": 0,
            "maxScale": 100,
            "dot": 2,
            "unitCode": 1001,
            "delay": 0,
            "runtime": {
                "binary": 0,
                "posi": 0,
                "velo": 0,
                "tare": 0,
                "userPosi": 0,
                "userPosiLimitMin": -100,
                "userPosiLimitMax": 100
            }
        },
        "AdChnl": {
            "class": "Vin.AdChnl",
            "tag": "#%Vin",
            "minScale": 0,
            "maxScale": 100,
            "dot": 2,
            "unitCode": 1001,
            "delay": 0,
            "vCol": [
                0,
                0.2,
                0.5,
                1,
                2,
                5,
                10,
                20,
                50,
                100,
                0
            ],
            "adCol": [
                0,
                200,
                500,
                1000,
                2000,
                5000,
                10000,
                20000,
                50000,
                100000,
                0
            ],
            "runtime": {
                "binary": 0,
                "posi": 0,
                "velo": 0,
                "tare": 0,
                "userPosi": 0,
                "userPosiLimitMin": -100,
                "userPosiLimitMax": 100
            }
        },
        "Vin.AdChnl": {
            "class": "Vin.AdChnl",
            "tag": "#%Vin",
            "minScale": 0,
            "maxScale": 100,
            "dot": 2,
            "unitCode": 1001,
            "delay": 0,
            "vCol": [
                0,
                0.2,
                0.5,
                1,
                2,
                5,
                10,
                20,
                50,
                100,
                0
            ],
            "adCol": [
                0,
                200,
                500,
                1000,
                2000,
                5000,
                10000,
                20000,
                50000,
                100000,
                0
            ],
            "runtime": {
                "binary": 0,
                "posi": 0,
                "velo": 0,
                "tare": 0,
                "userPosi": 0,
                "userPosiLimitMin": -100,
                "userPosiLimitMax": 100
            }
        },
        "AcChnl": {
            "class": "Vin.AcChnl",
            "tag": "#%Vin",
            "minScale": 0,
            "maxScale": 100,
            "dot": 2,
            "unitCode": 1001,
            "delay": 0,
            "encoder": 0,
            "res_u": 1,
            "zero": 0,
            "runtime": {
                "binary": 0,
                "posi": 0,
                "velo": 0,
                "tare": 0,
                "userPosi": 0,
                "userPosiLimitMin": -100,
                "userPosiLimitMax": 100
            }
        },
        "Vin.AcChnl": {
            "class": "Vin.AcChnl",
            "tag": "#%Vin",
            "minScale": 0,
            "maxScale": 100,
            "dot": 2,
            "unitCode": 1001,
            "delay": 0,
            "encoder": 0,
            "res_u": 1,
            "zero": 0,
            "runtime": {
                "binary": 0,
                "posi": 0,
                "velo": 0,
                "tare": 0,
                "userPosi": 0,
                "userPosiLimitMin": -100,
                "userPosiLimitMax": 100
            }
        },
        "IcChnl": {
            "class": "Vin.IcChnl",
            "tag": "#%Vin",
            "minScale": 0,
            "maxScale": 100,
            "dot": 2,
            "unitCode": 1001,
            "delay": 0,
            "bits": 16,
            "res_u": 1,
            "runtime": {
                "binary": 0,
                "posi": 0,
                "velo": 0,
                "tare": 0,
                "userPosi": 0,
                "userPosiLimitMin": -100,
                "userPosiLimitMax": 100
            }
        },
        "Vin.IcChnl": {
            "class": "Vin.IcChnl",
            "tag": "#%Vin",
            "minScale": 0,
            "maxScale": 100,
            "dot": 2,
            "unitCode": 1001,
            "delay": 0,
            "bits": 16,
            "res_u": 1,
            "runtime": {
                "binary": 0,
                "posi": 0,
                "velo": 0,
                "tare": 0,
                "userPosi": 0,
                "userPosiLimitMin": -100,
                "userPosiLimitMax": 100
            }
        },
        "FeedIcChnl": {
            "class": "Vin.FeedIcChnl",
            "tag": "#%Vin",
            "minScale": 0,
            "maxScale": 100,
            "dot": 2,
            "unitCode": 1001,
            "delay": 0,
            "res_u": 0.1,
            "runtime": {
                "binary": 0,
                "posi": 0,
                "velo": 0,
                "tare": 0,
                "userPosi": 0,
                "userPosiLimitMin": -100,
                "userPosiLimitMax": 100
            }
        },
        "Vin.FeedIcChnl": {
            "class": "Vin.FeedIcChnl",
            "tag": "#%Vin",
            "minScale": 0,
            "maxScale": 100,
            "dot": 2,
            "unitCode": 1001,
            "delay": 0,
            "res_u": 0.1,
            "runtime": {
                "binary": 0,
                "posi": 0,
                "velo": 0,
                "tare": 0,
                "userPosi": 0,
                "userPosiLimitMin": -100,
                "userPosiLimitMax": 100
            }
        },
        "Din": {
            "class": "Din",
            "tag": "#%Din",
            "runtime": {
                "state": false
            }
        },
        "Digital": {
            "class": "Din.Digital",
            "tag": "#%Din",
            "bitShift": 0,
            "runtime": {
                "state": false
            }
        },
        "Din.Digital": {
            "class": "Din.Digital",
            "tag": "#%Din",
            "bitShift": 0,
            "runtime": {
                "state": false
            }
        },
        "Dout": {
            "class": "Dout",
            "tag": "#%Dout",
            "runtime": {
                "state": true
            }
        },
        "Switch": {
            "class": "Dout.Switch",
            "tag": "#%Dout",
            "bitShift": 0,
            "safeLevel": false,
            "validLevel": true,
            "runtime": {
                "state": true
            }
        },
        "Dout.Switch": {
            "class": "Dout.Switch",
            "tag": "#%Dout",
            "bitShift": 0,
            "safeLevel": false,
            "validLevel": true,
            "runtime": {
                "state": true
            }
        },
        "Vout": {
            "class": "Vout",
            "tag": "#%Vout",
            "runtime": {
                "outFeed": 0
            }
        },
        "Actuator": {
            "class": "Vout.Actuator",
            "tag": "#%Vout",
            "motiWays": [
                0,
                1,
                -1,
                -2,
                0
            ],
            "duMin": -30000,
            "duMax": 30000,
            "duExceedTime": 3,
            "runtime": {
                "outFeed": 0,
                "stateWay": 0,
                "du": 0,
                "duExceedProtected": false,
                "simuPosi": 0
            }
        },
        "Vout.Actuator": {
            "class": "Vout.Actuator",
            "tag": "#%Vout",
            "motiWays": [
                0,
                1,
                -1,
                -2,
                0
            ],
            "duMin": -30000,
            "duMax": 30000,
            "duExceedTime": 3,
            "runtime": {
                "outFeed": 0,
                "stateWay": 0,
                "du": 0,
                "duExceedProtected": false,
                "simuPosi": 0
            }
        },
        "ServoCylinder": {
            "class": "Vout.Actuator.ServoCylinder",
            "tag": "#%Vout",
            "motiWays": [
                0,
                1,
                -1,
                -2,
                0
            ],
            "duMin": -30000,
            "duMax": 30000,
            "duExceedTime": 3,
            "duZero": 0,
            "vibFreq": 100,
            "vibAmp": 0,
            "moveP": 1000,
            "runtime": {
                "outFeed": 0,
                "stateWay": 0,
                "du": 0,
                "duExceedProtected": false,
                "simuPosi": 0
            }
        },
        "Vout.Actuator.ServoCylinder": {
            "class": "Vout.Actuator.ServoCylinder",
            "tag": "#%Vout",
            "motiWays": [
                0,
                1,
                -1,
                -2,
                0
            ],
            "duMin": -30000,
            "duMax": 30000,
            "duExceedTime": 3,
            "duZero": 0,
            "vibFreq": 100,
            "vibAmp": 0,
            "moveP": 1000,
            "runtime": {
                "outFeed": 0,
                "stateWay": 0,
                "du": 0,
                "duExceedProtected": false,
                "simuPosi": 0
            }
        },
        "DaFeed": {
            "class": "Vout.DaFeed",
            "tag": "#%Vout",
            "duZero": 0,
            "gain": 1,
            "runtime": {
                "outFeed": 0,
                "da": 0
            }
        },
        "Vout.DaFeed": {
            "class": "Vout.DaFeed",
            "tag": "#%Vout",
            "duZero": 0,
            "gain": 1,
            "runtime": {
                "outFeed": 0,
                "da": 0
            }
        },
        "ClosedCtrl": {
            "class": "ClosedCtrl",
            "feedChnl": 0,
            "plusDir": 1,
            "errorGate": 10,
            "errorExceedTime": 1
        },
        "KidCtrl": {
            "class": "ClosedCtrl.KidCtrl",
            "feedChnl": 0,
            "plusDir": 1,
            "errorGate": 10,
            "errorExceedTime": 1,
            "kMode": 1,
            "rectifyTime": 0.1,
            "k": 1,
            "i": 0.3,
            "d": 0,
            "runtime": {
                "instGain": 1,
                "instK": 1
            }
        },
        "ClosedCtrl.KidCtrl": {
            "class": "ClosedCtrl.KidCtrl",
            "feedChnl": 0,
            "plusDir": 1,
            "errorGate": 10,
            "errorExceedTime": 1,
            "kMode": 1,
            "rectifyTime": 0.1,
            "k": 1,
            "i": 0.3,
            "d": 0,
            "runtime": {
                "instGain": 1,
                "instK": 1
            }
        },
        "Controller": {
            "class": "Controller",
            "actuator": 0,
            "dispChnl": 0,
            "closedCtrl": [
                0,
                1,
                2,
                3,
                4,
                5,
                0
            ],
            "runtime": {
                "ctrlMode": 1,
                "refType": 0,
                "ref": 1.24,
                "refVelo": 0,
                "feed": 1.23,
                "feedVelo": 0,
                "mfu": 0,
                "cpu": 0,
                "cvu": 0,
                "u": 0,
                "duration": 0,
                "trackId": 0,
                "inWave": false,
                "setWaveFreq": 10,
                "setWaveMin": -1,
                "setWaveMax": 1,
                "waveMin": -1,
                "waveMax": 1,
                "setWaveNum": 100000,
                "waveCount": 0,
                "setCycleNum": 0,
                "cycleCount": 0,
                "x1": 0,
                "x2": 0
            }
        },
        "Pipe": {
            "class": "Pipe",
            "timeInPipe": false,
            "rfuInPipe": false,
            "acqRate": 10000,
            "uploadRate": 1000,
            "x1": 0,
            "x2": 0,
            "runtime": {
                "uploading": false
            }
        },
        "LogEvent": {
            "class": "LogEvent",
            "readFlag": false,
            "time": 0,
            "eventCode": 16
        }
    },
    {
        "product": "$Product",
        "drawer": "$Drawer",
        "modbus": "$Modbus",
        "vin": {
            "0": "$AdChnl",
            "1": "$AdChnl"
        },
        "din": {
            "0": "$Din",
            "1": "$Digital",
            "2": "$Digital"
        },
        "dout": {
            "0": "$Switch",
            "1": "$Switch"
        },
        "vout": {
            "0": "$ServoCylinder",
            "1": "$DaFeed"
        },
        "closedCtrl": {
            "0": "$KidCtrl"
        },
        "controller": {
            "0": "$Controller"
        },
        "pipe": "$Pipe",
        "logEvent": {
            "0": "$LogEvent",
            "1": "$LogEvent",
            "2": "$LogEvent",
            "3": "$LogEvent",
            "4": "$LogEvent",
            "5": "$LogEvent",
            "6": "$LogEvent",
            "7": "$LogEvent"
        }
    },
    {
        "vinTagList": [
            "disp",
            "extRef"
        ],
        "dinTagList": [
            "extRefEnabled",
            "dispLost",
            "extRefLost"
        ],
        "doutTagList": [
            "pumpPowerOn",
            "highPressureEnbled"
        ],
        "voutTagList": [
            "mainCylinder",
            "ctrlOutFeed"
        ],
        "closedCtrlTagList": [
            0
        ],
        "controllerTagList": [
            0
        ],
        "logEventTagList": [
            0,
            1,
            2,
            3,
            4,
            5,
            6,
            7
        ]
    }
]

let output={
    "product": {
        "class": "Product",
        "model": 1711,
        "rev": 0,
        "osver": 0.6,
        "sn": 2001711,
        "client": 0,
        "manufacturer": "LANGJIE",
        "device": "my_d711"
    },
    "drawer": {
        "class": "Drawer",
        "params": [
            0,
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            0
        ]
    },
    "modbus": {
        "class": "Modbus",
        "address": 1,
        "baudrate": 115200,
        "x1": 0,
        "x2": 0
    },
    "vin": {
        "0": {
            "class": "Vin.AdChnl",
            "tag": "disp",
            "minScale": 0,
            "maxScale": 100,
            "dot": 2,
            "unitCode": 1001,
            "delay": 0,
            "vCol": [
                0,
                0.2,
                0.5,
                1,
                2,
                5,
                10,
                20,
                50,
                100,
                0
            ],
            "adCol": [
                0,
                200,
                500,
                1000,
                2000,
                5000,
                10000,
                20000,
                50000,
                100000,
                0
            ],
            "runtime": {
                "binary": 0,
                "posi": 0,
                "velo": 0,
                "tare": 0,
                "userPosi": 0,
                "userPosiLimitMin": -100,
                "userPosiLimitMax": 100
            }
        },
        "1": {
            "class": "Vin.AdChnl",
            "tag": "extRef",
            "minScale": 0,
            "maxScale": 100,
            "dot": 2,
            "unitCode": 1001,
            "delay": 0,
            "vCol": [
                0,
                0.2,
                0.5,
                1,
                2,
                5,
                10,
                20,
                50,
                100,
                0
            ],
            "adCol": [
                0,
                200,
                500,
                1000,
                2000,
                5000,
                10000,
                20000,
                50000,
                100000,
                0
            ],
            "runtime": {
                "binary": 0,
                "posi": 0,
                "velo": 0,
                "tare": 0,
                "userPosi": 0,
                "userPosiLimitMin": -100,
                "userPosiLimitMax": 100
            }
        }
    },
    "din": {
        "0": {
            "class": "Din",
            "tag": "extRefEnabled",
            "runtime": {
                "state": false
            }
        },
        "1": {
            "class": "Din.Digital",
            "tag": "dispLost",
            "bitShift": 0,
            "runtime": {
                "state": false
            }
        },
        "2": {
            "class": "Din.Digital",
            "tag": "extRefLost",
            "bitShift": 0,
            "runtime": {
                "state": false
            }
        }
    },
    "dout": {
        "0": {
            "class": "Dout.Switch",
            "tag": "pumpPowerOn",
            "bitShift": 0,
            "safeLevel": false,
            "validLevel": true,
            "runtime": {
                "state": true
            }
        },
        "1": {
            "class": "Dout.Switch",
            "tag": "highPressureEnbled",
            "bitShift": 0,
            "safeLevel": false,
            "validLevel": true,
            "runtime": {
                "state": true
            }
        }
    },
    "vout": {
        "0": {
            "class": "Vout.Actuator.ServoCylinder",
            "tag": "mainCylinder",
            "motiWays": [
                0,
                1,
                -1,
                -2,
                0
            ],
            "duMin": -30000,
            "duMax": 30000,
            "duExceedTime": 3,
            "duZero": 0,
            "vibFreq": 100,
            "vibAmp": 0,
            "moveP": 1000,
            "runtime": {
                "outFeed": 0,
                "stateWay": 0,
                "du": 0,
                "duExceedProtected": false,
                "simuPosi": 0
            }
        },
        "1": {
            "class": "Vout.DaFeed",
            "tag": "ctrlOutFeed",
            "duZero": 0,
            "gain": 1,
            "runtime": {
                "outFeed": 0,
                "da": 0
            }
        }
    },
    "closedCtrl": {
        "0": {
            "class": "ClosedCtrl.KidCtrl",
            "feedChnl": 0,
            "plusDir": 1,
            "errorGate": 10,
            "errorExceedTime": 1,
            "kMode": 1,
            "rectifyTime": 0.1,
            "k": 1,
            "i": 0.3,
            "d": 0,
            "runtime": {
                "instGain": 1,
                "instK": 1
            }
        }
    },
    "controller": {
        "0": {
            "class": "Controller",
            "actuator": 0,
            "dispChnl": 0,
            "closedCtrl": [
                0,
                1,
                2,
                3,
                4,
                5,
                0
            ],
            "runtime": {
                "ctrlMode": 1,
                "refType": 0,
                "ref": 1.24,
                "refVelo": 0,
                "feed": 1.23,
                "feedVelo": 0,
                "mfu": 0,
                "cpu": 0,
                "cvu": 0,
                "u": 0,
                "duration": 0,
                "trackId": 0,
                "inWave": false,
                "setWaveFreq": 10,
                "setWaveMin": -1,
                "setWaveMax": 1,
                "waveMin": -1,
                "waveMax": 1,
                "setWaveNum": 100000,
                "waveCount": 0,
                "setCycleNum": 0,
                "cycleCount": 0,
                "x1": 0,
                "x2": 0
            }
        }
    },
    "pipe": {
        "class": "Pipe",
        "timeInPipe": false,
        "rfuInPipe": false,
        "acqRate": 10000,
        "uploadRate": 1000,
        "x1": 0,
        "x2": 0,
        "runtime": {
            "uploading": false
        }
    },
    "logEvent": {
        "0": {
            "class": "LogEvent",
            "readFlag": false,
            "time": 0,
            "eventCode": 16
        },
        "1": {
            "class": "LogEvent",
            "readFlag": false,
            "time": 0,
            "eventCode": 16
        },
        "2": {
            "class": "LogEvent",
            "readFlag": false,
            "time": 0,
            "eventCode": 16
        },
        "3": {
            "class": "LogEvent",
            "readFlag": false,
            "time": 0,
            "eventCode": 16
        },
        "4": {
            "class": "LogEvent",
            "readFlag": false,
            "time": 0,
            "eventCode": 16
        },
        "5": {
            "class": "LogEvent",
            "readFlag": false,
            "time": 0,
            "eventCode": 16
        },
        "6": {
            "class": "LogEvent",
            "readFlag": false,
            "time": 0,
            "eventCode": 16
        },
        "7": {
            "class": "LogEvent",
            "readFlag": false,
            "time": 0,
            "eventCode": 16
        }
    }
}


const help=`
   生成最终的实例
   input:[F1_output[0]每个类的类定义,F2_output[0]格式化后的实例,F2_output[1]tag名]
   output: input[1]实例化后的结果
`;

import DataTypeUtils from "./DataTypeUtils.js"


class F {
    static classNumMap={};
    static curClassName="";
    static run(nodeJObject){
        if(DataTypeUtils.getDataType(nodeJObject)=="string"){
            return
        }
        for (let k in nodeJObject){
            let vTokenType=DataTypeUtils.getDataType(nodeJObject[k]);
            let vTokenVal=nodeJObject[k];
            switch (vTokenType){
                case "string":{
                    if(vTokenVal.startsWith("$")){
                        let className=vTokenVal.replaceAll("$","");
                        if(/^[0-9]+$/.test(k) && F.curClassName.indexOf(".")==-1) {
                            let inx=Number.parseInt(k);
                            let tagName=input[2][F.curClassName+"TagList"][inx];
                            let ins= F.getInsTanceByClassName(className,tagName);
                            nodeJObject[k]=ins;
                        }else {
                            let ins= F.getInsTanceByClassName(className,null);
                            nodeJObject[k]=ins;
                        }
                    }
                    break;
                }
                case "object":{
                    F.curClassName=k;
                    F.run(vTokenVal);
                }
                break;
             }


       }
    }
    static getInsTanceByClassName(className,tag){
       let classJsonStr=JSON.stringify( input[0][className]);
       if(Number.isInteger(tag)){
           classJsonStr=  classJsonStr.replaceAll("%",tag);
           return JSON.parse(classJsonStr);
       }else {
          let ins=  JSON.parse(classJsonStr);
           if(ins.tag){
               ins.tag=tag;
           }
           return ins;
       }
    }

    static init(){
        F.classNumMap={};
        F.curClassName="";
    }

}



async function main(param){
    input=param;
    F.init();
    let tempInput= JSON.parse(JSON.stringify(input[1]));
    await F.run(tempInput);
    return tempInput;
}

export default {
    F,
    input,
    output,
    help,
    main
}