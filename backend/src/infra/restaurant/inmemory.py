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
