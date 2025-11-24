let input={
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
};

let output=[
    {
        "$_product_class": "Product"
    },
    {
        "$_product_model": 0
    },
    {
        "$_product_rev": 2
    },
    {
        "$_product_osver": 4
    },
    {
        "$_product_sn": 6
    },
    {
        "$_product_client": 8
    },
    {
        "$_product_manufacturer": 10
    },
    {
        "$_product_device": 18
    },
    {
        "$_drawer_class": "Drawer"
    },
    {
        "$_drawer_params_0": 26
    },
    {
        "$_drawer_params_1": 28
    },
    {
        "$_drawer_params_2": 30
    },
    {
        "$_drawer_params_3": 32
    },
    {
        "$_drawer_params_4": 34
    },
    {
        "$_drawer_params_5": 36
    },
    {
        "$_drawer_params_6": 38
    },
    {
        "$_drawer_params_7": 40
    },
    {
        "$_drawer_params_8": 42
    },
    {
        "$_drawer_params_9": 44
    },
    {
        "$_drawer_params_10": 46
    },
    {
        "$_drawer_params_11": 48
    },
    {
        "$_modbus_class": "Modbus"
    },
    {
        "$_modbus_address": 50
    },
    {
        "$_modbus_baudrate": 52
    },
    {
        "$_modbus_x1": 54
    },
    {
        "$_modbus_x2": 56
    },
    {
        "$_vin_0_class": "AdChnl"
    },
    {
        "$_vin_0_tag": 58
    },
    {
        "$_vin_0_minScale": 66
    },
    {
        "$_vin_0_maxScale": 68
    },
    {
        "$_vin_0_dot": 70
    },
    {
        "$_vin_0_unitCode": 72
    },
    {
        "$_vin_0_delay": 74
    },
    {
        "$_vin_0_vCol_0": 76
    },
    {
        "$_vin_0_vCol_1": 78
    },
    {
        "$_vin_0_vCol_2": 80
    },
    {
        "$_vin_0_vCol_3": 82
    },
    {
        "$_vin_0_vCol_4": 84
    },
    {
        "$_vin_0_vCol_5": 86
    },
    {
        "$_vin_0_vCol_6": 88
    },
    {
        "$_vin_0_vCol_7": 90
    },
    {
        "$_vin_0_vCol_8": 92
    },
    {
        "$_vin_0_vCol_9": 94
    },
    {
        "$_vin_0_vCol_10": 96
    },
    {
        "$_vin_0_adCol_0": 98
    },
    {
        "$_vin_0_adCol_1": 100
    },
    {
        "$_vin_0_adCol_2": 102
    },
    {
        "$_vin_0_adCol_3": 104
    },
    {
        "$_vin_0_adCol_4": 106
    },
    {
        "$_vin_0_adCol_5": 108
    },
    {
        "$_vin_0_adCol_6": 110
    },
    {
        "$_vin_0_adCol_7": 112
    },
    {
        "$_vin_0_adCol_8": 114
    },
    {
        "$_vin_0_adCol_9": 116
    },
    {
        "$_vin_0_adCol_10": 118
    },
    {
        "$_vin_0_runtime_binary": 4202
    },
    {
        "$_vin_0_runtime_posi": 4204
    },
    {
        "$_vin_0_runtime_velo": 4206
    },
    {
        "$_vin_0_runtime_tare": 4208
    },
    {
        "$_vin_0_runtime_userPosi": 4210
    },
    {
        "$_vin_0_runtime_userPosiLimitMin": 4212
    },
    {
        "$_vin_0_runtime_userPosiLimitMax": 4214
    },
    {
        "$_vin_1_class": "AdChnl"
    },
    {
        "$_vin_1_tag": 120
    },
    {
        "$_vin_1_minScale": 128
    },
    {
        "$_vin_1_maxScale": 130
    },
    {
        "$_vin_1_dot": 132
    },
    {
        "$_vin_1_unitCode": 134
    },
    {
        "$_vin_1_delay": 136
    },
    {
        "$_vin_1_vCol_0": 138
    },
    {
        "$_vin_1_vCol_1": 140
    },
    {
        "$_vin_1_vCol_2": 142
    },
    {
        "$_vin_1_vCol_3": 144
    },
    {
        "$_vin_1_vCol_4": 146
    },
    {
        "$_vin_1_vCol_5": 148
    },
    {
        "$_vin_1_vCol_6": 150
    },
    {
        "$_vin_1_vCol_7": 152
    },
    {
        "$_vin_1_vCol_8": 154
    },
    {
        "$_vin_1_vCol_9": 156
    },
    {
        "$_vin_1_vCol_10": 158
    },
    {
        "$_vin_1_adCol_0": 160
    },
    {
        "$_vin_1_adCol_1": 162
    },
    {
        "$_vin_1_adCol_2": 164
    },
    {
        "$_vin_1_adCol_3": 166
    },
    {
        "$_vin_1_adCol_4": 168
    },
    {
        "$_vin_1_adCol_5": 170
    },
    {
        "$_vin_1_adCol_6": 172
    },
    {
        "$_vin_1_adCol_7": 174
    },
    {
        "$_vin_1_adCol_8": 176
    },
    {
        "$_vin_1_adCol_9": 178
    },
    {
        "$_vin_1_adCol_10": 180
    },
    {
        "$_vin_1_runtime_binary": 4216
    },
    {
        "$_vin_1_runtime_posi": 4218
    },
    {
        "$_vin_1_runtime_velo": 4220
    },
    {
        "$_vin_1_runtime_tare": 4222
    },
    {
        "$_vin_1_runtime_userPosi": 4224
    },
    {
        "$_vin_1_runtime_userPosiLimitMin": 4226
    },
    {
        "$_vin_1_runtime_userPosiLimitMax": 4228
    },
    {
        "$_din_0_class": "Din"
    },
    {
        "$_din_0_tag": 182
    },
    {
        "$_din_0_runtime_state": 4230
    },
    {
        "$_din_1_class": "Digital"
    },
    {
        "$_din_1_tag": 190
    },
    {
        "$_din_1_bitShift": 198
    },
    {
        "$_din_1_runtime_state": 4232
    },
    {
        "$_din_2_class": "Digital"
    },
    {
        "$_din_2_tag": 200
    },
    {
        "$_din_2_bitShift": 208
    },
    {
        "$_din_2_runtime_state": 4234
    },
    {
        "$_dout_0_class": "Switch"
    },
    {
        "$_dout_0_tag": 210
    },
    {
        "$_dout_0_bitShift": 218
    },
    {
        "$_dout_0_safeLevel": 220
    },
    {
        "$_dout_0_validLevel": 221
    },
    {
        "$_dout_0_runtime_state": 4236
    },
    {
        "$_dout_1_class": "Switch"
    },
    {
        "$_dout_1_tag": 222
    },
    {
        "$_dout_1_bitShift": 230
    },
    {
        "$_dout_1_safeLevel": 232
    },
    {
        "$_dout_1_validLevel": 233
    },
    {
        "$_dout_1_runtime_state": 4238
    },
    {
        "$_vout_0_class": "ServoCylinder"
    },
    {
        "$_vout_0_tag": 234
    },
    {
        "$_vout_0_motiWays_0": 242
    },
    {
        "$_vout_0_motiWays_1": 244
    },
    {
        "$_vout_0_motiWays_2": 246
    },
    {
        "$_vout_0_motiWays_3": 248
    },
    {
        "$_vout_0_motiWays_4": 250
    },
    {
        "$_vout_0_duMin": 252
    },
    {
        "$_vout_0_duMax": 254
    },
    {
        "$_vout_0_duExceedTime": 256
    },
    {
        "$_vout_0_duZero": 258
    },
    {
        "$_vout_0_vibFreq": 260
    },
    {
        "$_vout_0_vibAmp": 262
    },
    {
        "$_vout_0_moveP": 264
    },
    {
        "$_vout_0_runtime_outFeed": 4240
    },
    {
        "$_vout_0_runtime_stateWay": 4242
    },
    {
        "$_vout_0_runtime_du": 4244
    },
    {
        "$_vout_0_runtime_duExceedProtected": 4246
    },
    {
        "$_vout_0_runtime_simuPosi": 4248
    },
    {
        "$_vout_1_class": "DaFeed"
    },
    {
        "$_vout_1_tag": 266
    },
    {
        "$_vout_1_duZero": 274
    },
    {
        "$_vout_1_gain": 276
    },
    {
        "$_vout_1_runtime_outFeed": 4250
    },
    {
        "$_vout_1_runtime_da": 4252
    },
    {
        "$_closedCtrl_0_class": "KidCtrl"
    },
    {
        "$_closedCtrl_0_feedChnl": 278
    },
    {
        "$_closedCtrl_0_plusDir": 280
    },
    {
        "$_closedCtrl_0_errorGate": 282
    },
    {
        "$_closedCtrl_0_errorExceedTime": 284
    },
    {
        "$_closedCtrl_0_kMode": 286
    },
    {
        "$_closedCtrl_0_rectifyTime": 288
    },
    {
        "$_closedCtrl_0_k": 290
    },
    {
        "$_closedCtrl_0_i": 292
    },
    {
        "$_closedCtrl_0_d": 294
    },
    {
        "$_closedCtrl_0_runtime_instGain": 4254
    },
    {
        "$_closedCtrl_0_runtime_instK": 4256
    },
    {
        "$_controller_0_class": "Controller"
    },
    {
        "$_controller_0_actuator": 296
    },
    {
        "$_controller_0_dispChnl": 298
    },
    {
        "$_controller_0_closedCtrl_0": 300
    },
    {
        "$_controller_0_closedCtrl_1": 302
    },
    {
        "$_controller_0_closedCtrl_2": 304
    },
    {
        "$_controller_0_closedCtrl_3": 306
    },
    {
        "$_controller_0_closedCtrl_4": 308
    },
    {
        "$_controller_0_closedCtrl_5": 310
    },
    {
        "$_controller_0_closedCtrl_6": 312
    },
    {
        "$_controller_0_runtime_ctrlMode": 4258
    },
    {
        "$_controller_0_runtime_refType": 4260
    },
    {
        "$_controller_0_runtime_ref": 4262
    },
    {
        "$_controller_0_runtime_refVelo": 4264
    },
    {
        "$_controller_0_runtime_feed": 4266
    },
    {
        "$_controller_0_runtime_feedVelo": 4268
    },
    {
        "$_controller_0_runtime_mfu": 4270
    },
    {
        "$_controller_0_runtime_cpu": 4272
    },
    {
        "$_controller_0_runtime_cvu": 4274
    },
    {
        "$_controller_0_runtime_u": 4276
    },
    {
        "$_controller_0_runtime_duration": 4278
    },
    {
        "$_controller_0_runtime_trackId": 4280
    },
    {
        "$_controller_0_runtime_inWave": 4282
    },
    {
        "$_controller_0_runtime_setWaveFreq": 4284
    },
    {
        "$_controller_0_runtime_setWaveMin": 4286
    },
    {
        "$_controller_0_runtime_setWaveMax": 4288
    },
    {
        "$_controller_0_runtime_waveMin": 4290
    },
    {
        "$_controller_0_runtime_waveMax": 4292
    },
    {
        "$_controller_0_runtime_setWaveNum": 4294
    },
    {
        "$_controller_0_runtime_waveCount": 4296
    },
    {
        "$_controller_0_runtime_setCycleNum": 4298
    },
    {
        "$_controller_0_runtime_cycleCount": 4300
    },
    {
        "$_controller_0_runtime_x1": 4302
    },
    {
        "$_controller_0_runtime_x2": 4304
    },
    {
        "$_pipe_class": "Pipe"
    },
    {
        "$_pipe_timeInPipe": 314
    },
    {
        "$_pipe_rfuInPipe": 315
    },
    {
        "$_pipe_acqRate": 316
    },
    {
        "$_pipe_uploadRate": 318
    },
    {
        "$_pipe_x1": 320
    },
    {
        "$_pipe_x2": 322
    },
    {
        "$_pipe_runtime_uploading": 4306
    },
    {
        "$_logEvent_0_class": "LogEvent"
    },
    {
        "$_logEvent_0_readFlag": 324
    },
    {
        "$_logEvent_0_time": 325
    },
    {
        "$_logEvent_0_eventCode": 327
    },
    {
        "$_logEvent_1_class": "LogEvent"
    },
    {
        "$_logEvent_1_readFlag": 329
    },
    {
        "$_logEvent_1_time": 330
    },
    {
        "$_logEvent_1_eventCode": 332
    },
    {
        "$_logEvent_2_class": "LogEvent"
    },
    {
        "$_logEvent_2_readFlag": 334
    },
    {
        "$_logEvent_2_time": 335
    },
    {
        "$_logEvent_2_eventCode": 337
    },
    {
        "$_logEvent_3_class": "LogEvent"
    },
    {
        "$_logEvent_3_readFlag": 339
    },
    {
        "$_logEvent_3_time": 340
    },
    {
        "$_logEvent_3_eventCode": 342
    },
    {
        "$_logEvent_4_class": "LogEvent"
    },
    {
        "$_logEvent_4_readFlag": 344
    },
    {
        "$_logEvent_4_time": 345
    },
    {
        "$_logEvent_4_eventCode": 347
    },
    {
        "$_logEvent_5_class": "LogEvent"
    },
    {
        "$_logEvent_5_readFlag": 349
    },
    {
        "$_logEvent_5_time": 350
    },
    {
        "$_logEvent_5_eventCode": 352
    },
    {
        "$_logEvent_6_class": "LogEvent"
    },
    {
        "$_logEvent_6_readFlag": 354
    },
    {
        "$_logEvent_6_time": 355
    },
    {
        "$_logEvent_6_eventCode": 357
    },
    {
        "$_logEvent_7_class": "LogEvent"
    },
    {
        "$_logEvent_7_readFlag": 359
    },
    {
        "$_logEvent_7_time": 360
    },
    {
        "$_logEvent_7_eventCode": 362
    }
]


