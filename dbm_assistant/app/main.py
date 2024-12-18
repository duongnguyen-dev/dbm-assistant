import os

from minio import Minio
from fastapi import FastAPI
from dotenv import load_dotenv
from pymilvus import connections, FieldSchema, CollectionSchema, DataType, Collection, utility
from app.helpers import *
from loguru import logger
from contextlib import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware
from app.controllers.vectordb.vectordb_controller import router as vectordb_router
from app.controllers.llm.llm_controller import router as llm_router
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
        logger.info(f"Collection {os.getenv('MILVUS_COLLECTION_NAME')} already exists.")
    except Exception as e:
        logger.info(f"Collection {os.getenv('MILVUS_COLLECTION_NAME')} not found. Creating a new one.")
        create_milvus_collection(os.getenv("MILVUS_COLLECTION_NAME"))
        logger.info(f"Collection {os.getenv('MILVUS_COLLECTION_NAME')} created in Milvus.")


    # Yield control back to FastAPI for request handling
    yield

    # Shutdown tasks (like closing connections)
    connections.disconnect("default")
    logger.info("Disconnected from Milvus.")

origins = ["*"]

app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,           # List of allowed origins
    allow_credentials=True,          # Allow cookies to be sent
    allow_methods=["*"],             # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],             # Allow all headers
)
app.include_router(vectordb_router)
app.include_router(llm_router)