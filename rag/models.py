from sqlalchemy import Column, BigInteger, Text, String, DateTime
from sqlalchemy.sql import func
from pgvector.sqlalchemy import Vector
from database import Base, rag_engine

class Embedding(Base):
    __tablename__ = "embeddings"
    id            = Column(BigInteger,primary_key=True,autoincrement=True)
    source_type   = Column(String(50))
    source_id     = Column(Text)
    content       = Column(Text)
    embedding     = Column(Vector(3072))

class Dialog(Base):
    __tablename__ = "dialogs"
    id            = Column(BigInteger,primary_key=True,autoincrement=True)
    session_id    = Column(String(100),index=True)
    role          = Column(String(20))
    message       = Column(Text)
    created_at    = Column(DateTime,server_default=func.now())

def create_tables():
    Base.metadata.create_all(rag_engine)