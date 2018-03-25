#coding=utf-8
import smtplib
import time
import json
import os
import pymysql
from flask_restful import *
from wtforms import Form,TextField,PasswordField,validators,SubmitField
from flask import Flask,session,redirect,url_for,request,render_template,make_response,abort,flash,jsonify,escape
from flask_uploads import *
import random
import base64

import SendEmail






#数据库连接
db = pymysql.connect("localhost","root","123456","hey",use_unicode=True, charset="utf8")
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
api=Api(app)

app.config['UPLOADED_PHOTOS_DEST'] = os.getcwd() + "/upload/img"
photos = UploadSet('photos', IMAGES)

configure_uploads(app, photos)

patch_request_class(app)


#主页
@app.route('/' ,methods = ['GET', 'POST'])
def index():
    print(request.headers.get('User-Agent'))
    sql='SELECT *FROM newuser LIMIT 0,10'

    cursor.execute(sql)
    userpic=cursor.fetchall()
    ip=request.remote_addr
    print(userpic)



    return render_template("index.html",test=userpic)
#上传
@app.route("/action",methods=["POST"])
def action():
    try:
        if request.method == 'POST' and 'photo' in request.files:
            print(request.files)
            filename = photos.save(request.files['photo'])
            print(request.files)

            file_url = photos.url(filename)
            print("filename = %s, file_url = %s" % (filename, file_url))
            a=list[0]
            a['img']="http://127.0.0.1:5000/_uploads/photos/"+filename

            print(a)
            sql="INSERT INTO newuser (NAME, EMAIL, PICID, BIRTHDAY,CONTENT,likenumber,country,sex) VALUES ('"+a["name"]+"','"+a["email"]+"','"+a["img"]+"','"+a["birthday"]+"','"+a["content"]+"','"+str(a["like_Num"])+"','"+a["country"]+"','"+a["sex"]+"')"
            print(sql)
            cursor.execute(sql)

            db.commit()
            list.clear()


            return "suc"

    except:
        return "fail"
    # sql='SELECT *FROM newuser'
    # cursor.execute(sql)
    # userpic=cursor.fetchall()
    # db.commit()
    # print(userpic)
    #
    # return render_template('index.html',data=jsonify(userpic))
    #分页
@app.route('/page',methods=['GET'])
def page():
    a=request.args.get("start")
    print(type(a))
    try:

        if(int(a)>=0 and a.isdigit()==True):

            b=int(a)*10
            print(type(a))
            sql='SELECT *FROM newuser LIMIT '+str(b)+',10'


            cursor.execute(sql)
            userpic=cursor.fetchall()
            if userpic==():

                ip=request.remote_addr
                print(userpic)

                return redirect('/')
            else:
                return render_template("index.html",test=userpic)
        else:
            return "nothing"
    except:
        return redirect("/")

#注册
@app.route('/regisn',methods=['GET','POST'])

def regisn():
    try:
        if request.method == 'GET':
            name=request.cookies.get("Job")
            print(name)

            return render_template("regisn.html")
        try:
            if request.method == 'POST':
                account=request.form['account']
                password=request.form['password']
                name=request.form['name']
                date=request.form['date']
                area=request.form['area']
                Email=request.form['Email']
                sex=request.form['sex']
                sql="insert into user(account,password,email,area,username,sex,birthday) values('"+account+"','"+password+"','"+Email+"','"+area+"','"+name+"','"+sex+"','"+date+"')"

                print(sql)
                a=cursor.execute(sql)
                print(a)
                if a==1:
                    db.commit()
                    print(a)
                    b=(name,account,password)
                    print(b)
                    return render_template("login.html",Hello=b)
        except:
            return render_template("login.html")
    except:
            return "fail"
