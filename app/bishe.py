#coding=gbk
import time
import json
import os
import pymysql
from sqlalchemy import Column, String, create_engine
from  sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from wtforms import Form,TextField,PasswordField,validators,SubmitField
from flask import Flask,session,redirect,url_for,request,render_template,make_response,abort,flash,jsonify
db = pymysql.connect("localhost","root","123456","hey" )
cursor = db.cursor()
# sql='SELECT *FROM USERPIC'
# try:
#     cursor.execute(sql)
#     userpic=cursor.fetchall()
#     print(userpic)
# except:
#     print("fail")
# sql ="SELECT *FROM USER"
# try:
#     cursor.execute(sql)
#     userifo=cursor.fetchall()
#     print(str(userifo[0][0]))
# except:
#     print("select fail")
#
#
# sql = "SELECT * FROM NEWUSER "
# try:
#     # 执行SQL语句
#     cursor.execute(sql)
#     # 获取所有记录列表
#     results = cursor.fetchall()
#     print(results)
#     # for row in results:
#     #     userid = row[0]
#     #     name = row[1]
#     #     country = row[2]
#     #     sex = row[3]
#     #     email = row[4]
#     #     picid= row[5]
#     #     birth = row[6]
#     #     print(name)
#         #print ("userid=%s,name=%s,country=%s,sex=%d,email=%s,picid=%s,birth=%s"%\
#               #(userid, name, country, sex, email ,picid,birth))
#
# except:
#         print ("Error: unable to fetch data")
# cursor.execute(sql)
# # db.close()

#orm

app=Flask(__name__)
@app.route('/load_data',methods=['POST'])
# 分页和首次加载获取资源
def load_data():
    data = json.loads(request.get_data())
    a=data["page"]
    # print(type(a))
    a=a*12
    b=a+12
    try:
        sql='SELECT *FROM newuser LIMIT '+str(a)+','+str(12)+''

        cursor.execute(sql)
        userpic=cursor.fetchall()
        db.commit()
        print(userpic)
        return jsonify(userpic)
    except:
        a=data['page']*20
        return '0'
if __name__=="__main__":
    app.run(host='127.0.0.1',debug=True,port = 5000)

