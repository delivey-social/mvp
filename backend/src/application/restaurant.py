from uuid import UUID

from src.domain.restaurant import MenuItem, Restaurant
from src.domain.types.repositories.restaurant import RestaurantRepository


class RestaurantService:
    def __init__(self, repo: RestaurantRepository):
        self.repo = repo

    def get_by_id(self, id: UUID):
        return self.repo.get_restaurant_by_id(id)

    def list_menu_items(self, restaurant_id: UUID):
        return self.repo.list_menu_items(restaurant_id)

    def create(self, restaurant: Restaurant) -> None:
        self.repo.create(restaurant)

    def update(self, restaurant: Restaurant) -> None:
        self.repo.update(restaurant)

    def delete(self, restaurant_id: UUID) -> None:
        self.repo.delete(restaurant_id)

    def list_(self) -> list[Restaurant]:
        return self.repo.list_()

    def create_menu_item(self, menu_item: MenuItem) -> None:
        self.repo.create_menu_item(menu_item)

    def update_menu_item(self, menu_item: MenuItem) -> None:
        self.repo.update_menu_item(menu_item)

    def delete_menu_item(self, id: UUID) -> None:
        self.repo.delete_menu_item(id)

    def get_menu_items_by_ids(
        self,
        restaurant_id: UUID,
        ids: list[UUID],
    ) -> list[MenuItem]:
        return self.repo.get_menu_items_by_ids(restaurant_id, ids)
