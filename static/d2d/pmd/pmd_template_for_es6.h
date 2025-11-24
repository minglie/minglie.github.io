#ifndef __PMD_H__
#define __PMD_H__

//每类对象数组原素的个数
#define PMD_VIN_SIZE   ${P.PMD_VIN_SIZE}
#define PMD_DIN_SIZE   ${P.PMD_DIN_SIZE}
#define PMD_DOUT_SIZE  ${P.PMD_DOUT_SIZE}
#define PMD_VOUT_SIZE  ${P.PMD_VOUT_SIZE}
#define PMD_CLOSEDCTRL_SIZE  ${P.PMD_CLOSEDCTRL_SIZE}
#define PMD_CONTROLLER_SIZE  ${P.PMD_CONTROLLER_SIZE}
#define PMD_LOGEVENT_SIZE    ${P.PMD_LOGEVENT_SIZE}
//对象数组每个元素的基地址
${P.PMD_VIN_SIZE==0?"//":""}const unsigned int PMD_VIN_BASE[PMD_VIN_SIZE] = { ${P.con_pwd_vin_base} };
${P.PMD_DIN_SIZE==0?"//":""}const unsigned int PMD_DIN_BASE[PMD_DIN_SIZE] = { ${P.con_pwd_din_base} };
${P.PMD_DOUT_SIZE==0?"//":""}const unsigned int PMD_DOUT_BASE[PMD_DOUT_SIZE] = { ${P.con_pwd_dout_base} };
${P.PMD_VOUT_SIZE==0?"//":""}const unsigned int PMD_VOUT_BASE[PMD_VOUT_SIZE] = { ${P.con_pwd_vout_base} };
${P.PMD_CLOSEDCTRL_SIZE==0?"//":""}const unsigned int PMD_CLOSEDCTRL_BASE[PMD_CLOSEDCTRL_SIZE] = { ${P.con_pwd_closedctrl_base} };
${P.PMD_CONTROLLER_SIZE==0?"//":""}const unsigned int PMD_CONTROLLER_BASE[PMD_CONTROLLER_SIZE] = { ${P.con_pwd_controller_base} };
${P.PMD_VIN_SIZE==0?"//":""}const unsigned int PMD_VIN_RUNTIME_BASE[PMD_VIN_SIZE] = { ${P.con_pwd_vin_runtime_base} };
${P.PMD_DIN_SIZE==0?"//":""}const unsigned int PMD_DIN_RUNTIME_BASE[PMD_DIN_SIZE] = { ${P.con_pwd_din_runtime_base} };
${P.PMD_DOUT_SIZE==0?"//":""}const unsigned int PMD_DOUT_RUNTIME_BASE[PMD_DOUT_SIZE] = { ${P.con_pwd_dout_runtime_base}};
${P.PMD_VOUT_SIZE==0?"//":""}const unsigned int PMD_VOUT_RUNTIME_BASE[PMD_VOUT_SIZE] = { ${P.con_pwd_vout_runtime_base} };
${P.PMD_CLOSEDCTRL_SIZE==0?"//":""}const unsigned int PMD_CLOSEDCTRL_RUNTIME_BASE[PMD_CLOSEDCTRL_SIZE] = { ${P.con_pwd_closedctrl_runtime_base} };
${P.PMD_CONTROLLER_SIZE==0?"//":""}const unsigned int PMD_CONTROLLER_RUNTIME_BASE[PMD_CONTROLLER_SIZE] = { ${P.con_pwd_controller_runtime_base} };


//实例的基地址
${P.base_str}
//相对jsonPath
${P.relative_jsonPathStr}
//绝对jsonPath
${P.absolute_jsonPathStr}


//定义两种方式访问id
#define _PMD_GET_ID(base,jsonPath) base+jsonPath
#define   ID1(baseAddr,offset)   _PMD_GET_ID(baseAddr,baseAddr##_##offset)
#define   ID2(baseAddr,offset)  baseAddr+offset




#endif