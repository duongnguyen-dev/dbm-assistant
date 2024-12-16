from pydantic import BaseModel

class VectorDBModel(BaseModel):
    host: str
    port: str 
    database: str 
    username: str 
    password: str 
    embed_model: str
    collection_name: str
