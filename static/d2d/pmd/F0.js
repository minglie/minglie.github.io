let input={
        "class": "Pmd.D711",
        "remark": "4-20mA servocontroller for Zheda",
        "definition": {
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
                ]
            },
            "AcChnl": {
                "class": "Vin.AcChnl",
                "encoder": 0,
                "res_u": 1,
                "zero": 0
            },
            "IcChnl": {
                "class": "Vin.IcChnl",
                "bits": 16,
                "res_u": 1
            },
            "FeedIcChnl": {
                "class": "Vin.FeedIcChnl",
                "res_u": 0.1
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
                "bitShift": 0
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
                "bitShift": 0,
                "safeLevel": false,
                "validLevel": true
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
                    "stateWay": 0,
                    "du": 0,
                    "duExceedProtected": false,
                    "simuPosi": 0
                }
            },
            "ServoCylinder": {
                "class": "Vout.Actuator.ServoCylinder",
                "duZero": 0,
                "vibFreq": 100,
                "vibAmp": 0,
                "moveP": 1000
            },
            "DaFeed": {
                "class": "Vout.DaFeed",
                "duZero": 0,
                "gain": 1,
                "runtime": {
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
        "configuration": {
            "product": "$Product",
            "drawer": "$Drawer",
            "modbus": "$Modbus",
            "vin": [
                "disp$AdChnl",
                "extRef$AdChnl"
            ],
            "din": [
                "extRefEnabled$Din",
                "dispLost$Digital",
                "extRefLost$Digital"
            ],
            "dout": [
                "pumpPowerOn$Switch",
                "highPressureEnbled$Switch"
            ],
            "vout": [
                "mainCylinder$ServoCylinder",
                "ctrlOutFeed$DaFeed"
            ],
            "closedCtrl": [
                "$KidCtrl"
            ],
            "controller": [
                "$Controller"
            ],
            "pipe": "$Pipe",
            "logEvent": [
                "$LogEvent",
                "$LogEvent",
                "$LogEvent",
                "$LogEvent",
                "$LogEvent",
                "$LogEvent",
                "$LogEvent",
                "$LogEvent"
            ]
        }
    };

let output=[
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
            ]
        },
        "AcChnl": {
            "class": "Vin.AcChnl",
            "encoder": 0,
            "res_u": 1,
            "zero": 0
        },
        "IcChnl": {
            "class": "Vin.IcChnl",
            "bits": 16,
            "res_u": 1
        },
        "FeedIcChnl": {
            "class": "Vin.FeedIcChnl",
            "res_u": 0.1
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
            "bitShift": 0
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
            "bitShift": 0,
            "safeLevel": false,
            "validLevel": true
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
                "stateWay": 0,
                "du": 0,
                "duExceedProtected": false,
                "simuPosi": 0
            }
        },
        "ServoCylinder": {
            "class": "Vout.Actuator.ServoCylinder",
            "duZero": 0,
            "vibFreq": 100,
            "vibAmp": 0,
            "moveP": 1000
        },
        "DaFeed": {
            "class": "Vout.DaFeed",
            "duZero": 0,
            "gain": 1,
            "runtime": {
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
        "vin": [
            "disp$AdChnl",
            "extRef$AdChnl"
        ],
        "din": [
            "extRefEnabled$Din",
            "dispLost$Digital",
            "extRefLost$Digital"
        ],
        "dout": [
            "pumpPowerOn$Switch",
            "highPressureEnbled$Switch"
        ],
        "vout": [
            "mainCylinder$ServoCylinder",
            "ctrlOutFeed$DaFeed"
        ],
        "closedCtrl": [
            "$KidCtrl"
        ],
        "controller": [
            "$Controller"
        ],
        "pipe": "$Pipe",
        "logEvent": [
            "$LogEvent",
            "$LogEvent",
            "$LogEvent",
            "$LogEvent",
            "$LogEvent",
            "$LogEvent",
            "$LogEvent",
            "$LogEvent"
        ]
    }
]

const help=`
   将原始json的定义与配置分开
   input: 原始json
   output: [定义,配置]
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
    input,
    output,
    help,
    main
}