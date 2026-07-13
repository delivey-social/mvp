from fastapi import FastAPI

from .application.neighborhood import NeighborhoodService

from .infra.neighborhood.inmemory import InMemoryNeighborhoodRepository


from .presentation.config import ConfigurationRouter
from .presentation.neighborhood import NeighborhoodRouter

app = FastAPI()

neighborhood_repo = InMemoryNeighborhoodRepository()
neighborhood_service = NeighborhoodService(repo=neighborhood_repo)

config_router = ConfigurationRouter()
neighborhood_router = NeighborhoodRouter(service=neighborhood_service)

app.include_router(config_router)
app.include_router(neighborhood_router)


@app.get("/")
def ping():
    return {"message": "comida.app service is alive!"}
