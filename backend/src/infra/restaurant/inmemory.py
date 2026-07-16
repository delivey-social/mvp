from pathlib import Path
from uuid import UUID

from src.exceptions import EntityNotFoundException
from src.domain.restaurant import MenuItem, Restaurant
from src.domain.shared.cnpj import CNPJ
from src.domain.types.repositories.restaurant import RestaurantRepository


class InMemoryRestaurantRepository(RestaurantRepository):
    def __init__(self):
        self._current_id = 0
        self._current_menu_item_id = 0

        restaurant_id = self._get_next_id()

        self.restaurants: list[Restaurant] = [
            Restaurant(
                name="Test Restaurant",
                CNPJ=CNPJ("12345678901234"),
                address="123 Test St",
                id=restaurant_id,
            )
        ]
        self.menu_items: list[MenuItem] = [
            MenuItem(
                id=self._get_next_menu_item_id(),
                restaurant_id=restaurant_id,
                name="Test Menu Item",
                description="A delicious test item",
                price=999,
                category="Test Category",
                image_path=Path("data/images/test_image.jpg"),
            )
        ]

    def _get_next_id(self) -> UUID:
        self._current_id += 1

        id_string = f"00000000-0000-0000-0000-{self._current_id:012d}"

        return UUID(id_string)

    def _get_next_menu_item_id(self) -> UUID:
        self._current_menu_item_id += 1

        id_string = f"00000000-0000-0000-0000-{self._current_menu_item_id:012d}"

        return UUID(id_string)

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
        self.restaurants.append(
            Restaurant(
                id=self._get_next_id(),
                **restaurant.model_dump(exclude={"id"}),
            )
        )

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

    def exists(self, restaurant_id: UUID) -> bool:
        return any(str(r.id) == str(restaurant_id) for r in self.restaurants)

    def create_menu_item(self, menu_item: MenuItem) -> None:
        self.menu_items.append(
            MenuItem(
                id=self._get_next_menu_item_id(),
                **menu_item.model_dump(exclude={"id"}),
            )
        )

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

    def get_menu_item_by_id(
        self,
        restaurant_id: UUID,
        menu_item_id: UUID,
    ) -> MenuItem:
        for item in self.menu_items:
            if str(item.restaurant_id) == str(restaurant_id) and str(item.id) == str(
                menu_item_id
            ):
                return item

        raise EntityNotFoundException("Menu item not found")
