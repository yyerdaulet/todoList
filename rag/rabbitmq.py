import aio_pika
import asyncio
import json
import os
from dotenv import load_dotenv
from ingest import(
    ingest_project,ingest_article,
    ingest_profile,ingest_lab,
    delete_embedding
)

load_dotenv()

ROUTING_HANDLERS = {
    "project.created": lambda d: ingest_project(d["id"]),
    "project.updated": lambda d: ingest_project(d["id"]),
    "project.deleted": lambda d: delete_embedding("PROJECT", d["id"]),

    "article.created": lambda d: ingest_article(d["doi"]),
    "article.updated": lambda d: ingest_article(d["doi"]),
    "article.deleted": lambda d: delete_embedding("ARTICLE", d["doi"]),

    "profile.updated": lambda d: ingest_profile(d["id"]),
    "lab.updated": lambda d: ingest_lab(d["id"]),
}

async def start_consumer():
    connection =  await aio_pika.connect_robust(
        host=os.getenv("RABBITMQ_HOST","localhost"),
        login=os.getenv("RABBITMQ_USER","guest"),
        password=os.getenv("RABBITMQ_PASS","guest"),
    )

    async with connection:
        channel = await connection.channel()

        exchange = await channel.declare_exchange(
            "rag.exchange",aio_pika.ExchangeType.TOPIC,durable=True
        )

        queue = await channel.declare_queue("rag.queue",durable=True)

        for routing_key in ROUTING_HANDLERS:
            await queue.bind(exchange,routing_key=routing_key)

        print("RabbitMQ consumer started")

        async for message in queue:
            async with message.process():
                try:
                    data = json.loads(message.body)
                    handler = ROUTING_HANDLERS.get(message.routing_key)
                    if handler :
                        handler(data)
                        print("Processed : " +  {message.routing_key})
                except Exception as e:
                    print("Error processing: " + {message.routing_key} + " : " + {e})
