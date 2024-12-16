from setuptools import setup, find_packages

setup(
    name="dbm_assistant",  # Replace with your project name
    version="0.0.1",  # Start with an initial version
    packages=find_packages(),  # Automatically find packages in your project
    install_requires=[
        "pandas==2.0.3",
        "python-dotenv==1.0.1",
        "minio==7.2.12",
        "pyyaml==6.0.2",
        "vllm==0.6.4.post1",
        "psycopg2-binary==2.9.10",
        "loguru==0.7.3",
        "minio==7.2.12",
        "fastapi==0.115.6",
        "uvicorn==0.34.0"
    ],
    # Metadata for the package
    author="duongnguyen-dev",
    author_email="duongng2911@gmail.com",
    description="",
    # long_description=open("README.md").read(),  # If you have a README file
    # long_description_content_type="text/markdown",  # Use markdown for README
    # url="https://github.com/your_username/my_project",  # Replace with your repository URL
    classifiers=[
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: MIT License",  # Adjust to your license
        "Operating System :: OS Independent",
    ],
    python_requires='>=3.12',  # Specify the minimum Python version required
)