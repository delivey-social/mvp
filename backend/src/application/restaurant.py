from pathlib import Path
from uuid import UUID, uuid4


from src.types.restaurant import CreateRestaurantRequestDTO, CreateMenuItemRequestDTO

from src.infra.image.disk import ImageRepository

from src.domain.restaurant import MenuItem, Restaurant
from src.domain.types.repositories.restaurant import RestaurantRepository
from src.domain.types.main import FileData


class RestaurantService:
    def __init__(
        self,
        repo: RestaurantRepository,
        image_repo: ImageRepository,
    ):
        self.repo = repo
        self.image_repo = image_repo

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

    async def create_menu_item(
        self,
        restaurant_id: UUID,
        request: CreateMenuItemRequestDTO,
        image: FileData,
    ) -> None:
        image_id = uuid4()

        image_path = Path(str(image_id), image.filename)
        path = await self.image_repo.save(image.data, image_path)

        self.repo.create_menu_item(
            MenuItem(
                restaurant_id=restaurant_id,
                name=request.name,
                description=request.description,
                price=request.price,
                category=request.category,
                image_path=path,
            )
        )

    async def update_menu_item(
        self,
        id: UUID,
        restaurant_id: UUID,
        request: CreateMenuItemRequestDTO,
        image: FileData,
    ) -> None:
        menu_item = self.repo.get_menu_item_by_id(restaurant_id, id)

        await self.image_repo.delete(menu_item.image_path)

        image_id = uuid4()
        image_path = Path(str(image_id), image.filename)
        path = await self.image_repo.save(image.data, image_path)

        self.repo.update_menu_item(
            MenuItem(
                id=id,
                restaurant_id=restaurant_id,
                name=request.name,
                description=request.description,
                price=request.price,
                category=request.category,
                image_path=path,
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
