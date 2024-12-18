from app.services.llm.llm_service import LlmService
from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from loguru import logger

router = APIRouter()

@router.post("/generate")
async def generate(query: str):
    llm_service = LlmService()
    response = llm_service.generate(query)
    return { "response" : response}