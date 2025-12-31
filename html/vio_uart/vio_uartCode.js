export default {
    "简单测试":`  
const res=await VioUart.Rpc(1,1);
console.log(res.ToHexString());
await VioUart.Write(1,1234567);
await M.sleepMs(1);
const readVal= await VioUart.Read(1);
console.log(readVal);
`,
    "简单测试1":`
const res_u=0.01;
console.log(res_u)
`,
    "简单测试2":`
     const ad=123456;
     console.log(ad);
`
}