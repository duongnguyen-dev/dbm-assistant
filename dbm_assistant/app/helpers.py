from pymilvus import connections, FieldSchema, CollectionSchema, DataType, Collection

def create_milvus_collection(collection_name):
    fields = [
        FieldSchema(name="id", dtype=DataType.INT64, is_primary=True, auto_id=True),
        FieldSchema(name="metadata", dtype=DataType.JSON),
        FieldSchema(name="embed", dtype=DataType.FLOAT_VECTOR, dim=384),
    ]
    schema = CollectionSchema(fields, description="Product data with embeddings")

    # Connect to Milvus and create collection
    collection = Collection(name=collection_name, schema=schema)
    return collection