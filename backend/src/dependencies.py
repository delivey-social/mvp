from .application.neighborhood import NeighborhoodService
from .application.order import OrderService
from .application.restaurant import RestaurantService

from .infra.image.disk import DiskImageRepository, ImageRepository
from .infra.bus.inmemory import EventBus, InMemoryEventBus
from .infra.bus.channels.logger import Logger
from .infra.neighborhood.inmemory import InMemoryNeighborhoodRepository
from .infra.order.inmemory import InMemoryOrderRepository
from .infra.restaurant.inmemory import InMemoryRestaurantRepository


event_bus: EventBus = InMemoryEventBus()
logger = Logger(event_bus)

image_repo: ImageRepository = DiskImageRepository("data/images")

neighborhood_repo = InMemoryNeighborhoodRepository()
neighborhood_service = NeighborhoodService(neighborhood_repo)

restaurant_repo = InMemoryRestaurantRepository()
restaurant_service = RestaurantService(restaurant_repo, image_repo)

order_repo = InMemoryOrderRepository()
order_service = OrderService(
    order_repo,
    restaurant_service,
    neighborhood_service,
    event_bus,
)
