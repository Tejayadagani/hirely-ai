from sqlalchemy import (

    Column,
    Integer,
    String,
    Text
)

from database.db import Base

# -----------------------------------
# CANDIDATE MODEL
# -----------------------------------
class Candidate(Base):

    __tablename__ = "candidates"

    id = Column(

        Integer,

        primary_key=True,

        index=True
    )

    name = Column(String)

    email = Column(String)

    role = Column(String)

    tech_stack = Column(String)

    experience = Column(String)

    resume_text = Column(Text)

# -----------------------------------
# INTERVIEW MODEL
# -----------------------------------
class Interview(Base):

    __tablename__ = "interviews"

    id = Column(

        Integer,

        primary_key=True,

        index=True
    )

    candidate_name = Column(String)

    role = Column(String)

    ats_score = Column(String)

    evaluation = Column(Text)