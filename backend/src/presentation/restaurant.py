from uuid import UUID

from fastapi import APIRouter

from src.types.restaurant import CreateMenuItemRequestDTO, CreateRestaurantRequestDTO
from src.application.restaurant import RestaurantService


class RestaurantRouter(APIRouter):
    def __init__(self, service: RestaurantService):
        self.service = service

        super().__init__(prefix="/restaurant", tags=["restaurants"])
        menu_item_router = MenuItemRouter(service)

        self.include_router(menu_item_router)

        self.add_api_route(
            "/",
            self.list_,
            methods=["GET"],
        )
        self.add_api_route(
            "/{id}",
            self.get_details,
            methods=["GET"],
        )
        self.add_api_route(
            "/",
            self.create,
            methods=["POST"],
        )
        self.add_api_route(
            "/{id}",
            self.update,
            methods=["PUT"],
        )
        self.add_api_route(
            "/{id}",
            self.delete_,
            methods=["DELETE"],
        )

    async def get_details(self, id: UUID):
        return self.service.get_by_id(id)

    async def list_(self):
        return self.service.list_()

    async def create(self, request: CreateRestaurantRequestDTO):
        self.service.create(request)

        return {"message": "Restaurant created successfully"}

    async def update(self, id: UUID, request: CreateRestaurantRequestDTO):
        self.service.update(id, request)

        return {"message": "Restaurant updated successfully"}

    async def delete_(self, id: UUID):
        self.service.delete(id)

        return {"message": "Restaurant deleted successfully"}


class MenuItemRouter(APIRouter):
    def __init__(self, service: RestaurantService):
        self.service = service

        super().__init__(prefix="/{restaurant_id}/menu", tags=["menu-items"])

        self.add_api_route(
            "/",
            self.list_menu_items,
            methods=["GET"],
        )
        self.add_api_route(
            "/",
            self.create_menu_item,
            methods=["POST"],
        )

    async def list_menu_items(self, restaurant_id: UUID):
        return self.service.list_menu_items(restaurant_id)

    async def create_menu_item(
        self,
        restaurant_id: UUID,
        request: CreateMenuItemRequestDTO,
    ):
        self.service.create_menu_item(restaurant_id, request)

        return {"message": "Menu item created successfully"}
