from functools import lru_cache

from .domain.types.repositories.neighborhood import NeighborhoodRepository
from .domain.types.repositories.restaurant import RestaurantRepository
from .domain.types.repositories.order import OrderRepository

from .application.order import OrderService
from .application.neighborhood import NeighborhoodService
from .application.restaurant import RestaurantService

from .infra.image.disk import DiskImageRepository, ImageRepository
from .infra.bus.inmemory import EventBus, InMemoryEventBus
from .infra.bus.channels.logger import Logger
from .infra.neighborhood.inmemory import InMemoryNeighborhoodRepository
from .infra.order.inmemory import InMemoryOrderRepository
from .infra.restaurant.inmemory import InMemoryRestaurantRepository

from .settings import RepositoryType, settings

from typing import assert_never


event_bus: EventBus = InMemoryEventBus()
logger = Logger(event_bus)

image_repo: ImageRepository = DiskImageRepository("data/images")


@lru_cache(maxsize=None)
def get_neighborhood_repo() -> NeighborhoodRepository:
    match settings.repositories_type:
        case RepositoryType.InMemory:
            return InMemoryNeighborhoodRepository()
        case RepositoryType.SQLAlchemy:
            raise NotImplementedError("SQLAlchemy repository is not implemented yet")
        case _ as unknown:
            assert_never(unknown)


@lru_cache(maxsize=None)
def get_restaurant_repo() -> RestaurantRepository:
    match settings.repositories_type:
        case RepositoryType.InMemory:
            return InMemoryRestaurantRepository()
        case RepositoryType.SQLAlchemy:
            raise NotImplementedError("SQLAlchemy repository is not implemented yet")
        case _ as unknown:
            assert_never(unknown)


@lru_cache(maxsize=None)
def get_order_repo() -> OrderRepository:
    match settings.repositories_type:
        case RepositoryType.InMemory:
            return InMemoryOrderRepository()
        case RepositoryType.SQLAlchemy:
            raise NotImplementedError("SQLAlchemy repository is not implemented yet")
        case _ as unknown:
            assert_never(unknown)


neighborhood_service = NeighborhoodService(get_neighborhood_repo())
restaurant_service = RestaurantService(get_restaurant_repo(), image_repo)
order_service = OrderService(
    get_order_repo(),
    restaurant_service,
    neighborhood_service,
    event_bus,
)
