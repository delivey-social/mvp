from contextlib import contextmanager
from functools import lru_cache


from .infra.db.config import get_db


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

from .infra.neighborhood.sqlalchemy import SQLAlchemyNeighborhoodRepository
from .infra.restaurant.sqlalchemy import SQLAlchemyRestaurantRepository
from .infra.order.sqlalchemy import SQLAlchemyOrderRepository

from .settings import RepositoryType, settings

from typing import assert_never


event_bus: EventBus = InMemoryEventBus()
logger = Logger(event_bus)

image_repo: ImageRepository = DiskImageRepository("data/images")

db_context_factory = contextmanager(get_db)


@lru_cache(maxsize=None)
def get_neighborhood_repo() -> NeighborhoodRepository:
    match settings.repositories_type:
        case RepositoryType.InMemory:
            return InMemoryNeighborhoodRepository()
        case RepositoryType.SQLAlchemy:
            return SQLAlchemyNeighborhoodRepository(db_context_factory)
        case _ as unknown:
            assert_never(unknown)


@lru_cache(maxsize=None)
def get_restaurant_repo() -> RestaurantRepository:
    match settings.repositories_type:
        case RepositoryType.InMemory:
            return InMemoryRestaurantRepository()
        case RepositoryType.SQLAlchemy:
            return SQLAlchemyRestaurantRepository(db_context_factory)
        case _ as unknown:
            assert_never(unknown)


@lru_cache(maxsize=None)
def get_order_repo() -> OrderRepository:
    match settings.repositories_type:
        case RepositoryType.InMemory:
            return InMemoryOrderRepository()
        case RepositoryType.SQLAlchemy:
            return SQLAlchemyOrderRepository(db_context_factory)
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
