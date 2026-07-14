from uuid import UUID

from fastapi import APIRouter

from src.application.restaurant import RestaurantService


class RestaurantRouter(APIRouter):
    def __init__(self, service: RestaurantService):
        self.service = service

        super().__init__(prefix="/restaurant", tags=["restaurants"])

        self.add_api_route(
            "/{id}",
            self.get_details,
            methods=["GET"],
        )

        self.add_api_route(
            "/{restaurant_id}/menu",
            self.list_menu_items,
            methods=["GET"],
        )

    async def get_details(self, id: UUID):
        return self.service.get_by_id(id)

    async def list_menu_items(self, restaurant_id: UUID):
        return self.service.list_menu_items(restaurant_id)
