import asyncio
import uuid
from contextlib import asynccontextmanager
from fastapi import FastAPI
from pydantic import BaseModel
from ingest import ingest_all
from chat import chat
from rabbitmq import start_consumer

@asynccontextmanager
async def lifespan(app: FastAPI):
    print("Starting ingestion...")

    ingest_all()

    asyncio.create_task(start_consumer())

    yield

app = FastAPI(lifespan=lifespan)

class CharRequest(BaseModel):
    message: str
    session_id: str | None = None

class ChatResponse(BaseModel):
    reply: str
    session_id: str

@app.post("/chat")
def chat_endpoint(req: CharRequest):
    session_id = req.session_id or str(uuid.uuid4())
    reply = chat(session_id,req.message)
    return ChatResponse(reply=reply,session_id=session_id)

@app.post("/ingest")
def trigger_ingest():
    ingest_all()
    return {"status":"ok"}
