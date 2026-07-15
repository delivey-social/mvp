from typing import Any

from fastapi import FastAPI
from fastapi.responses import JSONResponse

from .exceptions import (
    EntityNotFoundException,
    InvalidReferenceException,
    InvalidStateException,
)

from .application.neighborhood import NeighborhoodService
from .application.order import OrderService
from .application.restaurant import RestaurantService

from .infra.bus.inmemory import EventBus, InMemoryEventBus
from .infra.bus.channels.logger import Logger
from .infra.neighborhood.inmemory import InMemoryNeighborhoodRepository
from .infra.order.inmemory import InMemoryOrderRepository
from .infra.restaurant.inmemory import InMemoryRestaurantRepository

from .presentation.config import ConfigurationRouter
from .presentation.neighborhood import NeighborhoodRouter
from .presentation.restaurant import RestaurantRouter
from .presentation.order import OrderRouter

app = FastAPI()

event_bus: EventBus = InMemoryEventBus()
logger = Logger(event_bus)

neighborhood_repo = InMemoryNeighborhoodRepository()
neighborhood_service = NeighborhoodService(repo=neighborhood_repo)

restaurant_repo = InMemoryRestaurantRepository()
restaurant_service = RestaurantService(repo=restaurant_repo)

order_repo = InMemoryOrderRepository()
order_service = OrderService(order_repo, restaurant_service, event_bus)

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


def handle_entity_not_found_exception(_: Any, exc: Exception):
    return JSONResponse(
        status_code=404,
        content={"message": str(exc)},
    )


def handle_invalid_state_exception(_: Any, exc: Exception):
    return JSONResponse(
        status_code=400,
        content={"message": str(exc)},
    )


app.add_exception_handler(
    EntityNotFoundException,
    handle_entity_not_found_exception,
)
app.add_exception_handler(
    InvalidStateException,
    handle_invalid_state_exception,
)
app.add_exception_handler(
    InvalidReferenceException,
    handle_invalid_state_exception,
)
