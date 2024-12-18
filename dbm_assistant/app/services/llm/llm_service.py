import os

from dotenv import load_dotenv
from llama_cpp import Llama
from pymilvus import Collection, utility
from llama_index.embeddings.huggingface import HuggingFaceEmbedding

load_dotenv()

class LlmService:
    def __init__(self,
                 embed_model="BAAI/bge-small-en-v1.5"
                ):
        self.llm = Llama.from_pretrained(
            repo_id = "hugging-quants/Llama-3.2-3B-Instruct-Q8_0-GGUF",
            filename= "*q8_0.gguf",
            n_ctx= 4096
        )

        self._embed_model = HuggingFaceEmbedding(embed_model)
        self._collection = Collection(os.getenv("MILVUS_COLLECTION_NAME"))
        self._collection.create_index(
            field_name="embed",  # Replace with your vector field name
            index_params={
                "index_type": "IVF_FLAT",  # Index type (choose as per your requirements)
                "metric_type": "COSINE",  # Similarity metric: COSINE, L2, or IP
                "params": {"nlist": 128},  # Number of clusters
            },
        )
        self._collection.load()
        # expr = "id in " + str([1, 2, 3, 4])
        # self._collection.query(expr=expr, output_fields=["id", "embed"])

    
    def generate(self, query: str):
        embed_query = self._embed_model.get_text_embedding(query)
        retrived_data = self._collection.search(
            data=[embed_query], 
            anns_field="embed",  # Vector field name in the collection
            param= {"metric_type": "COSINE", "params": {"nprobe": 10}},
            output_fields=["metadata"],
            limit=2  # Number of results to return
        )
        retrieved_data = []
        prompt = [
            {
                "role": "system", 
                "content": f"""
                    Based on the following context:\n{retrived_data}, answer the question:\nQuestion: {query}\n
                """
            }
        ]
        response = self.llm.create_chat_completion(
            messages=prompt, 
            top_k=2,
            top_p=0.95,
            temperature=0.2,
            max_tokens=2048,
        )
        return response