# 登录
@app.route('/login',methods=['GET','POST'])
def login():
    if request.method == 'GET':
        return render_template("login.html")

    elif request.method == 'POST':
        print(request.form['account'])
        print(request.form['password'])
        a=request.form['account'].encode('utf-8')
        print(a)

        token =str(base64.b64encode(a),'utf-8')
        print(token)
        if request.form['account'] == "admin" and request.form['password']=="123456":

            session['username'] = request.form['account']
            session['password'] = request.form['password']
            session['ID']='admin'

            # sql='SELECT *FROM newuser LIMIT 40,10'
            # cursor.execute(sql)
            # userpic=cursor.fetchall()
            # ip=request.remote_addr
            # print(userpic)

            return render_template("admin.html")

        else:
            cursor.execute("select password from user where account='"+request.form['account']+"' ")
            a=cursor.fetchone()[0]
            print(a)
            if request.form['password']==a:
                session['username'] = request.form['account']
                session['password'] = request.form['password']
                session['ID']="cus"
                print(escape(session['ID']),escape(session['username']),escape(session['password']))
                return render_template("PM.html")
            else:
                return "bad login1"




    return 'Bad login2'
#获取个人信息
@app.route("/getPM",methods=['GET'])
def getPM():
    print(escape(session['ID']),escape(session['username']),escape(session['password']))

    a=str()
    sql="select * from newuser where email=(select email from user where account='"+str(escape(session['username']))+"'and password='"+str(escape(session['password']))+"')"
    print(sql)
    cursor.execute(sql)
    a=cursor.fetchall()
    print(a)


    return jsonify(a)

#测试接口
@app.route('/sendjson',methods=['POST'])
def sendjson2():

    data = json.loads(request.get_data())

    name = data["name"]
    birth = data["birth"]
    location = data["location"]
    sex=data["sex"]
    email=data["email"]
    data["time"] =str(time.asctime( time.localtime(time.time()) ))
    # Output: {u'age': 23, u'name': u'Peng Shuang', u'location': u'China'}
    print(type(data["name"]))


    sql="INSERT INTO USERPIC VALUES ('"+data["name"]+"', '"+data["birth"]+"', '"+data["email"]+"')"
    try:
        cursor.execute(sql)
        sql='SELECT *FROM USERPIC'
        cursor.execute(sql)
        userpic=cursor.fetchall()
        db.commit()
    except:
        print("fail")
    return jsonify(userpic)

    # try:
    #     with connection.cursor() as cursor:
    #         # 执行sql语句，插入记录
    #         sql = 'INSERT INTO newuser (FIRST_NAME, COUNTRY, SEX, EMAIL, BIRTHDAY) VALUES (%s, %s, %s, %s, %s)'
    #         cursor.execute(sql, (data["name"], data["location"],data["sex"] , data["email"], date["birth"]));
    #     # 没有设置默认自动提交，需要主动提交，以保存所执行的语句
    #         connection.commit()
    #
    # finally:
    #     connection.close();
#旧上传
@app.route('/get_new',methods=['post'])
def get_new():
    data=json.loads(request.get_data())

    name=data["name"]
    birthday=data["birthday"]
    location=data["location"]
    sex=data["sex"]
    pic=data["pic_adress"]
    email=data["email"]
    try:
        sql="INSERT INTO newuser (NAME, COUNTRY, SEX, EMAIL, BIRTHDAY,PICID) VALUES ('"+data["name"]+"','"+data["location"]+"','"+data["sex"]+"','"+data["email"]+"','"+data["birthday"]+"','"+data["pic_adress"]+"')"
        print(sql)
        cursor.execute(sql)
        db.commit()
        return "1"
    except:
        return "0"

# 分页和首次加载获取资源
@app.route('/load_data',methods=['POST'])
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
        # print(userpic)
        return jsonify(userpic)
    except:
        a=data['page']*20
        return '0'
#点赞
@app.route('/like_number',methods=['POST'])
def like_number():
    data = json.loads(request.get_data())

    ip=request.remote_addr
    print(data)
    sql='update newuser set likenumber=likenumber'+str(data["b"])+'1 where id="'+data["id"]+'"'

    # print(sql,data["id"])
    cursor.execute(sql)
    print(sql)
    db.commit()
    return "1"
#点赞前十
@app.route('/top10',methods=['POST'])
def GetTop10():
    sql='select id, name,country,picid,sex,birthday,content,likenumber  from newuser  order by  likenumber  desc limit 0,3'
    cursor.execute(sql)
    userpic=cursor.fetchall()

    db.commit()
    # print(userpic)
    return jsonify(userpic)
