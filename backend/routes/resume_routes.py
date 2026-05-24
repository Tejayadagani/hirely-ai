from fastapi import APIRouter
from fastapi import UploadFile
from fastapi import File

import shutil
import os

from services.resume_parser import (
    extract_resume_text,

    parse_resume_with_ai,

    parse_resume_fields
)

router = APIRouter()

UPLOAD_FOLDER = "uploads/resumes"

os.makedirs(
    UPLOAD_FOLDER,
    exist_ok=True
)

@router.post("/upload-resume")
async def upload_resume(

    file: UploadFile = File(...)
):

    # -----------------------------------
    # SAVE FILE
    # -----------------------------------
    file_path = os.path.join(

        UPLOAD_FOLDER,

        file.filename
    )

    with open(file_path, "wb") as buffer:

        shutil.copyfileobj(
            file.file,
            buffer
        )

    # -----------------------------------
    # EXTRACT RESUME TEXT
    # -----------------------------------
    resume_text = extract_resume_text(
        file_path
    )

    # -----------------------------------
    # AI PARSING
    # -----------------------------------
    parsed_resume = parse_resume_with_ai(
        resume_text
    )

    parsed_data = parse_resume_fields(
        parsed_resume
    )

    # -----------------------------------
    # RESPONSE
    # -----------------------------------
    return {

        "filename": file.filename,

        "resume_text": resume_text,

        "parsed_data": parsed_data,

        "message":
            "Resume uploaded successfully 🚀"
    }