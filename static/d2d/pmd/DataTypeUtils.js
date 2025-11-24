const DataTypeUtils={};


DataTypeUtils.getDataType=(v)=>{
    if(Array.isArray(v)){
        return "array";
    }

    return typeof (v);
}

export default DataTypeUtils;