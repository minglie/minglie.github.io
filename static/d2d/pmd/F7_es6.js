let input={
    "class": "Pmd.D711",
    "remark": "4-20mA servocontroller for Zheda",
    "definition": {
        "Product": {
            "class": "Product",
            "model": 1711,
            "rev": 0,
            "osver": 0.60,
            "sn": 2001711,
            "client": 0,
            "manufacturer": "LANGJIE",
            "device": "my_d711"
        },
        "Drawer": {
            "class": "Drawer",
            "params": [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, -0 ]
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
                "posi": 0.0,
                "velo": 0.0,
                "tare": 0.0,
                "userPosi": 0.0,
                "userPosiLimitMin": -100,
                "userPosiLimitMax": 100
            }
        },
        "AdChnl": {
            "class": "Vin.AdChnl",
            "vCol": [ 0, 0.2, 0.5, 1, 2, 5, 10, 20, 50, 100, -0 ],
            "adCol": [ 0, 200, 500, 1000, 2000, 5000, 10000, 20000, 50000,100000, -0 ]
        },
        "AcChnl": {
            "class": "Vin.AcChnl",
            "encoder": 0,
            "res_u": 1.0,
            "zero": 0
        },
        "IcChnl": {
            "class": "Vin.IcChnl",
            "bits": 16,
            "res_u": 1.0
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
                "outFeed": 0.0
            }
        },
        "Actuator": {
            "class": "Vout.Actuator",
            "motiWays": [ 0, 1, -1, -2, -0 ],
            "duMin": -30000,
            "duMax": 30000,
            "duExceedTime": 3.0,
            "runtime": {
                "stateWay": 0,
                "du": 0,
                "duExceedProtected": false,
                "simuPosi": 0.0
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
            "gain": 1.0,
            "runtime": {
                "da": 0
            }
        },
        "ClosedCtrl": {
            "class": "ClosedCtrl",
            "feedChnl": 0,
            "plusDir": 1,
            "errorGate": 10.0,
            "errorExceedTime": 1.0
        },
        "KidCtrl": {
            "class": "ClosedCtrl.KidCtrl",
            "kMode": 1,
            "rectifyTime": 0.1,
            "k": 1.0,
            "i": 0.3,
            "d": 0,
            "runtime": {
                "instGain": 1.0,
                "instK": 1.0
            }
        },
        "Controller": {
            "class": "Controller",
            "actuator": 0,
            "dispChnl": 0,
            "closedCtrl": [ 0, 1, 2, 3, 4, 5, -0 ],
            "runtime": {
                "ctrlMode": 1,
                "refType": 0,
                "ref": 1.24,
                "refVelo": 0.0,
                "feed": 1.23,
                "feedVelo": 0.0,
                "mfu": 0,
                "cpu": 0,
                "cvu": 0,
                "u": 0,
                "duration": 0,
                "trackId": 0,
                "inWave": false,
                "setWaveFreq": 10.0,
                "setWaveMin": -1.0,
                "setWaveMax": 1.0,
                "waveMin": -1.0,
                "waveMax": 1.0,
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
        "drawer":  "$Drawer",
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
        "closedCtrl": [ "$KidCtrl" ],
        "controller": [ "$Controller" ],
        "pipe": "$Pipe",
        "logEvent": [ "$LogEvent", "$LogEvent", "$LogEvent", "$LogEvent", "$LogEvent", "$LogEvent", "$LogEvent", "$LogEvent" ]
    }
};

let output=`
#ifndef __PMD_H__
#define __PMD_H__

//每类对象数组原素的个数
#define PMD_VIN_SIZE   2
#define PMD_DIN_SIZE   3
#define PMD_DOUT_SIZE  2
#define PMD_VOUT_SIZE  2
#define PMD_CLOSEDCTRL_SIZE  1
#define PMD_CONTROLLER_SIZE  1
#define PMD_LOGEVENT_SIZE    8
//对象数组每个元素的基地址
const unsigned int PMD_VIN_BASE[PMD_VIN_SIZE] = { 58,120 };
const unsigned int PMD_DIN_BASE[PMD_DIN_SIZE] = { 182,190,200 };
const unsigned int PMD_DOUT_BASE[PMD_DOUT_SIZE] = { 210,222 };
const unsigned int PMD_VOUT_BASE[PMD_VOUT_SIZE] = { 234,266 };
const unsigned int PMD_CLOSEDCTRL_BASE[PMD_CLOSEDCTRL_SIZE] = { 278 };
const unsigned int PMD_CONTROLLER_BASE[PMD_CONTROLLER_SIZE] = { 296 };
const unsigned int PMD_VIN_RUNTIME_BASE[PMD_VIN_SIZE] = { 4096,4110 };
const unsigned int PMD_DIN_RUNTIME_BASE[PMD_DIN_SIZE] = { 4124,4125,4126 };
const unsigned int PMD_DOUT_RUNTIME_BASE[PMD_DOUT_SIZE] = { 4127,4128};
const unsigned int PMD_VOUT_RUNTIME_BASE[PMD_VOUT_SIZE] = { 4129,4138 };
const unsigned int PMD_CLOSEDCTRL_RUNTIME_BASE[PMD_CLOSEDCTRL_SIZE] = { 4142 };
const unsigned int PMD_CONTROLLER_RUNTIME_BASE[PMD_CONTROLLER_SIZE] = { 4146 };


//实例的基地址
#define PMD_PRODUCT_BASE 0 
#define PMD_PRODUCT_BASE_model 0 
#define PMD_PRODUCT_BASE_rev 2 
#define PMD_PRODUCT_BASE_osver 4 
#define PMD_PRODUCT_BASE_sn 6 
#define PMD_PRODUCT_BASE_client 8 
#define PMD_PRODUCT_BASE_manufacturer 10 
#define PMD_PRODUCT_BASE_device 18 
#define PMD_DRAWER_BASE 26 
#define PMD_DRAWER_BASE_params 0 
#define PMD_MODBUS_BASE 50 
#define PMD_MODBUS_BASE_address 0 
#define PMD_MODBUS_BASE_baudrate 2 
#define PMD_MODBUS_BASE_x1 4 
#define PMD_MODBUS_BASE_x2 6 
#define PMD_VIN_0_BASE 58 
#define PMD_VIN_0_BASE_tag 0 
#define PMD_VIN_0_BASE_minScale 8 
#define PMD_VIN_0_BASE_maxScale 10 
#define PMD_VIN_0_BASE_dot 12 
#define PMD_VIN_0_BASE_unitCode 14 
#define PMD_VIN_0_BASE_delay 16 
#define PMD_VIN_0_BASE_vCol 18 
#define PMD_VIN_0_BASE_adCol 40 
#define PMD_VIN_0_RUNTIME_BASE 4096 
#define PMD_VIN_0_RUNTIME_BASE_binary 0 
#define PMD_VIN_0_RUNTIME_BASE_posi 2 
#define PMD_VIN_0_RUNTIME_BASE_velo 4 
#define PMD_VIN_0_RUNTIME_BASE_tare 6 
#define PMD_VIN_0_RUNTIME_BASE_userPosi 8 
#define PMD_VIN_0_RUNTIME_BASE_userPosiLimitMin 10 
#define PMD_VIN_0_RUNTIME_BASE_userPosiLimitMax 12 
#define PMD_VIN_1_BASE 120 
#define PMD_VIN_1_BASE_tag 0 
#define PMD_VIN_1_BASE_minScale 8 
#define PMD_VIN_1_BASE_maxScale 10 
#define PMD_VIN_1_BASE_dot 12 
#define PMD_VIN_1_BASE_unitCode 14 
#define PMD_VIN_1_BASE_delay 16 
#define PMD_VIN_1_BASE_vCol 18 
#define PMD_VIN_1_BASE_adCol 40 
#define PMD_VIN_1_RUNTIME_BASE 4110 
#define PMD_VIN_1_RUNTIME_BASE_binary 0 
#define PMD_VIN_1_RUNTIME_BASE_posi 2 
#define PMD_VIN_1_RUNTIME_BASE_velo 4 
#define PMD_VIN_1_RUNTIME_BASE_tare 6 
#define PMD_VIN_1_RUNTIME_BASE_userPosi 8 
#define PMD_VIN_1_RUNTIME_BASE_userPosiLimitMin 10 
#define PMD_VIN_1_RUNTIME_BASE_userPosiLimitMax 12 
#define PMD_DIN_0_BASE 182 
#define PMD_DIN_0_BASE_tag 0 
#define PMD_DIN_0_RUNTIME_BASE 4124 
#define PMD_DIN_0_RUNTIME_BASE_state 0 
#define PMD_DIN_1_BASE 190 
#define PMD_DIN_1_BASE_tag 0 
#define PMD_DIN_1_BASE_bitShift 8 
#define PMD_DIN_1_RUNTIME_BASE 4125 
#define PMD_DIN_1_RUNTIME_BASE_state 0 
#define PMD_DIN_2_BASE 200 
#define PMD_DIN_2_BASE_tag 0 
#define PMD_DIN_2_BASE_bitShift 8 
#define PMD_DIN_2_RUNTIME_BASE 4126 
#define PMD_DIN_2_RUNTIME_BASE_state 0 
#define PMD_DOUT_0_BASE 210 
#define PMD_DOUT_0_BASE_tag 0 
#define PMD_DOUT_0_BASE_bitShift 8 
#define PMD_DOUT_0_BASE_safeLevel 10 
#define PMD_DOUT_0_BASE_validLevel 11 
#define PMD_DOUT_0_RUNTIME_BASE 4127 
#define PMD_DOUT_0_RUNTIME_BASE_state 0 
#define PMD_DOUT_1_BASE 222 
#define PMD_DOUT_1_BASE_tag 0 
#define PMD_DOUT_1_BASE_bitShift 8 
#define PMD_DOUT_1_BASE_safeLevel 10 
#define PMD_DOUT_1_BASE_validLevel 11 
#define PMD_DOUT_1_RUNTIME_BASE 4128 
#define PMD_DOUT_1_RUNTIME_BASE_state 0 
#define PMD_VOUT_0_BASE 234 
#define PMD_VOUT_0_BASE_tag 0 
#define PMD_VOUT_0_BASE_motiWays 8 
#define PMD_VOUT_0_BASE_duMin 18 
#define PMD_VOUT_0_BASE_duMax 20 
#define PMD_VOUT_0_BASE_duExceedTime 22 
#define PMD_VOUT_0_BASE_duZero 24 
#define PMD_VOUT_0_BASE_vibFreq 26 
#define PMD_VOUT_0_BASE_vibAmp 28 
#define PMD_VOUT_0_BASE_moveP 30 
#define PMD_VOUT_0_RUNTIME_BASE 4129 
#define PMD_VOUT_0_RUNTIME_BASE_outFeed 0 
#define PMD_VOUT_0_RUNTIME_BASE_stateWay 2 
#define PMD_VOUT_0_RUNTIME_BASE_du 4 
#define PMD_VOUT_0_RUNTIME_BASE_duExceedProtected 6 
#define PMD_VOUT_0_RUNTIME_BASE_simuPosi 7 
#define PMD_VOUT_1_BASE 266 
#define PMD_VOUT_1_BASE_tag 0 
#define PMD_VOUT_1_BASE_duZero 8 
#define PMD_VOUT_1_BASE_gain 10 
#define PMD_VOUT_1_RUNTIME_BASE 4138 
#define PMD_VOUT_1_RUNTIME_BASE_outFeed 0 
#define PMD_VOUT_1_RUNTIME_BASE_da 2 
#define PMD_CLOSEDCTRL_0_BASE 278 
#define PMD_CLOSEDCTRL_0_BASE_feedChnl 0 
#define PMD_CLOSEDCTRL_0_BASE_plusDir 2 
#define PMD_CLOSEDCTRL_0_BASE_errorGate 4 
#define PMD_CLOSEDCTRL_0_BASE_errorExceedTime 6 
#define PMD_CLOSEDCTRL_0_BASE_kMode 8 
#define PMD_CLOSEDCTRL_0_BASE_rectifyTime 10 
#define PMD_CLOSEDCTRL_0_BASE_k 12 
#define PMD_CLOSEDCTRL_0_BASE_i 14 
#define PMD_CLOSEDCTRL_0_BASE_d 16 
#define PMD_CLOSEDCTRL_0_RUNTIME_BASE 4142 
#define PMD_CLOSEDCTRL_0_RUNTIME_BASE_instGain 0 
#define PMD_CLOSEDCTRL_0_RUNTIME_BASE_instK 2 
#define PMD_CONTROLLER_0_BASE 296 
#define PMD_CONTROLLER_0_BASE_actuator 0 
#define PMD_CONTROLLER_0_BASE_dispChnl 2 
#define PMD_CONTROLLER_0_BASE_closedCtrl 4 
#define PMD_CONTROLLER_0_RUNTIME_BASE 4146 
#define PMD_CONTROLLER_0_RUNTIME_BASE_ctrlMode 0 
#define PMD_CONTROLLER_0_RUNTIME_BASE_refType 2 
#define PMD_CONTROLLER_0_RUNTIME_BASE_ref 4 
#define PMD_CONTROLLER_0_RUNTIME_BASE_refVelo 6 
#define PMD_CONTROLLER_0_RUNTIME_BASE_feed 8 
#define PMD_CONTROLLER_0_RUNTIME_BASE_feedVelo 10 
#define PMD_CONTROLLER_0_RUNTIME_BASE_mfu 12 
#define PMD_CONTROLLER_0_RUNTIME_BASE_cpu 14 
#define PMD_CONTROLLER_0_RUNTIME_BASE_cvu 16 
#define PMD_CONTROLLER_0_RUNTIME_BASE_u 18 
#define PMD_CONTROLLER_0_RUNTIME_BASE_duration 20 
#define PMD_CONTROLLER_0_RUNTIME_BASE_trackId 22 
#define PMD_CONTROLLER_0_RUNTIME_BASE_inWave 24 
#define PMD_CONTROLLER_0_RUNTIME_BASE_setWaveFreq 25 
#define PMD_CONTROLLER_0_RUNTIME_BASE_setWaveMin 27 
#define PMD_CONTROLLER_0_RUNTIME_BASE_setWaveMax 29 
#define PMD_CONTROLLER_0_RUNTIME_BASE_waveMin 31 
#define PMD_CONTROLLER_0_RUNTIME_BASE_waveMax 33 
#define PMD_CONTROLLER_0_RUNTIME_BASE_setWaveNum 35 
#define PMD_CONTROLLER_0_RUNTIME_BASE_waveCount 37 
#define PMD_CONTROLLER_0_RUNTIME_BASE_setCycleNum 39 
#define PMD_CONTROLLER_0_RUNTIME_BASE_cycleCount 41 
#define PMD_CONTROLLER_0_RUNTIME_BASE_x1 43 
#define PMD_CONTROLLER_0_RUNTIME_BASE_x2 45 
#define PMD_PIPE_BASE 314 
#define PMD_PIPE_BASE_timeInPipe 0 
#define PMD_PIPE_BASE_rfuInPipe 1 
#define PMD_PIPE_BASE_acqRate 2 
#define PMD_PIPE_BASE_uploadRate 4 
#define PMD_PIPE_BASE_x1 6 
#define PMD_PIPE_BASE_x2 8 
#define PMD_PIPE_RUNTIME_BASE 4193 
#define PMD_PIPE_RUNTIME_BASE_uploading 0 
#define PMD_LOGEVENT_0_BASE 324 
#define PMD_LOGEVENT_0_BASE_readFlag 0 
#define PMD_LOGEVENT_0_BASE_time 1 
#define PMD_LOGEVENT_0_BASE_eventCode 3 
#define PMD_LOGEVENT_1_BASE 329 
#define PMD_LOGEVENT_1_BASE_readFlag 0 
#define PMD_LOGEVENT_1_BASE_time 1 
#define PMD_LOGEVENT_1_BASE_eventCode 3 
#define PMD_LOGEVENT_2_BASE 334 
#define PMD_LOGEVENT_2_BASE_readFlag 0 
#define PMD_LOGEVENT_2_BASE_time 1 
#define PMD_LOGEVENT_2_BASE_eventCode 3 
#define PMD_LOGEVENT_3_BASE 339 
#define PMD_LOGEVENT_3_BASE_readFlag 0 
#define PMD_LOGEVENT_3_BASE_time 1 
#define PMD_LOGEVENT_3_BASE_eventCode 3 
#define PMD_LOGEVENT_4_BASE 344 
#define PMD_LOGEVENT_4_BASE_readFlag 0 
#define PMD_LOGEVENT_4_BASE_time 1 
#define PMD_LOGEVENT_4_BASE_eventCode 3 
#define PMD_LOGEVENT_5_BASE 349 
#define PMD_LOGEVENT_5_BASE_readFlag 0 
#define PMD_LOGEVENT_5_BASE_time 1 
#define PMD_LOGEVENT_5_BASE_eventCode 3 
#define PMD_LOGEVENT_6_BASE 354 
#define PMD_LOGEVENT_6_BASE_readFlag 0 
#define PMD_LOGEVENT_6_BASE_time 1 
#define PMD_LOGEVENT_6_BASE_eventCode 3 
#define PMD_LOGEVENT_7_BASE 359 
#define PMD_LOGEVENT_7_BASE_readFlag 0 
#define PMD_LOGEVENT_7_BASE_time 1 
#define PMD_LOGEVENT_7_BASE_eventCode 3 

//相对jsonPath
#define $Product_class "Product" 
#define $Product_model 0 
#define $Product_rev 2 
#define $Product_osver 4 
#define $Product_sn 6 
#define $Product_client 8 
#define $Product_manufacturer 10 
#define $Product_device 18 
#define $Drawer_class "Drawer" 
#define $Drawer_params 0 
#define $Modbus_class "Modbus" 
#define $Modbus_address 0 
#define $Modbus_baudrate 2 
#define $Modbus_x1 4 
#define $Modbus_x2 6 
#define $Vin_class "Vin" 
#define $Vin_tag 0 
#define $Vin_minScale 8 
#define $Vin_maxScale 10 
#define $Vin_dot 12 
#define $Vin_unitCode 14 
#define $Vin_delay 16 
#define $Vin_runtime_binary 0 
#define $Vin_runtime_posi 2 
#define $Vin_runtime_velo 4 
#define $Vin_runtime_tare 6 
#define $Vin_runtime_userPosi 8 
#define $Vin_runtime_userPosiLimitMin 10 
#define $Vin_runtime_userPosiLimitMax 12 
#define $AdChnl_class "Vin.AdChnl" 
#define $AdChnl_tag 0 
#define $AdChnl_minScale 8 
#define $AdChnl_maxScale 10 
#define $AdChnl_dot 12 
#define $AdChnl_unitCode 14 
#define $AdChnl_delay 16 
#define $AdChnl_vCol 18 
#define $AdChnl_adCol 40 
#define $AdChnl_runtime_binary 0 
#define $AdChnl_runtime_posi 2 
#define $AdChnl_runtime_velo 4 
#define $AdChnl_runtime_tare 6 
#define $AdChnl_runtime_userPosi 8 
#define $AdChnl_runtime_userPosiLimitMin 10 
#define $AdChnl_runtime_userPosiLimitMax 12 
#define $AcChnl_class "Vin.AcChnl" 
#define $AcChnl_tag 0 
#define $AcChnl_minScale 8 
#define $AcChnl_maxScale 10 
#define $AcChnl_dot 12 
#define $AcChnl_unitCode 14 
#define $AcChnl_delay 16 
#define $AcChnl_encoder 18 
#define $AcChnl_res_u 20 
#define $AcChnl_zero 22 
#define $AcChnl_runtime_binary 0 
#define $AcChnl_runtime_posi 2 
#define $AcChnl_runtime_velo 4 
#define $AcChnl_runtime_tare 6 
#define $AcChnl_runtime_userPosi 8 
#define $AcChnl_runtime_userPosiLimitMin 10 
#define $AcChnl_runtime_userPosiLimitMax 12 
#define $IcChnl_class "Vin.IcChnl" 
#define $IcChnl_tag 0 
#define $IcChnl_minScale 8 
#define $IcChnl_maxScale 10 
#define $IcChnl_dot 12 
#define $IcChnl_unitCode 14 
#define $IcChnl_delay 16 
#define $IcChnl_bits 18 
#define $IcChnl_res_u 20 
#define $IcChnl_runtime_binary 0 
#define $IcChnl_runtime_posi 2 
#define $IcChnl_runtime_velo 4 
#define $IcChnl_runtime_tare 6 
#define $IcChnl_runtime_userPosi 8 
#define $IcChnl_runtime_userPosiLimitMin 10 
#define $IcChnl_runtime_userPosiLimitMax 12 
#define $FeedIcChnl_class "Vin.FeedIcChnl" 
#define $FeedIcChnl_tag 0 
#define $FeedIcChnl_minScale 8 
#define $FeedIcChnl_maxScale 10 
#define $FeedIcChnl_dot 12 
#define $FeedIcChnl_unitCode 14 
#define $FeedIcChnl_delay 16 
#define $FeedIcChnl_res_u 18 
#define $FeedIcChnl_runtime_binary 0 
#define $FeedIcChnl_runtime_posi 2 
#define $FeedIcChnl_runtime_velo 4 
#define $FeedIcChnl_runtime_tare 6 
#define $FeedIcChnl_runtime_userPosi 8 
#define $FeedIcChnl_runtime_userPosiLimitMin 10 
#define $FeedIcChnl_runtime_userPosiLimitMax 12 
#define $Din_class "Din" 
#define $Din_tag 0 
#define $Din_runtime_state 0 
#define $Digital_class "Din.Digital" 
#define $Digital_tag 0 
#define $Digital_bitShift 8 
#define $Digital_runtime_state 0 
#define $Dout_class "Dout" 
#define $Dout_tag 0 
#define $Dout_runtime_state 0 
#define $Switch_class "Dout.Switch" 
#define $Switch_tag 0 
#define $Switch_bitShift 8 
#define $Switch_safeLevel 10 
#define $Switch_validLevel 11 
#define $Switch_runtime_state 0 
#define $Vout_class "Vout" 
#define $Vout_tag 0 
#define $Vout_runtime_outFeed 0 
#define $Actuator_class "Vout.Actuator" 
#define $Actuator_tag 0 
#define $Actuator_motiWays 8 
#define $Actuator_duMin 18 
#define $Actuator_duMax 20 
#define $Actuator_duExceedTime 22 
#define $Actuator_runtime_outFeed 0 
#define $Actuator_runtime_stateWay 2 
#define $Actuator_runtime_du 4 
#define $Actuator_runtime_duExceedProtected 6 
#define $Actuator_runtime_simuPosi 7 
#define $ServoCylinder_class "Vout.Actuator.ServoCylinder" 
#define $ServoCylinder_tag 0 
#define $ServoCylinder_motiWays 8 
#define $ServoCylinder_duMin 18 
#define $ServoCylinder_duMax 20 
#define $ServoCylinder_duExceedTime 22 
#define $ServoCylinder_duZero 24 
#define $ServoCylinder_vibFreq 26 
#define $ServoCylinder_vibAmp 28 
#define $ServoCylinder_moveP 30 
#define $ServoCylinder_runtime_outFeed 0 
#define $ServoCylinder_runtime_stateWay 2 
#define $ServoCylinder_runtime_du 4 
#define $ServoCylinder_runtime_duExceedProtected 6 
#define $ServoCylinder_runtime_simuPosi 7 
#define $DaFeed_class "Vout.DaFeed" 
#define $DaFeed_tag 0 
#define $DaFeed_duZero 8 
#define $DaFeed_gain 10 
#define $DaFeed_runtime_outFeed 0 
#define $DaFeed_runtime_da 2 
#define $ClosedCtrl_class "ClosedCtrl" 
#define $ClosedCtrl_feedChnl 0 
#define $ClosedCtrl_plusDir 2 
#define $ClosedCtrl_errorGate 4 
#define $ClosedCtrl_errorExceedTime 6 
#define $KidCtrl_class "ClosedCtrl.KidCtrl" 
#define $KidCtrl_feedChnl 0 
#define $KidCtrl_plusDir 2 
#define $KidCtrl_errorGate 4 
#define $KidCtrl_errorExceedTime 6 
#define $KidCtrl_kMode 8 
#define $KidCtrl_rectifyTime 10 
#define $KidCtrl_k 12 
#define $KidCtrl_i 14 
#define $KidCtrl_d 16 
#define $KidCtrl_runtime_instGain 0 
#define $KidCtrl_runtime_instK 2 
#define $Controller_class "Controller" 
#define $Controller_actuator 0 
#define $Controller_dispChnl 2 
#define $Controller_closedCtrl 4 
#define $Controller_runtime_ctrlMode 0 
#define $Controller_runtime_refType 2 
#define $Controller_runtime_ref 4 
#define $Controller_runtime_refVelo 6 
#define $Controller_runtime_feed 8 
#define $Controller_runtime_feedVelo 10 
#define $Controller_runtime_mfu 12 
#define $Controller_runtime_cpu 14 
#define $Controller_runtime_cvu 16 
#define $Controller_runtime_u 18 
#define $Controller_runtime_duration 20 
#define $Controller_runtime_trackId 22 
#define $Controller_runtime_inWave 24 
#define $Controller_runtime_setWaveFreq 25 
#define $Controller_runtime_setWaveMin 27 
#define $Controller_runtime_setWaveMax 29 
#define $Controller_runtime_waveMin 31 
#define $Controller_runtime_waveMax 33 
#define $Controller_runtime_setWaveNum 35 
#define $Controller_runtime_waveCount 37 
#define $Controller_runtime_setCycleNum 39 
#define $Controller_runtime_cycleCount 41 
#define $Controller_runtime_x1 43 
#define $Controller_runtime_x2 45 
#define $Pipe_class "Pipe" 
#define $Pipe_timeInPipe 0 
#define $Pipe_rfuInPipe 1 
#define $Pipe_acqRate 2 
#define $Pipe_uploadRate 4 
#define $Pipe_x1 6 
#define $Pipe_x2 8 
#define $Pipe_runtime_uploading 0 
#define $LogEvent_class "LogEvent" 
#define $LogEvent_readFlag 0 
#define $LogEvent_time 1 
#define $LogEvent_eventCode 3 

//绝对jsonPath
#define $_product_class "Product" 
#define $_product_model 0 
#define $_product_rev 2 
#define $_product_osver 4 
#define $_product_sn 6 
#define $_product_client 8 
#define $_product_manufacturer 10 
#define $_product_device 18 
#define $_drawer_class "Drawer" 
#define $_drawer_params_0 26 
#define $_drawer_params_1 28 
#define $_drawer_params_2 30 
#define $_drawer_params_3 32 
#define $_drawer_params_4 34 
#define $_drawer_params_5 36 
#define $_drawer_params_6 38 
#define $_drawer_params_7 40 
#define $_drawer_params_8 42 
#define $_drawer_params_9 44 
#define $_drawer_params_10 46 
#define $_drawer_params_11 48 
#define $_modbus_class "Modbus" 
#define $_modbus_address 50 
#define $_modbus_baudrate 52 
#define $_modbus_x1 54 
#define $_modbus_x2 56 
#define $_vin_0_class "AdChnl" 
#define $_vin_0_tag 58 
#define $_vin_0_minScale 66 
#define $_vin_0_maxScale 68 
#define $_vin_0_dot 70 
#define $_vin_0_unitCode 72 
#define $_vin_0_delay 74 
#define $_vin_0_vCol_0 76 
#define $_vin_0_vCol_1 78 
#define $_vin_0_vCol_2 80 
#define $_vin_0_vCol_3 82 
#define $_vin_0_vCol_4 84 
#define $_vin_0_vCol_5 86 
#define $_vin_0_vCol_6 88 
#define $_vin_0_vCol_7 90 
#define $_vin_0_vCol_8 92 
#define $_vin_0_vCol_9 94 
#define $_vin_0_vCol_10 96 
#define $_vin_0_adCol_0 98 
#define $_vin_0_adCol_1 100 
#define $_vin_0_adCol_2 102 
#define $_vin_0_adCol_3 104 
#define $_vin_0_adCol_4 106 
#define $_vin_0_adCol_5 108 
#define $_vin_0_adCol_6 110 
#define $_vin_0_adCol_7 112 
#define $_vin_0_adCol_8 114 
#define $_vin_0_adCol_9 116 
#define $_vin_0_adCol_10 118 
#define $_vin_0_runtime_binary 4096 
#define $_vin_0_runtime_posi 4098 
#define $_vin_0_runtime_velo 4100 
#define $_vin_0_runtime_tare 4102 
#define $_vin_0_runtime_userPosi 4104 
#define $_vin_0_runtime_userPosiLimitMin 4106 
#define $_vin_0_runtime_userPosiLimitMax 4108 
#define $_vin_1_class "AdChnl" 
#define $_vin_1_tag 120 
#define $_vin_1_minScale 128 
#define $_vin_1_maxScale 130 
#define $_vin_1_dot 132 
#define $_vin_1_unitCode 134 
#define $_vin_1_delay 136 
#define $_vin_1_vCol_0 138 
#define $_vin_1_vCol_1 140 
#define $_vin_1_vCol_2 142 
#define $_vin_1_vCol_3 144 
#define $_vin_1_vCol_4 146 
#define $_vin_1_vCol_5 148 
#define $_vin_1_vCol_6 150 
#define $_vin_1_vCol_7 152 
#define $_vin_1_vCol_8 154 
#define $_vin_1_vCol_9 156 
#define $_vin_1_vCol_10 158 
#define $_vin_1_adCol_0 160 
#define $_vin_1_adCol_1 162 
#define $_vin_1_adCol_2 164 
#define $_vin_1_adCol_3 166 
#define $_vin_1_adCol_4 168 
#define $_vin_1_adCol_5 170 
#define $_vin_1_adCol_6 172 
#define $_vin_1_adCol_7 174 
#define $_vin_1_adCol_8 176 
#define $_vin_1_adCol_9 178 
#define $_vin_1_adCol_10 180 
#define $_vin_1_runtime_binary 4110 
#define $_vin_1_runtime_posi 4112 
#define $_vin_1_runtime_velo 4114 
#define $_vin_1_runtime_tare 4116 
#define $_vin_1_runtime_userPosi 4118 
#define $_vin_1_runtime_userPosiLimitMin 4120 
#define $_vin_1_runtime_userPosiLimitMax 4122 
#define $_din_0_class "Din" 
#define $_din_0_tag 182 
#define $_din_0_runtime_state 4124 
#define $_din_1_class "Digital" 
#define $_din_1_tag 190 
#define $_din_1_bitShift 198 
#define $_din_1_runtime_state 4125 
#define $_din_2_class "Digital" 
#define $_din_2_tag 200 
#define $_din_2_bitShift 208 
#define $_din_2_runtime_state 4126 
#define $_dout_0_class "Switch" 
#define $_dout_0_tag 210 
#define $_dout_0_bitShift 218 
#define $_dout_0_safeLevel 220 
#define $_dout_0_validLevel 221 
#define $_dout_0_runtime_state 4127 
#define $_dout_1_class "Switch" 
#define $_dout_1_tag 222 
#define $_dout_1_bitShift 230 
#define $_dout_1_safeLevel 232 
#define $_dout_1_validLevel 233 
#define $_dout_1_runtime_state 4128 
#define $_vout_0_class "ServoCylinder" 
#define $_vout_0_tag 234 
#define $_vout_0_motiWays_0 242 
#define $_vout_0_motiWays_1 244 
#define $_vout_0_motiWays_2 246 
#define $_vout_0_motiWays_3 248 
#define $_vout_0_motiWays_4 250 
#define $_vout_0_duMin 252 
#define $_vout_0_duMax 254 
#define $_vout_0_duExceedTime 256 
#define $_vout_0_duZero 258 
#define $_vout_0_vibFreq 260 
#define $_vout_0_vibAmp 262 
#define $_vout_0_moveP 264 
#define $_vout_0_runtime_outFeed 4129 
#define $_vout_0_runtime_stateWay 4131 
#define $_vout_0_runtime_du 4133 
#define $_vout_0_runtime_duExceedProtected 4135 
#define $_vout_0_runtime_simuPosi 4136 
#define $_vout_1_class "DaFeed" 
#define $_vout_1_tag 266 
#define $_vout_1_duZero 274 
#define $_vout_1_gain 276 
#define $_vout_1_runtime_outFeed 4138 
#define $_vout_1_runtime_da 4140 
#define $_closedCtrl_0_class "KidCtrl" 
#define $_closedCtrl_0_feedChnl 278 
#define $_closedCtrl_0_plusDir 280 
#define $_closedCtrl_0_errorGate 282 
#define $_closedCtrl_0_errorExceedTime 284 
#define $_closedCtrl_0_kMode 286 
#define $_closedCtrl_0_rectifyTime 288 
#define $_closedCtrl_0_k 290 
#define $_closedCtrl_0_i 292 
#define $_closedCtrl_0_d 294 
#define $_closedCtrl_0_runtime_instGain 4142 
#define $_closedCtrl_0_runtime_instK 4144 
#define $_controller_0_class "Controller" 
#define $_controller_0_actuator 296 
#define $_controller_0_dispChnl 298 
#define $_controller_0_closedCtrl_0 300 
#define $_controller_0_closedCtrl_1 302 
#define $_controller_0_closedCtrl_2 304 
#define $_controller_0_closedCtrl_3 306 
#define $_controller_0_closedCtrl_4 308 
#define $_controller_0_closedCtrl_5 310 
#define $_controller_0_closedCtrl_6 312 
#define $_controller_0_runtime_ctrlMode 4146 
#define $_controller_0_runtime_refType 4148 
#define $_controller_0_runtime_ref 4150 
#define $_controller_0_runtime_refVelo 4152 
#define $_controller_0_runtime_feed 4154 
#define $_controller_0_runtime_feedVelo 4156 
#define $_controller_0_runtime_mfu 4158 
#define $_controller_0_runtime_cpu 4160 
#define $_controller_0_runtime_cvu 4162 
#define $_controller_0_runtime_u 4164 
#define $_controller_0_runtime_duration 4166 
#define $_controller_0_runtime_trackId 4168 
#define $_controller_0_runtime_inWave 4170 
#define $_controller_0_runtime_setWaveFreq 4171 
#define $_controller_0_runtime_setWaveMin 4173 
#define $_controller_0_runtime_setWaveMax 4175 
#define $_controller_0_runtime_waveMin 4177 
#define $_controller_0_runtime_waveMax 4179 
#define $_controller_0_runtime_setWaveNum 4181 
#define $_controller_0_runtime_waveCount 4183 
#define $_controller_0_runtime_setCycleNum 4185 
#define $_controller_0_runtime_cycleCount 4187 
#define $_controller_0_runtime_x1 4189 
#define $_controller_0_runtime_x2 4191 
#define $_pipe_class "Pipe" 
#define $_pipe_timeInPipe 314 
#define $_pipe_rfuInPipe 315 
#define $_pipe_acqRate 316 
#define $_pipe_uploadRate 318 
#define $_pipe_x1 320 
#define $_pipe_x2 322 
#define $_pipe_runtime_uploading 4193 
#define $_logEvent_0_class "LogEvent" 
#define $_logEvent_0_readFlag 324 
#define $_logEvent_0_time 325 
#define $_logEvent_0_eventCode 327 
#define $_logEvent_1_class "LogEvent" 
#define $_logEvent_1_readFlag 329 
#define $_logEvent_1_time 330 
#define $_logEvent_1_eventCode 332 
#define $_logEvent_2_class "LogEvent" 
#define $_logEvent_2_readFlag 334 
#define $_logEvent_2_time 335 
#define $_logEvent_2_eventCode 337 
#define $_logEvent_3_class "LogEvent" 
#define $_logEvent_3_readFlag 339 
#define $_logEvent_3_time 340 
#define $_logEvent_3_eventCode 342 
#define $_logEvent_4_class "LogEvent" 
#define $_logEvent_4_readFlag 344 
#define $_logEvent_4_time 345 
#define $_logEvent_4_eventCode 347 
#define $_logEvent_5_class "LogEvent" 
#define $_logEvent_5_readFlag 349 
#define $_logEvent_5_time 350 
#define $_logEvent_5_eventCode 352 
#define $_logEvent_6_class "LogEvent" 
#define $_logEvent_6_readFlag 354 
#define $_logEvent_6_time 355 
#define $_logEvent_6_eventCode 357 
#define $_logEvent_7_class "LogEvent" 
#define $_logEvent_7_readFlag 359 
#define $_logEvent_7_time 360 
#define $_logEvent_7_eventCode 362 



//定义两种方式访问id
#define _PMD_GET_ID(base,jsonPath) base+jsonPath
#define   ID1(baseAddr,offset)   _PMD_GET_ID(baseAddr,baseAddr##_##offset)
#define   ID2(baseAddr,offset)  baseAddr+offset




#endif
`

const help=`
    以<a target="_blank" href="pmd_template.h">pmd_template.h为模板</a>,以F6_output为参数,生成最终的h文件,例子: <a href="https://gitee.com/-/ide/project/langjie_2/easyxlcdsimulation/edit/dev4byte/-/vs/dm8176/testc/pmdtest.cpp">pmdtest.cpp</a>

   input:原始json
   output:最终头文件
`;
import F5 from "./F5.js"
import F6 from "./F6.js"
const M=window.M;

class F {

}


async function main(param){
    input=param;
    let pmd_template= await M.request.getText("pmd_template_for_es6.h")
    let F5_ouput=await F5.main(input);
    let P=await F6.main(F5_ouput);
    return eval("`" +pmd_template+"`");
}

export default {
    input,
    output,
    help,
    main,
    rightLanguage:"c"
}