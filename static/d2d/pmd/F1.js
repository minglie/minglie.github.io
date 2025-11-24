let input={
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
}
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
    [
        {
            "$Product_class": "Product"
        },
        {
            "$Product_model": 0
        },
        {
            "$Product_rev": 2
        },
        {
            "$Product_osver": 4
        },
        {
            "$Product_sn": 6
        },
        {
            "$Product_client": 8
        },
        {
            "$Product_manufacturer": 10
        },
        {
            "$Product_device": 18
        },
        {
            "$Drawer_class": "Drawer"
        },
        {
            "$Drawer_params": 0
        },
        {
            "$Modbus_class": "Modbus"
        },
        {
            "$Modbus_address": 0
        },
        {
            "$Modbus_baudrate": 2
        },
        {
            "$Modbus_x1": 4
        },
        {
            "$Modbus_x2": 6
        },
        {
            "$Vin_class": "Vin"
        },
        {
            "$Vin_tag": 0
        },
        {
            "$Vin_minScale": 8
        },
        {
            "$Vin_maxScale": 10
        },
        {
            "$Vin_dot": 12
        },
        {
            "$Vin_unitCode": 14
        },
        {
            "$Vin_delay": 16
        },
        {
            "$Vin_runtime_binary": 0
        },
        {
            "$Vin_runtime_posi": 2
        },
        {
            "$Vin_runtime_velo": 4
        },
        {
            "$Vin_runtime_tare": 6
        },
        {
            "$Vin_runtime_userPosi": 8
        },
        {
            "$Vin_runtime_userPosiLimitMin": 10
        },
        {
            "$Vin_runtime_userPosiLimitMax": 12
        },
        {
            "$AdChnl_class": "Vin.AdChnl"
        },
        {
            "$AdChnl_tag": 0
        },
        {
            "$AdChnl_minScale": 8
        },
        {
            "$AdChnl_maxScale": 10
        },
        {
            "$AdChnl_dot": 12
        },
        {
            "$AdChnl_unitCode": 14
        },
        {
            "$AdChnl_delay": 16
        },
        {
            "$AdChnl_vCol": 18
        },
        {
            "$AdChnl_adCol": 40
        },
        {
            "$AdChnl_runtime_binary": 0
        },
        {
            "$AdChnl_runtime_posi": 2
        },
        {
            "$AdChnl_runtime_velo": 4
        },
        {
            "$AdChnl_runtime_tare": 6
        },
        {
            "$AdChnl_runtime_userPosi": 8
        },
        {
            "$AdChnl_runtime_userPosiLimitMin": 10
        },
        {
            "$AdChnl_runtime_userPosiLimitMax": 12
        },
        {
            "$Vin.AdChnl_class": 0
        },
        {
            "$Vin.AdChnl_tag": 8
        },
        {
            "$Vin.AdChnl_minScale": 16
        },
        {
            "$Vin.AdChnl_maxScale": 18
        },
        {
            "$Vin.AdChnl_dot": 20
        },
        {
            "$Vin.AdChnl_unitCode": 22
        },
        {
            "$Vin.AdChnl_delay": 24
        },
        {
            "$Vin.AdChnl_vCol": 26
        },
        {
            "$Vin.AdChnl_adCol": 48
        },
        {
            "$Vin.AdChnl_runtime_binary": 70
        },
        {
            "$Vin.AdChnl_runtime_posi": 72
        },
        {
            "$Vin.AdChnl_runtime_velo": 74
        },
        {
            "$Vin.AdChnl_runtime_tare": 76
        },
        {
            "$Vin.AdChnl_runtime_userPosi": 78
        },
        {
            "$Vin.AdChnl_runtime_userPosiLimitMin": 80
        },
        {
            "$Vin.AdChnl_runtime_userPosiLimitMax": 82
        },
        {
            "$AcChnl_class": "Vin.AcChnl"
        },
        {
            "$AcChnl_tag": 0
        },
        {
            "$AcChnl_minScale": 8
        },
        {
            "$AcChnl_maxScale": 10
        },
        {
            "$AcChnl_dot": 12
        },
        {
            "$AcChnl_unitCode": 14
        },
        {
            "$AcChnl_delay": 16
        },
        {
            "$AcChnl_encoder": 18
        },
        {
            "$AcChnl_res_u": 20
        },
        {
            "$AcChnl_zero": 22
        },
        {
            "$AcChnl_runtime_binary": 0
        },
        {
            "$AcChnl_runtime_posi": 2
        },
        {
            "$AcChnl_runtime_velo": 4
        },
        {
            "$AcChnl_runtime_tare": 6
        },
        {
            "$AcChnl_runtime_userPosi": 8
        },
        {
            "$AcChnl_runtime_userPosiLimitMin": 10
        },
        {
            "$AcChnl_runtime_userPosiLimitMax": 12
        },
        {
            "$Vin.AcChnl_class": 0
        },
        {
            "$Vin.AcChnl_tag": 8
        },
        {
            "$Vin.AcChnl_minScale": 16
        },
        {
            "$Vin.AcChnl_maxScale": 18
        },
        {
            "$Vin.AcChnl_dot": 20
        },
        {
            "$Vin.AcChnl_unitCode": 22
        },
        {
            "$Vin.AcChnl_delay": 24
        },
        {
            "$Vin.AcChnl_encoder": 26
        },
        {
            "$Vin.AcChnl_res_u": 28
        },
        {
            "$Vin.AcChnl_zero": 30
        },
        {
            "$Vin.AcChnl_runtime_binary": 32
        },
        {
            "$Vin.AcChnl_runtime_posi": 34
        },
        {
            "$Vin.AcChnl_runtime_velo": 36
        },
        {
            "$Vin.AcChnl_runtime_tare": 38
        },
        {
            "$Vin.AcChnl_runtime_userPosi": 40
        },
        {
            "$Vin.AcChnl_runtime_userPosiLimitMin": 42
        },
        {
            "$Vin.AcChnl_runtime_userPosiLimitMax": 44
        },
        {
            "$IcChnl_class": "Vin.IcChnl"
        },
        {
            "$IcChnl_tag": 0
        },
        {
            "$IcChnl_minScale": 8
        },
        {
            "$IcChnl_maxScale": 10
        },
        {
            "$IcChnl_dot": 12
        },
        {
            "$IcChnl_unitCode": 14
        },
        {
            "$IcChnl_delay": 16
        },
        {
            "$IcChnl_bits": 18
        },
        {
            "$IcChnl_res_u": 20
        },
        {
            "$IcChnl_runtime_binary": 0
        },
        {
            "$IcChnl_runtime_posi": 2
        },
        {
            "$IcChnl_runtime_velo": 4
        },
        {
            "$IcChnl_runtime_tare": 6
        },
        {
            "$IcChnl_runtime_userPosi": 8
        },
        {
            "$IcChnl_runtime_userPosiLimitMin": 10
        },
        {
            "$IcChnl_runtime_userPosiLimitMax": 12
        },
        {
            "$Vin.IcChnl_class": 0
        },
        {
            "$Vin.IcChnl_tag": 8
        },
        {
            "$Vin.IcChnl_minScale": 16
        },
        {
            "$Vin.IcChnl_maxScale": 18
        },
        {
            "$Vin.IcChnl_dot": 20
        },
        {
            "$Vin.IcChnl_unitCode": 22
        },
        {
            "$Vin.IcChnl_delay": 24
        },
        {
            "$Vin.IcChnl_bits": 26
        },
        {
            "$Vin.IcChnl_res_u": 28
        },
        {
            "$Vin.IcChnl_runtime_binary": 30
        },
        {
            "$Vin.IcChnl_runtime_posi": 32
        },
        {
            "$Vin.IcChnl_runtime_velo": 34
        },
        {
            "$Vin.IcChnl_runtime_tare": 36
        },
        {
            "$Vin.IcChnl_runtime_userPosi": 38
        },
        {
            "$Vin.IcChnl_runtime_userPosiLimitMin": 40
        },
        {
            "$Vin.IcChnl_runtime_userPosiLimitMax": 42
        },
        {
            "$FeedIcChnl_class": "Vin.FeedIcChnl"
        },
        {
            "$FeedIcChnl_tag": 0
        },
        {
            "$FeedIcChnl_minScale": 8
        },
        {
            "$FeedIcChnl_maxScale": 10
        },
        {
            "$FeedIcChnl_dot": 12
        },
        {
            "$FeedIcChnl_unitCode": 14
        },
        {
            "$FeedIcChnl_delay": 16
        },
        {
            "$FeedIcChnl_res_u": 18
        },
        {
            "$FeedIcChnl_runtime_binary": 0
        },
        {
            "$FeedIcChnl_runtime_posi": 2
        },
        {
            "$FeedIcChnl_runtime_velo": 4
        },
        {
            "$FeedIcChnl_runtime_tare": 6
        },
        {
            "$FeedIcChnl_runtime_userPosi": 8
        },
        {
            "$FeedIcChnl_runtime_userPosiLimitMin": 10
        },
        {
            "$FeedIcChnl_runtime_userPosiLimitMax": 12
        },
        {
            "$Vin.FeedIcChnl_class": 0
        },
        {
            "$Vin.FeedIcChnl_tag": 8
        },
        {
            "$Vin.FeedIcChnl_minScale": 16
        },
        {
            "$Vin.FeedIcChnl_maxScale": 18
        },
        {
            "$Vin.FeedIcChnl_dot": 20
        },
        {
            "$Vin.FeedIcChnl_unitCode": 22
        },
        {
            "$Vin.FeedIcChnl_delay": 24
        },
        {
            "$Vin.FeedIcChnl_res_u": 26
        },
        {
            "$Vin.FeedIcChnl_runtime_binary": 28
        },
        {
            "$Vin.FeedIcChnl_runtime_posi": 30
        },
        {
            "$Vin.FeedIcChnl_runtime_velo": 32
        },
        {
            "$Vin.FeedIcChnl_runtime_tare": 34
        },
        {
            "$Vin.FeedIcChnl_runtime_userPosi": 36
        },
        {
            "$Vin.FeedIcChnl_runtime_userPosiLimitMin": 38
        },
        {
            "$Vin.FeedIcChnl_runtime_userPosiLimitMax": 40
        },
        {
            "$Din_class": "Din"
        },
        {
            "$Din_tag": 0
        },
        {
            "$Din_runtime_state": 0
        },
        {
            "$Digital_class": "Din.Digital"
        },
        {
            "$Digital_tag": 0
        },
        {
            "$Digital_bitShift": 8
        },
        {
            "$Digital_runtime_state": 0
        },
        {
            "$Din.Digital_class": 0
        },
        {
            "$Din.Digital_tag": 8
        },
        {
            "$Din.Digital_bitShift": 16
        },
        {
            "$Din.Digital_runtime_state": 18
        },
        {
            "$Dout_class": "Dout"
        },
        {
            "$Dout_tag": 0
        },
        {
            "$Dout_runtime_state": 0
        },
        {
            "$Switch_class": "Dout.Switch"
        },
        {
            "$Switch_tag": 0
        },
        {
            "$Switch_bitShift": 8
        },
        {
            "$Switch_safeLevel": 10
        },
        {
            "$Switch_validLevel": 11
        },
        {
            "$Switch_runtime_state": 0
        },
        {
            "$Dout.Switch_class": 0
        },
        {
            "$Dout.Switch_tag": 8
        },
        {
            "$Dout.Switch_bitShift": 16
        },
        {
            "$Dout.Switch_safeLevel": 18
        },
        {
            "$Dout.Switch_validLevel": 19
        },
        {
            "$Dout.Switch_runtime_state": 20
        },
        {
            "$Vout_class": "Vout"
        },
        {
            "$Vout_tag": 0
        },
        {
            "$Vout_runtime_outFeed": 0
        },
        {
            "$Actuator_class": "Vout.Actuator"
        },
        {
            "$Actuator_tag": 0
        },
        {
            "$Actuator_motiWays": 8
        },
        {
            "$Actuator_duMin": 18
        },
        {
            "$Actuator_duMax": 20
        },
        {
            "$Actuator_duExceedTime": 22
        },
        {
            "$Actuator_runtime_outFeed": 0
        },
        {
            "$Actuator_runtime_stateWay": 2
        },
        {
            "$Actuator_runtime_du": 4
        },
        {
            "$Actuator_runtime_duExceedProtected": 6
        },
        {
            "$Actuator_runtime_simuPosi": 8
        },
        {
            "$Vout.Actuator_class": 0
        },
        {
            "$Vout.Actuator_tag": 8
        },
        {
            "$Vout.Actuator_motiWays": 16
        },
        {
            "$Vout.Actuator_duMin": 26
        },
        {
            "$Vout.Actuator_duMax": 28
        },
        {
            "$Vout.Actuator_duExceedTime": 30
        },
        {
            "$Vout.Actuator_runtime_outFeed": 32
        },
        {
            "$Vout.Actuator_runtime_stateWay": 34
        },
        {
            "$Vout.Actuator_runtime_du": 36
        },
        {
            "$Vout.Actuator_runtime_duExceedProtected": 38
        },
        {
            "$Vout.Actuator_runtime_simuPosi": 39
        },
        {
            "$ServoCylinder_class": "Vout.Actuator.ServoCylinder"
        },
        {
            "$ServoCylinder_tag": 0
        },
        {
            "$ServoCylinder_motiWays": 8
        },
        {
            "$ServoCylinder_duMin": 18
        },
        {
            "$ServoCylinder_duMax": 20
        },
        {
            "$ServoCylinder_duExceedTime": 22
        },
        {
            "$ServoCylinder_duZero": 24
        },
        {
            "$ServoCylinder_vibFreq": 26
        },
        {
            "$ServoCylinder_vibAmp": 28
        },
        {
            "$ServoCylinder_moveP": 30
        },
        {
            "$ServoCylinder_runtime_outFeed": 0
        },
        {
            "$ServoCylinder_runtime_stateWay": 2
        },
        {
            "$ServoCylinder_runtime_du": 4
        },
        {
            "$ServoCylinder_runtime_duExceedProtected": 6
        },
        {
            "$ServoCylinder_runtime_simuPosi": 8
        },
        {
            "$Vout.Actuator.ServoCylinder_class": 0
        },
        {
            "$Vout.Actuator.ServoCylinder_tag": 8
        },
        {
            "$Vout.Actuator.ServoCylinder_motiWays": 16
        },
        {
            "$Vout.Actuator.ServoCylinder_duMin": 26
        },
        {
            "$Vout.Actuator.ServoCylinder_duMax": 28
        },
        {
            "$Vout.Actuator.ServoCylinder_duExceedTime": 30
        },
        {
            "$Vout.Actuator.ServoCylinder_duZero": 32
        },
        {
            "$Vout.Actuator.ServoCylinder_vibFreq": 34
        },
        {
            "$Vout.Actuator.ServoCylinder_vibAmp": 36
        },
        {
            "$Vout.Actuator.ServoCylinder_moveP": 38
        },
        {
            "$Vout.Actuator.ServoCylinder_runtime_outFeed": 40
        },
        {
            "$Vout.Actuator.ServoCylinder_runtime_stateWay": 42
        },
        {
            "$Vout.Actuator.ServoCylinder_runtime_du": 44
        },
        {
            "$Vout.Actuator.ServoCylinder_runtime_duExceedProtected": 46
        },
        {
            "$Vout.Actuator.ServoCylinder_runtime_simuPosi": 47
        },
        {
            "$DaFeed_class": "Vout.DaFeed"
        },
        {
            "$DaFeed_tag": 0
        },
        {
            "$DaFeed_duZero": 8
        },
        {
            "$DaFeed_gain": 10
        },
        {
            "$DaFeed_runtime_outFeed": 0
        },
        {
            "$DaFeed_runtime_da": 2
        },
        {
            "$Vout.DaFeed_class": 0
        },
        {
            "$Vout.DaFeed_tag": 8
        },
        {
            "$Vout.DaFeed_duZero": 16
        },
        {
            "$Vout.DaFeed_gain": 18
        },
        {
            "$Vout.DaFeed_runtime_outFeed": 20
        },
        {
            "$Vout.DaFeed_runtime_da": 22
        },
        {
            "$ClosedCtrl_class": "ClosedCtrl"
        },
        {
            "$ClosedCtrl_feedChnl": 0
        },
        {
            "$ClosedCtrl_plusDir": 2
        },
        {
            "$ClosedCtrl_errorGate": 4
        },
        {
            "$ClosedCtrl_errorExceedTime": 6
        },
        {
            "$KidCtrl_class": "ClosedCtrl.KidCtrl"
        },
        {
            "$KidCtrl_feedChnl": 0
        },
        {
            "$KidCtrl_plusDir": 2
        },
        {
            "$KidCtrl_errorGate": 4
        },
        {
            "$KidCtrl_errorExceedTime": 6
        },
        {
            "$KidCtrl_kMode": 8
        },
        {
            "$KidCtrl_rectifyTime": 10
        },
        {
            "$KidCtrl_k": 12
        },
        {
            "$KidCtrl_i": 14
        },
        {
            "$KidCtrl_d": 16
        },
        {
            "$KidCtrl_runtime_instGain": 0
        },
        {
            "$KidCtrl_runtime_instK": 2
        },
        {
            "$ClosedCtrl.KidCtrl_class": 0
        },
        {
            "$ClosedCtrl.KidCtrl_feedChnl": 8
        },
        {
            "$ClosedCtrl.KidCtrl_plusDir": 10
        },
        {
            "$ClosedCtrl.KidCtrl_errorGate": 12
        },
        {
            "$ClosedCtrl.KidCtrl_errorExceedTime": 14
        },
        {
            "$ClosedCtrl.KidCtrl_kMode": 16
        },
        {
            "$ClosedCtrl.KidCtrl_rectifyTime": 18
        },
        {
            "$ClosedCtrl.KidCtrl_k": 20
        },
        {
            "$ClosedCtrl.KidCtrl_i": 22
        },
        {
            "$ClosedCtrl.KidCtrl_d": 24
        },
        {
            "$ClosedCtrl.KidCtrl_runtime_instGain": 26
        },
        {
            "$ClosedCtrl.KidCtrl_runtime_instK": 28
        },
        {
            "$Controller_class": "Controller"
        },
        {
            "$Controller_actuator": 0
        },
        {
            "$Controller_dispChnl": 2
        },
        {
            "$Controller_closedCtrl": 4
        },
        {
            "$Controller_runtime_ctrlMode": 0
        },
        {
            "$Controller_runtime_refType": 2
        },
        {
            "$Controller_runtime_ref": 4
        },
        {
            "$Controller_runtime_refVelo": 6
        },
        {
            "$Controller_runtime_feed": 8
        },
        {
            "$Controller_runtime_feedVelo": 10
        },
        {
            "$Controller_runtime_mfu": 12
        },
        {
            "$Controller_runtime_cpu": 14
        },
        {
            "$Controller_runtime_cvu": 16
        },
        {
            "$Controller_runtime_u": 18
        },
        {
            "$Controller_runtime_duration": 20
        },
        {
            "$Controller_runtime_trackId": 22
        },
        {
            "$Controller_runtime_inWave": 24
        },
        {
            "$Controller_runtime_setWaveFreq": 26
        },
        {
            "$Controller_runtime_setWaveMin": 28
        },
        {
            "$Controller_runtime_setWaveMax": 30
        },
        {
            "$Controller_runtime_waveMin": 32
        },
        {
            "$Controller_runtime_waveMax": 34
        },
        {
            "$Controller_runtime_setWaveNum": 36
        },
        {
            "$Controller_runtime_waveCount": 38
        },
        {
            "$Controller_runtime_setCycleNum": 40
        },
        {
            "$Controller_runtime_cycleCount": 42
        },
        {
            "$Controller_runtime_x1": 44
        },
        {
            "$Controller_runtime_x2": 46
        },
        {
            "$Pipe_class": "Pipe"
        },
        {
            "$Pipe_timeInPipe": 0
        },
        {
            "$Pipe_rfuInPipe": 1
        },
        {
            "$Pipe_acqRate": 2
        },
        {
            "$Pipe_uploadRate": 4
        },
        {
            "$Pipe_x1": 6
        },
        {
            "$Pipe_x2": 8
        },
        {
            "$Pipe_runtime_uploading": 0
        },
        {
            "$LogEvent_class": "LogEvent"
        },
        {
            "$LogEvent_readFlag": 0
        },
        {
            "$LogEvent_time": 1
        },
        {
            "$LogEvent_eventCode": 3
        }
    ]
]
const help=`
   获取类定义和字段偏移
   input:F1_output[0]
   output: [每个类的完整定义,每个类的相对jsonPath,每个类的offset,每个类的runtime offset]
`;


