from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
import smtplib
from email.message import EmailMessage
from dotenv import load_dotenv

load_dotenv()  # Load values from .env

app = FastAPI()

# CORS config to allow requests from your frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can replace "*" with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Email config
EMAIL_SENDER = os.getenv("EMAIL_SENDER")
EMAIL_PASSWORD = os.getenv("EMAIL_PASSWORD")
EMAIL_RECEIVER = os.getenv("EMAIL_RECEIVER")

class ContactForm(BaseModel):
    name: str
    email: str
    description: str

@app.post("/api/send-email")
async def send_email(data: ContactForm):
    try:
        msg = EmailMessage()
        msg['Subject'] = "New Message from Portfolio Contact Form"
        msg['From'] = EMAIL_SENDER
        msg['To'] = EMAIL_RECEIVER
        msg.set_content(
            f"Name: {data.name}\nEmail: {data.email}\n\nMessage:\n{data.description}"
        )

        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as smtp:
            smtp.login(EMAIL_SENDER, EMAIL_PASSWORD)
            smtp.send_message(msg)

        return {"success": True, "message": "Email sent successfully."}
    except Exception as e:
        return {"success": False, "error": str(e)}

# Add this at the bottom of your file
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=10000, reload=True)
