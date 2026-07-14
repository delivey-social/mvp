from src.domain.neighborhood import Neighborhood
from src.domain.types.repositories.neighborhood import NeighborhoodRepository


class NeighborhoodService:
    def __init__(self, repo: NeighborhoodRepository):
        self.repo = repo

    def list_(self):
        return self.repo.list_()

    def create(self, neighborhood: Neighborhood) -> None:
        raise NotImplementedError("This method is not implemented yet.")

    def update(self, neighborhood: Neighborhood) -> None:
        raise NotImplementedError("This method is not implemented yet.")

    def delete(self, neighborhood_id: str) -> None:
        raise NotImplementedError("This method is not implemented yet.")
