#ifndef __Pmd_H__
#define __Pmd_H__

//每类对象数组原素的个数
#define PMD_VIN_SIZE  2
#define PMD_DIN_SIZE  2
#define PMD_DOUT_SIZE  2
#define PMD_VOUT_SIZE  2
#define PMD_CLOSEDCTRL_SIZE  2
#define PMD_CONTROLLER_SIZE  1
#define PMD_LOGEVENT_SIZE  8
//对象数组每个元素的基地址
const unsigned int con_pwd_vin_base[PMD_VIN_SIZE] = { 5,6 };
const unsigned int con_pwd_din_base[PMD_DIN_SIZE] = { 5,6 };
const unsigned int con_pwd_dout_base[PMD_DOUT_SIZE] = { 5,6 };
const unsigned int con_pwd_vout_base[PMD_VOUT_SIZE] = { 5,6 };
const unsigned int con_pwd_closedctrl_base[PMD_CLOSEDCTRL_SIZE] = { 5 };
const unsigned int con_pwd_controller_base[PMD_CONTROLLER_SIZE] = { 5 };
const unsigned int con_pwd_vin_runtime_base[PMD_VIN_SIZE] = { 0x1000,0x1005 };
const unsigned int con_pwd_din_runtime_base[PMD_DIN_SIZE] = { 0x1000,0x1005 };
const unsigned int con_pwd_dout_runtime_base[PMD_DOUT_SIZE] = { 0x1000,0x1005 };
const unsigned int con_pwd_vout_runtime_base[PMD_VOUT_SIZE] = { 0x1000,0x1005 };
const unsigned int con_pwd_closedctrl_runtime_base[PMD_CLOSEDCTRL_SIZE] = { 0x1003,0x100a };
const unsigned int con_pwd_controller_runtime_base[PMD_CONTROLLER_SIZE] = { 0x102a };

//访问上面数组的宏
#define PMD_VIN_BASE(n)			   con_pwd_vin_base[n]
#define PMD_DIN_BASE(n)            con_pwd_din_base[n]
#define PMD_DOUT_BASE(n)           con_pwd_dout_base[n]
#define PMD_VOUT_BASE(n)           con_pwd_vout_base[n]
#define PMD_CLOSEDCTRL_BASE(n)     con_pwd_closedctrl_base[n]
#define PMD_CONTROLLER_BASE(n)     con_pwd_controller_base[n]
#define PMD_VIN_RUNTIME_BASE(n)    con_pwd_vin_runtime_base[n]
#define PMD_DIN_RUNTIME_BASE(n)    con_pwd_din_runtime_base[n]
#define PMD_DOUT_RUNTIME_BASE(n)   con_pwd_dout_runtime_base[n]
#define PMD_VOUT_RUNTIME_BASE(n)           con_pwd_vout_runtime_base[n]
#define PMD_CLOSEDCTRL_RUNTIME_BASE(n)     con_pwd_closedctrl_runtime_base[n]
#define PMD_CONTROLLER_RUNTIME_BASE(n)     con_pwd_controller_runtime_base[n]


//方式1访问model
#define PMD_PRODUCT_BASE  0
#define PMD_PRODUCT_BASE_model  0
#define PMD_PRODUCT_BASE_rev  2
#define PMD_PRODUCT_BASE_osver  2
#define PMD_PRODUCT_BASE_sn  2
#define PMD_PRODUCT_BASE_client  2
#define PMD_PRODUCT_BASE_manufacturer  2
#define PMD_PRODUCT_BASE_device  2




#define PMD_VIN_0_BASE  55
#define PMD_VIN_0_BASE_minScale 55
#define PMD_VIN0_REV   2



//方式2访问model,base可与方式1共用,但偏移不可以共用
#define $product_model  77
#define $vin_minScale  77

//方式3 完整的jsonPath
#define $_product_class  "Product"
#define $_product_model  77
#define $_drawer_params_0 44
#define $_vin_0_class    "AdChnl"
#define $_vin_1_class    "AdChnl"
#define $_vin_0_minScale  77



//定义两种方式访问id
#define _PMD_GET_ID(base,jsonPath) base+jsonPath
#define   ID1(baseAddr,offset)   _PMD_GET_ID(baseAddr,baseAddr##_##offset)
#define   ID2(baseAddr,offset)  baseAddr+offset




#endif