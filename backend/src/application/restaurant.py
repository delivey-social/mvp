from uuid import UUID

from src.domain.types.repositories.restaurant import RestaurantRepository


class RestaurantService:
    def __init__(self, repo: RestaurantRepository):
        self.repo = repo

    def get_restaurant_by_id(self, id: UUID):
        return self.repo.get_restaurant_by_id(id)

    def list_menu_items(self, restaurant_id: UUID):
        return self.repo.list_menu_items(restaurant_id)
