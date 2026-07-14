from fastapi import FastAPI

from src.application.restaurant import RestaurantService
from src.infra.restaurant.inmemory import InMemoryRestaurantRepository
from src.presentation.restaurant import RestaurantRouter
from src.application.order import OrderService
from src.infra.order.inmemory import InMemoryOrderRepository
from src.presentation.order import OrderRouter

from .application.neighborhood import NeighborhoodService

from .infra.neighborhood.inmemory import InMemoryNeighborhoodRepository


from .presentation.config import ConfigurationRouter
from .presentation.neighborhood import NeighborhoodRouter

app = FastAPI()

neighborhood_repo = InMemoryNeighborhoodRepository()
neighborhood_service = NeighborhoodService(repo=neighborhood_repo)

order_repo = InMemoryOrderRepository()
order_service = OrderService(order_repo)

restaurant_repo = InMemoryRestaurantRepository()
restaurant_service = RestaurantService(repo=restaurant_repo)

config_router = ConfigurationRouter()
neighborhood_router = NeighborhoodRouter(service=neighborhood_service)
order_router = OrderRouter(order_service)
restaurant_router = RestaurantRouter(service=restaurant_service)

app.include_router(config_router)
app.include_router(neighborhood_router)
app.include_router(order_router)
app.include_router(restaurant_router)


@app.get("/")
def ping():
    return {"message": "comida.app service is alive!"}
