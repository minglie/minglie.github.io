const DataTypeUtils= require("./DataTypeUtils.js")

class PmdUtilTransLateV0 {
    static classBodyDefineMap={};
    static optionsKeys={};


    static getPmdClassBodyDefineMap(pmdJson){

        const definitionJobject=pmdJson.definition;
        for (let k in definitionJobject){
             let classBody = definitionJobject[k];
             let  className = k;
             let bodyClass=classBody["class"];
             let classArr=bodyClass.split(".");
             //继承的
             for (let i=0;i<classArr.length-1;i++){
                 let extendFields=PmdUtilTransLateV0.classBodyDefineMap[classArr[i]];
                 classBody={...extendFields,...classBody};
             }
            PmdUtilTransLateV0.classBodyDefineMap[className]= classBody;
            PmdUtilTransLateV0.classBodyDefineMap[bodyClass]=classBody;
        }
        for (let k in definitionJobject){
           let className =k;
            let classBody=  PmdUtilTransLateV0.classBodyDefineMap[className];
            let bodyClass=classBody["class"];
            PmdUtilTransLateV0.replaceDollarAndArray2Obj(className,bodyClass,classBody);
        }
        return PmdUtilTransLateV0.classBodyDefineMap;
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
                        nodeJObject[k]=PmdUtilTransLateV0.classBodyDefineMap[pureClassName];
                        PmdUtilTransLateV0.classBodyDefineMap[className]=nodeJObject;
                        PmdUtilTransLateV0.classBodyDefineMap[bodyClass]=nodeJObject;
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
                            if (val.startsWith("$"))
                            {
                                let pureClassName2 = val.replaceAll("$", "");
                                aitem = PmdUtilTransLateV0.classBodyDefineMap[pureClassName2];
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
                    PmdUtilTransLateV0.classBodyDefineMap[className]=nodeJObject;
                    PmdUtilTransLateV0.classBodyDefineMap[bodyClass]=nodeJObject;
                    break;
                }


            }
        }

    }


    static replaceDollarAndArray2ObjV2(nodeJObject){

        for (let k in nodeJObject) {
            let vTokenType=DataTypeUtils.getDataType(nodeJObject[k]);
            switch (vTokenType) {
                case "object":{
                    PmdUtilTransLateV0.replaceDollarAndArray2ObjV2(nodeJObject[k]);
                    break;
                }
                case "string":{
                    let val=nodeJObject[k];
                    if(val.startsWith("$")){
                        let pureClassName=val.replaceAll("$","");
                        nodeJObject[k]= PmdUtilTransLateV0.classBodyDefineMap[pureClassName]
                    }
                    break;
                }
                case "array":{
                    let jArray=nodeJObject[k];
                    for (let i=0;i<jArray.length;i++){
                        let aitem=jArray[i];
                        let aitemType=DataTypeUtils.getDataType(aitem);
                        if(aitemType=="string"){
                            let val=aitem;
                            if (val.startsWith("$"))
                            {
                                let pureClassName2 = val.replaceAll("$", "");
                                aitem =PmdUtilTransLateV0.classBodyDefineMap[pureClassName2];
                                jArray[i] = aitem;
                            }
                        }
                    }

                    let arr2Obj={};
                    if(DataTypeUtils.getDataType(jArray[0])=="object"){
                        for (let i = 0; i < jArray.length; i++)
                        {
                            let aitem = jArray[i];
                            arr2Obj["" + i]=aitem;
                        }
                        nodeJObject[k]=arr2Obj;
                    }
                    break;
                }
            }
        }

    }
    /**
     * 获取实例化后的pmd对象
     */
    static getEasyObjString(pmdJson){
        PmdUtilTransLateV0.classBodyDefineMap=PmdUtilTransLateV0.getPmdClassBodyDefineMap(pmdJson);
        let { configuration:configurationObj,
            runtime: runtimeObj,
            log:logObj} = pmdJson;

        PmdUtilTransLateV0.replaceDollarAndArray2ObjV2(configurationObj);
        PmdUtilTransLateV0.replaceDollarAndArray2ObjV2(runtimeObj);
        PmdUtilTransLateV0.replaceDollarAndArray2ObjV2(logObj);

        let newjObj={ configuration:configurationObj,
            runtime: runtimeObj,
            log:logObj
        };
        PmdUtilTransLateV0.replaceBaiFenhao2Obj(newjObj);
        return newjObj;
    }



    static baifenhaoIndex="0";
    static replaceBaiFenhao2Obj(nodeJObject){
        for (let k in nodeJObject) {
            //数字为键
            if( /^[0-9]+$/.test(k)){
                PmdUtilTransLateV0.baifenhaoIndex=k;
            }
            let vTokenType=DataTypeUtils.getDataType(nodeJObject[k]);

            switch (vTokenType){
                case "object":{
                    PmdUtilTransLateV0.replaceBaiFenhao2Obj(nodeJObject[k]);
                    break;
                }
                case "string":{
                    if(nodeJObject[k].includes("%")){
                        nodeJObject[k]=nodeJObject[k].replaceAll("%", PmdUtilTransLateV0.baifenhaoIndex);
                    }
                    break;
                }
            }
        }
    }
}


module.exports = PmdUtilTransLateV0;
