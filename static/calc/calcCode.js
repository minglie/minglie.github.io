export default {
    "数字转换":`console.log(Int32.from(4292407296));`,
    "速度转DF":`
//分辨率 μm/pulse
const res_u=0.01;
//速度 mm/s
const speed=1;
const out_df=256*(speed/1000)/(res_u/1000000)
console.log(out_df)
`,
    "1000N力 计算AD":`
     //[0,8388607]  =>  [0,1000]
     const ad=123456;
     const k=(1000-0)/(8388607-0);
     const 力=k*ad;
     console.log(力);
`
}