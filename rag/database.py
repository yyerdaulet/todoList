import os
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker,DeclarativeBase
from dotenv import load_dotenv

load_dotenv()

main_engine = create_engine(os.getenv("MAIN_DB"))
MainSession = sessionmaker(bind=main_engine)

rag_engine = create_engine(os.getenv("RAG_DB"))
RagSession = sessionmaker(bind=rag_engine)

class Base(DeclarativeBase):
    pass