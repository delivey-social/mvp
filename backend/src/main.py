from fastapi import FastAPI

from .application.neighborhood import NeighborhoodService
from .application.order import OrderService
from .application.restaurant import RestaurantService

from .infra.neighborhood.inmemory import InMemoryNeighborhoodRepository
from .infra.order.inmemory import InMemoryOrderRepository
from .infra.restaurant.inmemory import InMemoryRestaurantRepository

from .presentation.config import ConfigurationRouter
from .presentation.neighborhood import NeighborhoodRouter
from .presentation.restaurant import RestaurantRouter
from .presentation.order.main import OrderRouter

app = FastAPI()

neighborhood_repo = InMemoryNeighborhoodRepository()
neighborhood_service = NeighborhoodService(repo=neighborhood_repo)

restaurant_repo = InMemoryRestaurantRepository()
restaurant_service = RestaurantService(repo=restaurant_repo)

order_repo = InMemoryOrderRepository()
order_service = OrderService(order_repo, restaurant_service)

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