import DataTypeUtils from "./DataTypeUtils.js"

class F {

    static resArr=[]
    static curClassName="";
    static g_id=0;
    static classBodyDefineMap={};
    static classOffsetMap={};
    static classRunTimeOffsetMap={};

    static getClassDefine(definitionJobject){
        F.classBodyDefineMap={};
        for (let k in definitionJobject){
            let classBody = definitionJobject[k];
            let  className = k;
            let bodyClass=classBody["class"];
            let classArr=bodyClass.split(".");
            //继承的
            for (let i=0;i<classArr.length-1;i++){
                let extendFields=F.classBodyDefineMap[classArr[i]];
                classBody={...extendFields,...classBody};
                if(classBody.runtime){
                    let runtime= {...extendFields.runtime,...classBody.runtime};
                    delete classBody.runtime;
                    classBody.runtime=runtime;
                }
            }
            F.classBodyDefineMap[className]= classBody;
            F.classBodyDefineMap[bodyClass]=classBody;
        }

        for (let k in definitionJobject){
            let className =k;
            let classBody=  F.classBodyDefineMap[className];
            let bodyClass=classBody["class"];
            F.replaceDollarAndArray2Obj(className,bodyClass,classBody);
        }
        return F.classBodyDefineMap;
    }
    /**
     * 替换definition中的数组 与 对象引用
     * @param className
     * @param bodyClass
     * @param nodeJObject
     */
    static replaceDollarAndArray2Obj(className,bodyClass,nodeJObject){
        for (let k in nodeJObject){
            let vTokenType=DataTypeUtils.getDataType(nodeJObject[k]);
            let vTokenVal=nodeJObject[k];
            switch (vTokenType){
                case "string":{
                    let val=vTokenVal;
                    if(val.startsWith("$")){
                        let pureClassName=val.replaceAll("$","");
                        nodeJObject[k]=F.classBodyDefineMap[pureClassName];
                        F.classBodyDefineMap[className]=nodeJObject;
                        F.classBodyDefineMap[bodyClass]=nodeJObject;
                    }
                    break;
                }
                case "array":{
                    let jArray=vTokenVal;
                    for (let i=0;i<jArray.length;i++){
                        let aitem=jArray[i];
                        if(DataTypeUtils.getDataType(aitem)=="string"){
                            let val=aitem.toString();
                            jArray[i]=val.replaceAll("%",i+"");
                            if (val.indexOf("$")>=0)
                            {
                                let pureClassName2 = val.replaceAll("$", "");
                                aitem = F.classBodyDefineMap[pureClassName2];
                                jArray[i]= aitem;
                            }
                        }
                    }
                    if(DataTypeUtils.getDataType(jArray[0])=="object"){
                        let arr2Obj={};
                        for (let i=0;i<jArray.length;i++){
                            let aitem = jArray[i];
                            if(DataTypeUtils.getDataType(aitem)=="string"){
                                aitem= aitem.replaceAll("%", i + "");
                            }
                            arr2Obj[""+i]=aitem;
                        }
                        nodeJObject[k]=arr2Obj;
                    }
                    F.classBodyDefineMap[className]=nodeJObject;
                    F.classBodyDefineMap[bodyClass]=nodeJObject;
                    break;
                }


            }
        }
    }