#搜索(渲染)
@app.route('/category',methods=['GET'])
def RTS():

    a= request.args.get("birthday")
    b= request.args.get("area")
    c= request.args.get("sex")
    sql = "SELECT * FROM newuser WHERE COUNTRY= '"+b+"'  AND SEX="+c+" AND BIRTHDAY='"+a+"'"
    cursor.execute(sql)
    print(sql)



    select_all=cursor.fetchall()
    db.commit()
    print(select_all)




    return render_template("category.html",select=select_all)

#搜索(分离接口)
@app.route('/select',methods=['POST','GET'])
def select():
        data =json.loads(request.get_data())
        print(data)
        sql = "SELECT * FROM newuser WHERE COUNTRY= '"+data['area']+"'  AND SEX="+data['sex']+" AND BIRTHDAY='"+data['birthday']+"'"
        cursor.execute(sql)
        print(sql)

        print(data)

        select_all=cursor.fetchall()
        db.commit()
        print(select_all)
        return jsonify(select_all)
#修改（接口）
@app.route("/updata",methods=['POST'])
def updata():
    data=json.loads(request.data)
    print((data["data"])['name'])
    print((data["data"])['birthday'])
    print((data["data"])['area'])
    print((data["data"])['artical'])
    print(escape(session['ID']),escape(session['username']),escape(session['password']))

    a=str()
    sql="update  newuser set name='"+(data["data"])['name']+"',country='"+(data["data"])['area']+"',birthday='"+(data["data"])['birthday']+"',content='"+(data["data"])['artical']+"' where email=(select email from user where account='"+str(escape(session['username']))+"'and password='"+str(escape(session['password']))+"')"
    print(sql)
    cursor.execute(sql)
    db.commit()
    a=cursor.fetchall()
    print(a)
    

    return "ture"
list=[]
list.clear()
#报废
@app.route('/get_data',methods = ['POST'])
def get_data():
    list.clear()

    data =json.loads(request.get_data())
    print(data)
    list.append(data)
    print(list)
    ip=request.remote_addr
    sql="insert into userifo(ip,email) values('"+ip+"','"+data['email']+"')"

    print(sql)
    cursor.execute(sql)

    print("1")
    userpic=cursor.fetchall()
    db.commit()
    print("2")
    return "1"



@app.route('/add/<add1>/<add2>')
def add(add1,add2):
    add1=int(add1)
    add2=int(add2)
    print(add1+add2)
    return str(add1+add2)

#个人详情
@app.route('/single_standarad',methods=['POST'])
def single_standarad():
    try:
        data = json.loads(request.get_data())
        # sql = 'SELECT * FROM NEWUSER WHERE ID='+data["id"]+''
        cursor.execute('SELECT * FROM NEWUSER WHERE ID='+data["id"]+'')
        select_all=cursor.fetchall()

        return jsonify(select_all)
    except:
        return render_template("index.html")
#删除
@app.route('/delete',methods=["POST"])
def delete():

    if 'username' in session and escape(session['ID'])=="admin" and escape(session['password'])=="123456":
        print(escape(session['ID']))
        data=json.loads(request.get_data())
        id=data["id"]
        print(data)
        sql="delete   from newuser where id="+str(id)+""
        print(sql)
        cursor.execute(sql)

        sql="delete   from comment where id="+str(id)+""
        print(sql)
        cursor.execute(sql)
        db.commit()



        return"1"
    else:
        return 'not admin'
    #评论
@app.route('/contact/<id>',methods=["GET"])
def contact(id):
    cursor.execute('SELECT * FROM NEWUSER WHERE ID='+str(id)+'')
    select_all=cursor.fetchall()
    cursor.execute('SELECT * FROM comment WHERE ToID='+str(id)+'')
    comment=cursor.fetchall()
    print(select_all)

    return render_template("single-standard.html",hello=select_all,comment=comment)
