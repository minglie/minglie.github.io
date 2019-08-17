from flask import Flask,request
app=Flask(__name__)

@app.route("/a",methods=["get"])
def index():
    return "你的用户名是"+request.args.get("username")


@app.route("/b",methods=["post"])
def index1():
    print(request.form)
    print(request.form.get("name"))
    return "hello"

if __name__ == '__main__':
    app.run(port=8888)