    static getRelativeJsonPathList(){
        for (let className in F.classBodyDefineMap){
            if(className.indexOf(".")>-1){
                continue;
            }
            F.curClassName=className.split(".").at(-1);
            F.g_id=0;
            F.run("$"+`${className}`,F.classBodyDefineMap[className])
        }

        return F.resArr;
    }


    static run(parent,nodeJObject){
        for (let k in nodeJObject){
            if(k=="runtime"  && F.curClassName.indexOf(".")==-1){
               // console.log("AAA",F.curClassName,k);
                F.g_id=0;
                for (let runtimeKey in nodeJObject["runtime"]){
                    let o={};
                    o["$"+F.curClassName+"_runtime_"+runtimeKey]=F.g_id;
                    F.resArr.push(o);
                    switch (DataTypeUtils.getDataType(nodeJObject["runtime"][runtimeKey])){
                        case "boolean" : F.g_id=F.g_id+1;break;
                        default:F.g_id=F.g_id+2;break;
                    }
                }
                continue;
            }
            let parentTmp=`${parent}_${k}`;
            if(k=="class" && F.curClassName.indexOf(".")==-1){
                let o={};
                o["$"+F.curClassName+"_class"]=nodeJObject[k];
                F.resArr.push(o);
                continue;
            }
            let vTokenType=DataTypeUtils.getDataType(nodeJObject[k]);
            let vTokenVal=nodeJObject[k];
            switch (vTokenType){
                case "string":{
                    F.appendId(parentTmp,8);
                    break;
                }
                case "number":{
                    F.appendId(parentTmp,2);
                    break;
                }
                case "boolean":{
                    F.appendId(parentTmp,1);
                    break;
                }
                case "array":{
                    F.appendId(parentTmp,vTokenVal.length*2);
                    break;
                }
                case "object":{
                    F.run(parentTmp,vTokenVal);
                }
                break;
            }
        }
    }
    static appendId(jsonPath,addId){

        if(jsonPath!=null){
            let o={};
            o[jsonPath]=F.g_id
            F.resArr.push(o);
        }
        F.g_id=F.g_id+addId;
    }