#发送评论
@app.route('/SendComment',methods=['POST'])
def comment():
    ToId=request.form['ToId']
    name=request.form['Name']
    Email=request.form['Email']
    message=request.form['Message']
    curtime = time.time()  # 获取当前时间戳
    a = time.ctime(curtime)  # 转为string格式

    print(name,Email,message,ToId,a)
    cursor.execute('insert into comment(toID,comment,time,name,email) values("'+ToId+'","'+message+'","'+str(a)+'","'+name+'","'+Email+'") ')
    db.commit()





    return "1"
#PM评论与回复
@app.route('/reply',methods=['GET','POST'])
def reply():
    if request.method == 'GET':
        try:
            print(escape(session['ID']),escape(session['username']),escape(session['password']))

            a=str()
            sql="select * from comment where toid=(select id from newuser where email=(select email from user where account='"+str(escape(session['username']))+"'and password='"+str(escape(session['password']))+"'))"
            print(sql)
            cursor.execute(sql)
            a=cursor.fetchall()
            print(a)
            return jsonify(a)
        except:
            return "fail"
    elif request.method=='POST':
        data=dict(json.loads(request.get_data()))
        sql= 'update comment set reply="'+str(data["data"]['reply'])+'" where id="'+str(data["data"]['id'])+'"'
        print(sql)
        cursor.execute(sql)
        db.commit()

        return "true"

@app.route('/set_cookie')
def set_cookie():
    response=make_response('<button>aaaaa</button>');
    response.set_cookie('Job','H222')
    return response

@app.route('/UserIfo')
def get_cookie():
    if 'username' in session:
        account=session['username']
        password=session['password']
        id=session['ID']
        sql=("select * from user where account='"+str(account)+"'and password='"+password+"'")
        print(sql)
        cursor.execute(sql)
        ifo=cursor.fetchone()
        print(ifo)



        return jsonify(ifo)
    else:
        return "false"
@app.route('/aaa')
def index1():
    if 'username' in session:
        print(session['username'])
        return 'Logged in as %s' % escape(session['username'])
    return 'You are not logged in'

@app.route('/login1', methods=['GET', 'POST'])
def login1():
    if request.method == 'POST':
        session['username']  = request.form["username"]+"&"+request.form['password']

        return redirect(url_for('index1'))
    return '''
        <form action="/login1" method="post">
            <p><input type=text name=username>
             <p><input type=text name=password>
            <p><input type=submit value=Login>
        </form>
    '''
@app.route('/checkname',methods=['POST'])
def checkname():
    data=json.loads(request.data)
    print((data["data"])['name'])
    print((data["data"])['birthday'])
    print((data["data"])['area'])
    print((data["data"])['artical'])
    print(type(data))
    sql='select * from user where  account="admin"'
    cursor.execute(sql)
    a=cursor.fetchall()

    return jsonify(a)
#seccion 清除
@app.route('/logout')
def logout1():
    # remove the username from the session if it's there
    session.clear()

    return redirect(url_for('index'))

# set the secret key.  keep this really secret:
app.secret_key = 'A0Zr98j/3yX R~XHH!jmN]LWX/,?RT'
@app.route('/send',methods=['POST','GET'])
def send():
    a="569273496@qq.com"
    a=SendEmail.sendemail.send(a)
    print(a)
    return a
@app.route('/UpData',methods=['POST'])
def UpData():
    data = json.loads(request.get_data())
    print(data['name'])
    sql="INSERT INTO newuser (NAME, EMAIL, PICID, BIRTHDAY,CONTENT,likenumber,country,sex) VALUES ('"+data["name"]+"','"+data["email"]+"','"+data["imgurl"]+"','"+data["birthday"]+"','"+data["artical"]+"','"+str(data["likenumber"])+"','"+data["area"]+"','"+data["sex"]+"')"
    print(sql)
    cursor.execute(sql)
    db.commit()
    return "i love you"


@app.route('/SaveImg',methods=['GET','POST'])

def test():

    if request.method == 'POST':
        data =request.headers
        print(data)
        filename = photos.save(request.files['file'])
        print(request.files)

        file_url = photos.url(filename)
        print("filename = %s, file_url = %s" % (filename, file_url))

        a="http://127.0.0.1:5000/_uploads/photos/"+filename

        print(a)

        return a
if __name__=="__main__":
    app.run(host='127.0.0.1',debug=True,port = 5000)