const help=`
  生成id表
  input: F3_output
  output: [绝对jsonPath id表,实例基地址表,实例runtime基地址表]
`;

import DataTypeUtils from "./DataTypeUtils.js"



class F {
    static resArr=[]
    static isClassBase=0;
    static isRunTimeBase=0;
    static ins_base_arr=[];
    static ins_runtime_base_arr=[];
    static g_id=0;
    static g_runtimeId=0x1000;
    static run(parent,nodeJObject){
        for (let k in nodeJObject){
           let parentTmp=`${parent}_${k}`;
            if(k=="class"){
                let o={};
                o[parentTmp]=nodeJObject[k].split(".").at(-1);
                F.resArr.push(o);
                F.isClassBase=1;
                continue;
            }
            if(k=="runtime"){
                F.isRunTimeBase=1;
                for (let runtimeK in nodeJObject["runtime"]){
                    let runtimeJsonPath=parentTmp+"_"+runtimeK;
                    switch (DataTypeUtils.getDataType(nodeJObject["runtime"][runtimeK])){
                        case "boolean" :F.appendRunTimeId(runtimeJsonPath,1); break;
                        default:F.appendRunTimeId(runtimeJsonPath,2); break;
                    }
                }
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
                    for (let i1=0;i1<vTokenVal.length;i1++){
                        F.appendId(parentTmp+"_"+i1,2);
                    }
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
        if(F.isClassBase==1){
            let o={};
            let baseKeyList=jsonPath.split("_");
            baseKeyList[0]="PMD"
            baseKeyList[1]=baseKeyList[1].toUpperCase();
            if(/^[0-9]+$/.test( baseKeyList[2])){
                baseKeyList[3]="BASE";
                baseKeyList=baseKeyList.slice(0,4)
            }else {
                baseKeyList[2]="BASE";
                baseKeyList=baseKeyList.slice(0,3)
            }
            let baseKey=baseKeyList.join("_");
            o[baseKey]=F.g_id;
            F.ins_base_arr.push(o);
        }
        F.g_id=F.g_id+addId;
        F.isClassBase=0;
    }

    static appendRunTimeId(jsonPath,addId){
        if(jsonPath!=null){
            let o={};
            o[jsonPath]=F.g_runtimeId
            F.resArr.push(o);
        }

        if(F.isRunTimeBase==1){
            //console.log(jsonPath)
            let o={};
            let baseKeyList=jsonPath.split("_");
            baseKeyList[0]="PMD"
            baseKeyList[baseKeyList.length-1]="BASE";
            let baseKey=baseKeyList.join("_").toUpperCase();
            o[baseKey]=F.g_runtimeId;
            F.ins_runtime_base_arr.push(o);
        }
        F.g_runtimeId=F.g_runtimeId+addId;
        F.isRunTimeBase=0;
    }

    static init(){
        F.resArr=[]
        F.isClassBase=0;
        F.isRunTimeBase=0;
        F.ins_base_arr=[];
        F.ins_runtime_base_arr=[];
        F.g_id=0;
        F.g_runtimeId=0x1000;
    }

}



async function main(param){
    input=param;
    F.init();
    await F.run("$",input);
    //console.log(F.resArr)
    return [F.resArr,F.ins_base_arr,F.ins_runtime_base_arr];
}

export default {
    F,
    input,
    output,
    help,
    main
}