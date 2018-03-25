import pymysql
class Config():   #父类可以被下边的类继承到AUTHOR参数
    AUTHOR='aolens'
    MYSQL_DB_CONFIG= {
        "host":"localhost",
        "port":3306,
        "user":"root",
        "password":"123456",
        "db":"hey",
        "use_unicode":True,#增加此条
        "charset":"utf-8"#增加此条
    }
    db = pymysql.connect("localhost","root","123456","hey",use_unicode=True, charset="utf8")
    cursor = db.cursor()