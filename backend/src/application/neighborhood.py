from uuid import UUID

from src.domain.neighborhood import Neighborhood
from src.domain.types.repositories.neighborhood import NeighborhoodRepository


class NeighborhoodService:
    def __init__(self, repo: NeighborhoodRepository):
        self.repo = repo

    def list_(self):
        return self.repo.list_()

    def create(self, neighborhood: Neighborhood) -> None:
        self.repo.create(neighborhood)

    def update(self, neighborhood: Neighborhood) -> None:
        self.repo.update(neighborhood)

    def delete(self, id: UUID) -> None:
        self.repo.delete(id)
