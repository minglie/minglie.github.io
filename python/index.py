# encoding: utf-8
# 导入socket模块
import socket
# 导入正则表达式模块
import re
# 导入多进程模块
from multiprocessing import Process
import sys

# 设置静态文件根目录
HTML_ROOT_DIR = "./static"

# 定义个一个HTTPServer的类
class HTTPServer(object):
    # 初始化方法
    def __init__(self):
        # 创建一个服务器socket套接字
        self.server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        # socket地址重用配置
        self.server_socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    # HTTPServer开启的方法
    def start(self):
        # 设置监听字节长度为128
        self.server_socket.listen(128)
        # 不间断的监听是否有人链接服务器
        while True:
            # 解析请求链接服务器的客户端信息
            client_socket, client_address = self.server_socket.accept()
            print("[%s:%s]用户连接上了" % client_address)
            # 创建多进程handle_client处理客户端的请求
            handle_client_process = Process(target=self.handle_client, args=(client_socket,))
            # 开启多进程
            handle_client_process.start()
            # 关闭客户端socket套接字
            client_socket.close()

    # 多进程handle_client
    def handle_client(self, client_socket):
        # 获取客户端数据
        request_data = client_socket.recv(1024)
        print("request data:", request_data)
        # 多请求数据用空格做分割处理
        request_headers_lines = request_data.splitlines()
        for line in request_headers_lines:
            print(line)
        # 解析请求报文
        request_start_line = request_headers_lines[0]
        # 利用正则表达式提取用户请求的文件名
        file_name = re.match(r"\w+ +(/[^ ]*) ", request_start_line.decode("utf-8")).group(1)
        print(file_name)
        if "/" == file_name:
            file_name = "/index.html"
        # 打开文件 ，读取内容
        try:
            file = open(HTML_ROOT_DIR + file_name, "rb")
        except IOError:
            # 设置打开文件失败时返回的响应起始行\r\n是换行
            response_start_line = "HTTP/1.1 404 Not Found\r\n"
            # 设置打开文件失败时返回的响应头
            response_headers = "Server:My server\r\n"
            # 设置打开文件失败时返回的响应体
            response_body = "The File is not found"
        else:
            # 打开成功时读取的客户端要请求的文件数据
            file_data = file.read()
            # 关闭文件
            file.close()

            # 构造响应数据
            response_start_line = "HTTP/1.1 200 OK\r\n"
            # 构造响应头
            response_headers = "Server:My server\r\n"
            # 构造响应体
            response_body = file_data.decode("utf-8")

        response = response_start_line + response_headers + "\r\n" + response_body
        print("response data:", response)

        # 向客户端返回响应数据
        if sys.version_info[0]<3:
            client_socket.send(response)
        else:
            client_socket.send(bytes(response, "utf-8"))
        # 关闭客户端连接
        client_socket.close()

    # 绑定端口
    def bind(self, port):
        self.server_socket.bind(("", port))


def main():
    # 创建HTTPServer对象
    http_server = HTTPServer()
    # 绑定端口
    http_server.bind(8888)
    print("listen on port:", 8888)
    # 开启服务
    http_server.start()
  


if __name__ == "__main__":
    main()