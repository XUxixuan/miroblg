# coding=utf-8
import smtplib
from email.mime.text import MIMEText
import time
class sendemail(object):
    def send(self):
        msg_from = '569273496@qq.com'  # 发送方邮箱
        passwd = 'veuewqssjsuzbdac'  # 填入发送方邮箱的授权码
        msg_to = self  # 收件人邮箱

        subject = "python邮件测试"  # 主题
        content = "狗显 惊不惊喜 意不意外？？"     # 正文
        msg = MIMEText(content)
        msg['Subject'] = subject
        msg['From'] = msg_from
        msg['To'] = msg_to
        while 1:
            time.sleep(5)
            try:
                smtp = smtplib.SMTP_SSL("smtp.qq.com", 465)     # 邮件服务器及端口号
                smtp.login(msg_from, passwd)
                smtp.sendmail(msg_from, msg_to, msg.as_string())
                print ("发送成功")
                return 'success'
            except smtplib.Exception:
                print ("发送失败")
                return 'fail'
            finally:
                smtp.quit()
if __name__=="__main__":

    sendemail.send()