from abc import ABC, abstractmethod
from uuid import UUID

from src.domain.restaurant import MenuItem, Restaurant


class RestaurantRepository(ABC):
    @abstractmethod
    def get_restaurant_by_id(self, id: UUID) -> Restaurant:
        pass

    @abstractmethod
    def list_menu_items(self, restaurant_id: UUID) -> list[MenuItem]:
        pass
