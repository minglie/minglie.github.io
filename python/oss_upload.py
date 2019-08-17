# -*- coding: utf-8 -*-
from __future__ import print_function
import os, sys
import oss2

# 阿里云主账号AccessKey拥有所有API的访问权限，风险很高。强烈建议您创建并使用RAM账号进行API访问或日常运维，请登录 https://ram.console.aliyun.com 创建RAM账号。
auth = oss2.Auth('yourAccessKeyId ', 'yourAccessKeySecret ')
# Endpoint以杭州为例，其它Region请按实际情况填写。
bucket = oss2.Bucket(auth, 'http://oss-cn-shanghai.aliyuncs.com', 'aos-study-mb')

inputFileName=""
for file in os.listdir("./"):
    if os.path.splitext(file)[1] == '.grib':
        inputFileName=file



objectName='weather/wpf/'+inputFileName[0:4]+"/"+inputFileName
logPath='M.log'
def log(str):
    with open(logPath,'a') as file_object:
        file_object.write(str+"\n")
    return


oldRate=0;

def percentage(consumed_bytes, total_bytes):
    global oldRate
    if total_bytes:
        rate = int(100 * (float(consumed_bytes) / float(total_bytes)))
        print('\r已经上传{0}M,进度-->{1}% '.format(float(consumed_bytes)/(1024*1024),rate), end='')
        if(rate-oldRate>1 or rate==100) :
            log('已经上传{0}M,进度-->{1}% '.format(float(consumed_bytes)/(1024*1024),rate))
            oldRate=rate
        sys.stdout.flush()
# progress_callback为可选参数，用于实现进度条功能

log("开始上传:"+inputFileName)
print("开始上传:"+inputFileName)

# 必须以二进制的方式打开文件，因为需要知道文件包含的字节数。
with open(inputFileName, 'rb') as fileobj:
    # Seek方法用于指定从第1000个字节位置开始读写。上传时会从您指定的第1000个字节位置开始上传，直到文件结束。
    fileobj.seek(0, os.SEEK_SET)
    # Tell方法用于返回当前位置。
    current = fileobj.tell()
    bucket.put_object(objectName, fileobj, progress_callback=percentage)

exist = bucket.object_exists(objectName)
if 	exist:
    print('已经成功上传')
    log('已经成功上传')
else:
    print('上传失败')
    log('上传失败')


