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

    @abstractmethod
    def create(self, restaurant: Restaurant) -> None:
        pass

    @abstractmethod
    def update(self, restaurant: Restaurant) -> None:
        pass

    @abstractmethod
    def delete(self, restaurant_id: UUID) -> None:
        pass

    @abstractmethod
    def list_(self) -> list[Restaurant]:
        pass

    @abstractmethod
    def create_menu_item(self, menu_item: MenuItem) -> None:
        pass

    @abstractmethod
    def update_menu_item(self, menu_item: MenuItem) -> None:
        pass

    @abstractmethod
    def delete_menu_item(self, menu_item_id: UUID, restaurant_id: UUID) -> None:
        pass

    @abstractmethod
    def get_menu_items_by_ids(
        self, restaurant_id: UUID, menu_item_ids: list[UUID]
    ) -> list[MenuItem]:
        pass

    @abstractmethod
    def get_menu_item_by_id(self, restaurant_id: UUID, menu_item_id: UUID) -> MenuItem:
        pass