    static getOffsetMap(relativeJsonPathList){
        //console.log(relativeJsonPathList)

        for (let i=0;i<relativeJsonPathList.length;i++){
            for (let k in relativeJsonPathList[i]){
                let v=relativeJsonPathList[i][k];
                if(k.indexOf("class")>-1 && k.indexOf(".")>-1){
                    continue;
                }
                if(k.indexOf("runtime")>-1){
                    let ksplit=k.split("_");
                    let  className=  ksplit[0].replaceAll("$","");
                    if(!F.classRunTimeOffsetMap[className]){
                        F.classRunTimeOffsetMap[className]={}
                    }
                    F.classRunTimeOffsetMap[className][ksplit.at(-1)]=v;
                    //console.log(k)
                    continue;
                }
                let ksplit=k.split("_");
                let  className=  ksplit[0].replaceAll("$","");
                if(!F.classOffsetMap[className]){
                    F.classOffsetMap[className]={}
                }
                if(ksplit[1] !="class"){
                    F.classOffsetMap[className][ksplit[1]]=v;
                }
            }

        }
        return   [F.classOffsetMap, F.classRunTimeOffsetMap]
    }

    static init(){
        F.resArr=[]
        F.curClassName="";
        F.g_id=0;
        F.classBodyDefineMap={};
        F.classOffsetMap={};
        F.classRunTimeOffsetMap={};
    }
}



async function main(param){
    input=param;
    F.init();
    let r=await F.getClassDefine(input);
    let r1=await F.getRelativeJsonPathList();
    let r2=await F.getOffsetMap(r1);
    return [r,r1,r2[0],r2[1]];
    //return r1;
}

export default {
    input,
    output,
    help,
    main
}