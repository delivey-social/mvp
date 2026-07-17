from .config import ConfigurationRouter
from .neighborhood import NeighborhoodRouter
from .restaurant import RestaurantRouter
from .order import OrderRouter

from src.dependencies import (
    neighborhood_service,
    restaurant_service,
    order_service,
)

config_router = ConfigurationRouter()
neighborhood_router = NeighborhoodRouter(neighborhood_service)
order_router = OrderRouter(order_service)
restaurant_router = RestaurantRouter(restaurant_service)
