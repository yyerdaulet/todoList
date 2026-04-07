import os
from sqlalchemy import text
from database import RagSession
from models import Dialog
from ingest import embed
from google import genai
from dotenv import load_dotenv

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY"),
    http_options={"api_version": "v1beta"}
)

def find_similar(question_embedding: list[float], top_k: int = 5):
    with RagSession() as db:
        rows = db.execute(text("""
                               SELECT source_type, source_id, content
                               FROM embeddings
                               ORDER BY embedding <=> CAST(:emb AS vector)
                               LIMIT :k
                               """), {"emb": str(question_embedding), "k": top_k}).fetchall()

        for row in rows:
            print(f"Retrieved: {row.source_type} {row.source_id} -> {row.content[:200]}")

        return [row.content for row in rows]

def get_history(session_id: str, limit: int = 10) -> list[dict]:
    with RagSession() as db:
        rows = db.execute(text("""
                               SELECT role, message FROM dialogs
                               WHERE session_id = :sid
                               ORDER BY created_at DESC
                               LIMIT :limit
                               """), {"sid": session_id, "limit": limit}).fetchall()
        return [{"role": r.role, "message": r.message} for r in reversed(rows)]

def save_message(session_id: str, role: str, message: str):
    with RagSession() as db:
        db.add(Dialog(session_id=session_id, role=role, message=message))
        db.commit()

def chat(session_id: str, question: str) -> str:
    save_message(session_id, "user", question)

    q_embedding = embed(question)
    chunks = find_similar(q_embedding)
    context = "\n---\n".join(chunks)

    history = get_history(session_id)
    history_text = "\n".join(
        f"{'User' if h['role'] == 'user' else 'Assistant'}: {h['message']}"
        for h in history
    )

    prompt = f"""
You are a research assistant for ResearchHub platform.
Use the context below to answer. If not in context, use general knowledge.

=== Platform Context ===
{context}

=== Conversation History ===
{history_text}

=== Question ===
{question}
"""

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt
    )
    reply = response.text

    save_message(session_id, "assistant", reply)
    return reply