from fastapi import FastAPI


from .presentation.config import ConfigurationRouter
from .presentation.neighborhood import NeighborhoodRouter

app = FastAPI()

config_router = ConfigurationRouter()
neighborhood_router = NeighborhoodRouter()

app.include_router(config_router)
app.include_router(neighborhood_router)


@app.get("/")
def ping():
    return {"message": "comida.app service is alive!"}
