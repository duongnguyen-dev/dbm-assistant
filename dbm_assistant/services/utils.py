import tempfile
import os
import shutil
from huggingface_hub import snapshot_download

def upload_model_to_minio(bucket_name: str, full_model_name: str, revision: str) -> None:
   '''
   Download a model from Hugging Face and upload it to MinIO. This function will use
   the current systems temp directory to temporarily save the model.
   '''

   # Create a local directory for the model.
   #home = str(Path.home())
   temp_dir = tempfile.gettempdir()
   base_path = f'{temp_dir}{os.sep}hf-models'
   os.makedirs(base_path, exist_ok=True)

   # Get the user name and the model name.
   tmp = full_model_name.split('/')
   user_name = tmp[0]
   model_name = tmp[1]

   # The snapshot_download will use this pattern for the path name.
   model_path_name=f'models--{user_name}--{model_name}'
   # The full path on the local drive.
   full_model_local_path = base_path + os.sep + model_path_name + os.sep + 'snapshots' + os.sep + revision
   # The path used by MinIO.
   full_model_object_path = model_path_name + '/snapshots/' + revision

   print(f'Starting download from HF to {full_model_local_path}.')
   snapshot_download(repo_id=full_model_name, revision=revision, cache_dir=base_path)

   print('Uploading to MinIO.')
   upload_local_directory_to_minio(full_model_local_path, bucket_name, 
                                   full_model_object_path)
   shutil.rmtree(full_model_local_path)