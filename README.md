# dbm-assistant
A smart virtual assistant designed to simplify database management. The project integrates voice and text-based interactions to query, update, and manage data efficiently. Leveraging advanced AI technologies like LLMs and speech-to-text, it enhances user experience and automates workflows for seamless data administration.

# Project setup
- Frontend:
    - Install npm 
    - Create project: npx create-react-app client
    - npm install @types/react @types/react-dom

# Install LlamaV3
```bash
CMAKE_ARGS="-DCMAKE_OSX_ARCHITECTURES=arm64 -DGGML_METAL=on" pip install --upgrade --verbose --force-reinstall --no-cache-dir llama-cpp-python==0.3.1
```
