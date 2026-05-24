from fastapi_mail import (

    FastMail,

    MessageSchema,

    ConnectionConfig
)

from dotenv import load_dotenv

import os

# -----------------------------------
# LOAD ENV VARIABLES
# -----------------------------------
load_dotenv()

# -----------------------------------
# MAIL CONFIGURATION
# -----------------------------------
conf = ConnectionConfig(

    MAIL_USERNAME=
        os.getenv("MAIL_USERNAME"),

    MAIL_PASSWORD=
        os.getenv("MAIL_PASSWORD"),

    MAIL_FROM=
        os.getenv("MAIL_FROM"),

    MAIL_PORT=
        int(os.getenv("MAIL_PORT")),

    MAIL_SERVER=
        os.getenv("MAIL_SERVER"),

    MAIL_STARTTLS=True,

    MAIL_SSL_TLS=False,

    USE_CREDENTIALS=True
)

# -----------------------------------
# SEND INTERVIEW RESULT EMAIL
# -----------------------------------
async def send_interview_email(

    candidate_email,

    candidate_name,

    role,

    evaluation
):

    # -----------------------------------
    # SHORT SUMMARY
    # -----------------------------------
    short_summary = evaluation[:400]

    # -----------------------------------
    # EMAIL BODY
    # -----------------------------------
    body = f"""
Hi {candidate_name},

Thank you for completing the AI interview for the role of {role} at Hirely AI.

Your interview has been successfully submitted and is currently under review by our recruitment team.

We appreciate your time and participation throughout the interview process.

Best Regards,
Hirely AI Team"""

    # -----------------------------------
    # EMAIL MESSAGE
    # -----------------------------------
    message = MessageSchema(

        subject="Hirely AI Interview ",

        recipients=[candidate_email],

        body=body,

        subtype="plain"
    )

    # -----------------------------------
    # SEND EMAIL
    # -----------------------------------
    fm = FastMail(conf)

    await fm.send_message(message)

    print(

        f"✅ Email sent to {candidate_email}"
    )