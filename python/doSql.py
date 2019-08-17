#!/usr/bin/python
import pymysql
import json
from flask import Flask,request,Response,jsonify
from flask_cors import CORS

# 连接数据库
db  = pymysql.Connect(
    host='localhost',
    port=3306,
    user='root',
    passwd='123456',
    db='test',
    charset='utf8'
)

def dbDoQuerySql(sql):
    cursor = db.cursor()
    cursor.execute(sql)
    result  = cursor.fetchall()
    SqlDomain = cursor.description
    DomainNum = len(SqlDomain)
    SqlDomainName = [None]*DomainNum
    for i in range(DomainNum):
        SqlDomainName[i] = SqlDomain[i][0]
    rresult = []
    for res  in result:
        row={}
        for i in range(len(SqlDomainName)):
            row[SqlDomainName[i]] = res[i]
        rresult.append(row)
    w=[]
    w.append(rresult)
    w.append(SqlDomainName)
    return w

def dbDoInsertUpdateDeleteSql(sql):
    r={};
    cursor = db.cursor()
    try:
        affectedRows=cursor.execute(sql)
        db.commit()
    except:
        db.rollback()
    r["affectedRows"]=affectedRows;
    return  r


def dbDoSql(sql):
    sql=sql.strip()
    if sql.startswith("insert") or sql.startswith("delete") or sql.startswith("update"):
        return  dbDoInsertUpdateDeleteSql(sql)
    else:
        return dbDoQuerySql(sql)


app=Flask(__name__)
CORS(app, supports_credentials=True)

@app.route("/a",methods=["get"])
def a():
    return "ok"



@app.route("/doSql",methods=["post"])
def index1():
    sql=request.form.get("sql");
    print(sql);
    r=dbDoSql(sql)
    res={}
    res["code"]=3002;
    res["message"]="操作成功";
    res["data"]=r
    return jsonify(res)
if __name__ == '__main__':
    app.run(port=8889)

