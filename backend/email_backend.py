# email_backend.py
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
from dotenv import load_dotenv

load_dotenv()

EMAIL_SENDER = os.getenv("EMAIL_SENDER")
EMAIL_PASSWORD = os.getenv("EMAIL_PASSWORD")
EMAIL_RECEIVER = os.getenv("EMAIL_RECEIVER")


def send_contact_email(name: str, email: str, description: str):
    subject = f"New Contact Form Submission from {name}"
    body = f"""
    You've received a new message from your portfolio site:

    Name: {name}
    Email: {email}
    Message:
    {description}
    """

    msg = MIMEMultipart()
    msg["From"] = EMAIL_SENDER
    msg["To"] = EMAIL_RECEIVER
    msg["Subject"] = subject

    msg.attach(MIMEText(body, "plain"))

    try:
        server = smtplib.SMTP("smtp.gmail.com", 587)
        server.starttls()
        server.login(EMAIL_SENDER, EMAIL_PASSWORD)
        server.sendmail(EMAIL_SENDER, EMAIL_RECEIVER, msg.as_string())
        server.quit()
        return True
    except Exception as e:
        print("Error sending email:", e)
        return False
