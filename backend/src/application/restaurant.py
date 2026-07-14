from uuid import UUID

from src.domain.restaurant import MenuItem, Restaurant
from src.domain.types.repositories.restaurant import RestaurantRepository


class RestaurantService:
    def __init__(self, repo: RestaurantRepository):
        self.repo = repo

    def get_restaurant_by_id(self, id: UUID):
        return self.repo.get_restaurant_by_id(id)

    def list_menu_items(self, restaurant_id: UUID):
        return self.repo.list_menu_items(restaurant_id)

    def create_restaurant(self, restaurant: Restaurant) -> None:
        raise NotImplementedError("This method is not implemented yet.")

    def update_restaurant(self, restaurant: Restaurant) -> None:
        raise NotImplementedError("This method is not implemented yet.")

    def delete_restaurant(self, restaurant_id: UUID) -> None:
        raise NotImplementedError("This method is not implemented yet.")

    def list_restaurants(self) -> list[Restaurant]:
        raise NotImplementedError("This method is not implemented yet.")

    def create_menu_item(self, restaurant_id: UUID, menu_item: MenuItem) -> None:
        raise NotImplementedError("This method is not implemented yet.")

    def update_menu_item(self, restaurant_id: UUID, menu_item: MenuItem) -> None:
        raise NotImplementedError("This method is not implemented yet.")

    def delete_menu_item(self, restaurant_id: UUID, menu_item_id: UUID) -> None:
        raise NotImplementedError("This method is not implemented yet.")

    def get_menu_items_by_ids(
        self, restaurant_id: UUID, menu_item_ids: list[UUID]
    ) -> list[MenuItem]:
        raise NotImplementedError("This method is not implemented yet.")
