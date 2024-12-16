import os

from minio import Minio
from fastapi import FastAPI
from dotenv import load_dotenv
from pymilvus import connections, FieldSchema, CollectionSchema, DataType, Collection
from app.helpers import *
from loguru import logger
from contextlib import asynccontextmanager

from app.controllers.vectordb.vectordb_controller import router as vectordb_router
load_dotenv()

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Connect to MinIO
    minio_client = Minio(
        os.getenv("MINIO_ENDPOINT"),
        access_key=os.getenv("MINIO_ACCESS_KEY"),
        secret_key=os.getenv("MINIO_SECRET_KEY"),
        secure=False,
    )
    logger.info("Connected to Minio")
    # Connect to Milvus
    connections.connect("default", host=os.getenv("MILVUS_HOST"), port=os.getenv("MILVUS_PORT"))
    logger.info("Connected to Milvus!")

    try:
        collection = Collection(os.getenv("MILVUS_COLLECTION_NAME"))
        logger.info(f"Collection '{os.getenv("MILVUS_COLLECTION_NAME")}' already exists.")
    except Exception as e:
        logger.info(f"Collection '{os.getenv("MILVUS_COLLECTION_NAME")}' not found. Creating a new one.")
        create_milvus_collection(os.getenv("MILVUS_COLLECTION_NAME"))
        logger.info(f"Collection '{os.getenv("MILVUS_COLLECTION_NAME")}' created in Milvus.")


    # Yield control back to FastAPI for request handling
    yield

    # Shutdown tasks (like closing connections)
    connections.disconnect("default")
    logger.info("Disconnected from Milvus.")

app = FastAPI(lifespan=lifespan)

app.include_router(vectordb_router)