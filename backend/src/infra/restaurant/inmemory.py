from uuid import UUID

from src.domain.restaurant import MenuItem, Restaurant
from src.domain.types.repositories.restaurant import RestaurantRepository


class InMemoryRestaurantRepository(RestaurantRepository):
    def __init__(self):
        self.restaurants: list[Restaurant] = []
        self.menu_items: list[MenuItem] = []

    def get_restaurant_by_id(self, id: UUID) -> Restaurant:
        for restaurant in self.restaurants:
            if str(restaurant.id) == str(id):
                return restaurant

        raise ValueError("Restaurant not found")

    def list_menu_items(self, restaurant_id: UUID) -> list[MenuItem]:
        return [
            item
            for item in self.menu_items
            if str(item.restaurant_id) == str(restaurant_id)
        ]

    def create(self, restaurant: Restaurant) -> None:
        self.restaurants.append(restaurant)

    def update(self, restaurant: Restaurant) -> None:
        self.restaurants = [
            r if str(r.id) != str(restaurant.id) else restaurant
            for r in self.restaurants
        ]

    def delete(self, restaurant_id: UUID) -> None:
        self.restaurants = [
            r for r in self.restaurants if str(r.id) != str(restaurant_id)
        ]

    def list_(self) -> list[Restaurant]:
        return self.restaurants

    def create_menu_item(self, menu_item: MenuItem) -> None:
        self.menu_items.append(menu_item)

    def update_menu_item(self, menu_item: MenuItem) -> None:
        self.menu_items = [
            item if str(item.id) != str(menu_item.id) else menu_item
            for item in self.menu_items
        ]

    def delete_menu_item(self, menu_item_id: UUID) -> None:
        self.menu_items = [
            item for item in self.menu_items if str(item.id) != str(menu_item_id)
        ]

    def get_menu_items_by_ids(
        self, restaurant_id: UUID, menu_item_ids: list[UUID]
    ) -> list[MenuItem]:
        return [
            item
            for item in self.menu_items
            if str(item.restaurant_id) == str(restaurant_id)
            and str(item.id) in [str(id) for id in menu_item_ids]
        ]
