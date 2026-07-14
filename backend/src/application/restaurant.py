from uuid import UUID

from src.types.restaurant import CreateRestaurantRequestDTO, CreateMenuItemRequestDTO
from src.domain.restaurant import MenuItem, Restaurant
from src.domain.types.repositories.restaurant import RestaurantRepository


class RestaurantService:
    def __init__(self, repo: RestaurantRepository):
        self.repo = repo

    def get_by_id(self, id: UUID):
        return self.repo.get_restaurant_by_id(id)

    def create(self, restaurant: CreateRestaurantRequestDTO) -> None:
        self.repo.create(
            Restaurant(
                name=restaurant.name,
                address=restaurant.address,
                CNPJ=restaurant.CNPJ,
            )
        )

    def update(self, id: UUID, restaurant: CreateRestaurantRequestDTO) -> None:
        self.repo.update(
            Restaurant(
                id=id,
                address=restaurant.address,
                name=restaurant.name,
                CNPJ=restaurant.CNPJ,
            )
        )

    def delete(self, id: UUID) -> None:
        self.repo.delete(id)

    def list_(self) -> list[Restaurant]:
        return self.repo.list_()

    def list_menu_items(self, restaurant_id: UUID):
        return self.repo.list_menu_items(restaurant_id)

    def create_menu_item(
        self,
        restaurant_id: UUID,
        request: CreateMenuItemRequestDTO,
    ) -> None:
        self.repo.create_menu_item(
            MenuItem(
                restaurant_id=restaurant_id,
                name=request.name,
                description=request.description,
                price=request.price,
                category=request.category,
            )
        )

    def update_menu_item(
        self,
        id: UUID,
        restaurant_id: UUID,
        request: CreateMenuItemRequestDTO,
    ) -> None:
        self.repo.update_menu_item(
            MenuItem(
                id=id,
                restaurant_id=restaurant_id,
                name=request.name,
                description=request.description,
                price=request.price,
                category=request.category,
            )
        )

    def delete_menu_item(self, id: UUID, restaurant_id: UUID) -> None:
        self.repo.delete_menu_item(id, restaurant_id)

    def get_menu_items_by_ids(
        self,
        restaurant_id: UUID,
        ids: list[UUID],
    ) -> list[MenuItem]:
        return self.repo.get_menu_items_by_ids(restaurant_id, ids)
