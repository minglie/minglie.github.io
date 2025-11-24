let input={
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
};

let output=[
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
            1
        ],
        "controllerTagList": [
            1
        ],
        "logEventTagList": [
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8
        ]
    }
]

const help=`
   获取格式化后的实例
   input: F0_output[1]
   output:[格式化后的实例,每个对象数组对应的tag列表]
`;

import DataTypeUtils from "./DataTypeUtils.js"

class F {
    static inputV={};
    static vinTagList=[];
    static dinTagList=[];
    static doutTagList=[];
    static voutTagList=[];
    static closedCtrlTagList=[];
    static controllerTagList=[];
    static logEventTagList=[];



    static run(inputV){
        let nodeJObject=inputV;
        for (let k in nodeJObject){
            let vTokenType=DataTypeUtils.getDataType(nodeJObject[k]);
            let vTokenVal=nodeJObject[k];
            switch (vTokenType){
                case "string":{
                    break;
                }
                case "array":{
                    let jArray=vTokenVal;
                    let tempOutObj={};
                    for (let i=0;i<jArray.length;i++){
                        let aitem=jArray[i];
                        if(DataTypeUtils.getDataType(aitem)=="string"){
                            let val=aitem.toString();
                            if(val.indexOf("$")==-1){
                                continue;
                            }
                            //匿名
                            if (val.indexOf("$")==0)
                            {
                                tempOutObj[i]=jArray[i];
                                if(k=="vin"){
                                    F.vinTagList.push(i+1);
                                }
                                if(k=="din"){
                                    F.dinTagList.push(i+1);
                                }
                                if(k=="dout"){
                                    F.doutTagList.push(i+1);
                                }
                                if(k=="vout"){
                                    F.voutTagList.push(i+1);
                                }
                                if(k=="closedCtrl"){
                                    F.closedCtrlTagList.push(i+1);
                                }
                                if(k=="controller"){
                                    F.controllerTagList.push(i+1);
                                }
                                if(k=="logEvent"){
                                    F.logEventTagList.push(i+1);
                                }
                            }
                            //有名
                            if (val.indexOf("$")>0)
                            {
                                let keyNameArr=val.split("$")
                                tempOutObj[i]="$"+keyNameArr[1];
                                let tag=keyNameArr[0];
                                if(k=="vin"){
                                    F.vinTagList.push(tag);
                                }
                                if(k=="din"){
                                    F.dinTagList.push(tag);
                                }
                                if(k=="dout"){
                                    F.doutTagList.push(tag);
                                }
                                if(k=="vout"){
                                    F.voutTagList.push(tag);
                                }
                                if(k=="closedCtrl"){
                                    F.closedCtrlTagList.push(tag);
                                }
                                if(k=="controller"){
                                    F.controllerTagList.push(tag);
                                }
                                if(k=="logEvent"){
                                    F.logEventTagList.push(tag);
                                }
                            }
                        }
                    }
                    if(Object.keys(tempOutObj).length>0){
                        nodeJObject[k]=tempOutObj;
                    }
                    break;
                }


            }
        }
        F.inputV=nodeJObject;
        return F.inputV;
    }


    static init(){
        F.inputV={};
        F.vinTagList=[];
        F.dinTagList=[];
        F.doutTagList=[];
        F.voutTagList=[];
        F.closedCtrlTagList=[];
        F.controllerTagList=[];
        F.logEventTagList=[];
    }

}



async function main(param){
    input=param;
    F.init();
    let r=await F.run(input);
    let r1={
        vinTagList: F.vinTagList,
        dinTagList: F.dinTagList,
        doutTagList: F.doutTagList,
        voutTagList: F.voutTagList,
        closedCtrlTagList: F.closedCtrlTagList,
        controllerTagList:  F.controllerTagList,
        logEventTagList: F.logEventTagList,
    }
    return [r,r1];
}

export default {
    input,
    output,
    help,
    main
}