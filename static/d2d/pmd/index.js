const M= require("ming_node")
const PmdUtilTransLateV1= require("./PmdUtilTransLateV1.js")
const {A,B}=PmdUtilTransLateV1;

let F0=M.getObjByFile("./F0.json")
async function main(){
     F1= A(F0.definition)
     F2= B(F0.configuration)
     console.log(F1)

}


main();