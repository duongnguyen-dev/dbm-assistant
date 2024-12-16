from app.services.vectordb.vectordb_service import VectorDBService
from app.model.vectordb_model import VectorDBModel
from fastapi import APIRouter
from loguru import logger

router = APIRouter()


@router.post("/create")
async def create(
    vectordb: VectorDBModel
):
    try:
        vectorDbService = VectorDBService(
            vectordb.host,
            vectordb.port, 
            vectordb.database, 
            vectordb.username, 
            vectordb.password, 
            vectordb.embed_model, 
            vectordb.collection_name
        )
        try:
            vectorDbService.create()
        except Exception as e:
            logger.error("Error when creating Milvus Vector Database!")
    except Exception as e:
        logger.error(e)
        return {"Error" : e}
    
    logger.info("Successfully created Milvus Database")