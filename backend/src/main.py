from fastapi import FastAPI

from .presentation.config import ConfigurationRouter

app = FastAPI()

config_router = ConfigurationRouter()

app.include_router(config_router)


@app.get("/")
def ping():
    return {"message": "comida.app service is alive!"}
