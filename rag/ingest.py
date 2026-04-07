import os
from sqlalchemy import text
from database import MainSession, RagSession
from models import Embedding
from dotenv import load_dotenv
from google import genai
import time

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY"),
    http_options={"api_version": "v1beta"}
)

def embed(text_input: str) -> list[float]:
    result = client.models.embed_content(
        model="models/gemini-embedding-001",
        contents=text_input  # ← 'contents' not 'content'
    )
    return result.embeddings[0].values

def _upsert(db, source_type: str, source_id: int, content: str):
    db.execute(
        text("DELETE FROM embeddings WHERE source_type=:t AND source_id=:id"),
        {"t": source_type, "id": str(source_id)}
    )
    db.add(Embedding(
        source_type=source_type,
        source_id=str(source_id),
        content=content,
        embedding=embed(content)
    ))
    db.commit()

    time.sleep(2)

def ingest_project(project_id: int):
    with MainSession() as main_db:
        row = main_db.execute(
            text("SELECT id, name, purpose, status FROM projects WHERE id = :id"),
            {"id": project_id}
        ).fetchone()

        if not row:
            delete_embedding("PROJECT", project_id)
            return

        content = f"Project: {row.name}. Purpose: {row.purpose or ''}. Status: {row.status or ''}"

    with RagSession() as rag_db:
        _upsert(rag_db, "PROJECT", row.id, content)

def ingest_article(doi: str):
    with MainSession() as main_db:
        row = main_db.execute(
            text("SELECT doi, title, description FROM articles WHERE doi = :doi"),
            {"doi": doi}
        ).fetchone()

        if not row:
            delete_embedding("ARTICLE", doi)
            return

        description = row.description or ""
        content = f"Article: {row.title}. {description[:500]}"

    with RagSession() as rag_db:
        _upsert(rag_db, "ARTICLE", row.doi, content)

def ingest_profile(profile_id: int):
    with MainSession() as main_db:
        row = main_db.execute(
            text("SELECT id, name, last_name, degree FROM profiles WHERE id = :id"),
            {"id": profile_id}
        ).fetchone()

        if not row:
            delete_embedding("PROFILE", profile_id)
            return

        content = f"Researcher: {row.name} {row.last_name or ''}. Degree: {row.degree or ''}."

    with RagSession() as rag_db:
        _upsert(rag_db, "PROFILE", row.id, content)

def ingest_lab(lab_id: int):
    with MainSession() as main_db:
        row = main_db.execute(
            text("SELECT id, name, info FROM lab WHERE id = :id"),
            {"id": lab_id}
        ).fetchone()

        if not row:
            delete_embedding("LAB", lab_id)
            return

        content = f"Lab: {row.name}. {row.info or ''}"

    with RagSession() as rag_db:
        _upsert(rag_db, "LAB", row.id, content)

def delete_embedding(source_type: str, source_id: int):
    with RagSession() as db:
        db.execute(
            text("DELETE FROM embeddings WHERE source_type=:t AND source_id=:id"),
            {"t": source_type, "id": source_id}
        )
        db.commit()

def ingest_all():
    with MainSession() as main_db:

        # Projects — column is 'name' not 'title'
        rows = main_db.execute(
            text("SELECT id, name, purpose, status FROM projects")
        ).fetchall()
        for row in rows:
            ingest_project({"id": row.id, "name": row.name,
                            "purpose": row.purpose, "status": row.status})

        # Articles — PK is 'doi', no 'id', content column is 'description'
        rows = main_db.execute(
            text("SELECT doi, title, description FROM articles")
        ).fetchall()
        for row in rows:
            ingest_article({"doi": row.doi, "title": row.title,
                            "description": row.description})

        # Profiles
        rows = main_db.execute(
            text("SELECT id, name, last_name, degree, orcid FROM profiles")
        ).fetchall()
        for row in rows:
            ingest_profile({"id": row.id, "name": row.name,
                            "last_name": row.last_name, "degree": row.degree})

        # Labs — table is 'lab' not 'labs', info column not description
        rows = main_db.execute(
            text("SELECT id, name, info FROM lab")
        ).fetchall()
        for row in rows:
            ingest_lab({"id": row.id, "name": row.name, "info": row.info})

    print("✅ Full ingestion complete")