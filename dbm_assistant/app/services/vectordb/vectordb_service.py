import psycopg2

from loguru import logger
from pymilvus import Collection
from llama_index.embeddings.huggingface import HuggingFaceEmbedding

class VectorDBService:
    def __init__(self, 
                 host, 
                 port, 
                 database, 
                 username, 
                 password, 
                 embed_model,
                 collection_name 
                 ):
        self._host = host
        self._port = port   
        self._database = database
        self._username = username
        self._password = password
        self._embed_model = HuggingFaceEmbedding(model_name=embed_model)

        self._conn = psycopg2.connect(
            database=self._database,
            host=self._host,
            port=self._port,
            user=self._username, 
            password=self._password
        )
        self._cur = self._conn.cursor()
        logger.info("Successfully connect to database.")

        self._collection = Collection(collection_name)
        logger.info(self._collection.schema)

    def create(self):
        self._cur.execute("""
            SELECT * FROM "Product"
        """)
        data = self._cur.fetchall()
        self._cur.close()
        self._conn.close()

        for item in data:
            id, name, image, price, discount, availability, specification = item
            text_data = f"Name: {name}, Image URL: {image}, Price: {price}, Discount: {discount}, Availability: {'In stock' if {availability} else 'Out of stock'}, Specification: {specification}"
            try:
                embedding = self._embed_model.get_text_embedding(text_data)
                metadata = {
                    "name" : item[1],
                    "price": item[2],
                    "discount": item[3],
                    "availability": item[4],
                    "specification": item[5]
                }
                inserted_data = [
                    {
                        "metadata": metadata,
                        "embed": embedding,
                    }
                ]
                try:
                    self._collection.insert(
                        inserted_data
                    )
                except Exception as e:
                    logger.error(e)
            except Exception as e:
                logger.error(e)
