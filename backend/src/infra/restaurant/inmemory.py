from uuid import UUID

from src.exceptions import EntityNotFoundException
from src.domain.restaurant import MenuItem, Restaurant
from src.domain.types.repositories.restaurant import RestaurantRepository


class InMemoryRestaurantRepository(RestaurantRepository):
    def __init__(self):
        id = UUID("00000000-0000-0000-0000-000000000001")
        self.restaurants: list[Restaurant] = [
            Restaurant(
                name="Test Restaurant",
                CNPJ="12345678901234",
                address="123 Test St",
                id=id,
            )
        ]
        self.menu_items: list[MenuItem] = [
            MenuItem(
                restaurant_id=id,
                name="Test Menu Item",
                description="A delicious test item",
                price=999,
                category="Test Category",
            )
        ]

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
        for i, r in enumerate(self.restaurants):
            if str(r.id) == str(restaurant.id):
                self.restaurants[i] = restaurant
                return

        raise EntityNotFoundException("Restaurant not found")

    def delete(self, restaurant_id: UUID) -> None:
        self.restaurants = [
            r for r in self.restaurants if str(r.id) != str(restaurant_id)
        ]

    def list_(self) -> list[Restaurant]:
        return self.restaurants

    def create_menu_item(self, menu_item: MenuItem) -> None:
        self.menu_items.append(menu_item)

    def update_menu_item(self, menu_item: MenuItem) -> None:
        restaurant_items = [
            item
            for item in self.menu_items
            if str(item.restaurant_id) == str(menu_item.restaurant_id)
        ]

        for i, item in enumerate(restaurant_items):
            if str(item.id) == str(menu_item.id):
                self.menu_items[i] = menu_item
                return

        raise EntityNotFoundException("Menu item not found")

    def delete_menu_item(self, menu_item_id: UUID, restaurant_id: UUID) -> None:
        restaurant_items = [
            item
            for item in self.menu_items
            if str(item.restaurant_id) == str(restaurant_id)
        ]

        for item in restaurant_items:
            if str(item.id) == str(menu_item_id):
                self.menu_items.remove(item)
                return

        raise EntityNotFoundException("Menu item not found")

    def get_menu_items_by_ids(
        self, restaurant_id: UUID, menu_item_ids: list[UUID]
    ) -> list[MenuItem]:
        return [
            item
            for item in self.menu_items
            if str(item.restaurant_id) == str(restaurant_id)
            and str(item.id) in [str(id) for id in menu_item_ids]
        ]
