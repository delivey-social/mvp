from abc import ABC, abstractmethod
from uuid import UUID

from src.domain.restaurant import MenuItem, Restaurant


class RestaurantRepository(ABC):
    @abstractmethod
    def get_restaurant_by_id(self, id: UUID) -> Restaurant: ...

    @abstractmethod
    def list_menu_items(self, restaurant_id: UUID) -> list[MenuItem]: ...

    @abstractmethod
    def create(self, restaurant: Restaurant) -> None: ...

    @abstractmethod
    def update(self, restaurant: Restaurant) -> None: ...

    @abstractmethod
    def delete(self, restaurant_id: UUID) -> None: ...

    @abstractmethod
    def list_(self) -> list[Restaurant]: ...

    @abstractmethod
    def exists(self, restaurant_id: UUID) -> bool: ...

    @abstractmethod
    def create_menu_item(self, menu_item: MenuItem) -> None: ...

    @abstractmethod
    def update_menu_item(self, menu_item: MenuItem) -> None: ...

    @abstractmethod
    def delete_menu_item(
        self,
        menu_item_id: UUID,
        restaurant_id: UUID,
    ) -> None: ...

    @abstractmethod
    def get_menu_items_by_ids(
        self, restaurant_id: UUID, menu_item_ids: list[UUID]
    ) -> list[MenuItem]: ...

    @abstractmethod
    def get_menu_item_by_id(
        self, restaurant_id: UUID, menu_item_id: UUID
    ) -> MenuItem: ...
