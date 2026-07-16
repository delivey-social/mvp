from uuid import UUID

from src.types.neighborhood import CreateNeighborhoodRequestDTO
from src.domain.neighborhood import Neighborhood
from src.domain.types.repositories.neighborhood import NeighborhoodRepository


class NeighborhoodService:
    def __init__(self, repo: NeighborhoodRepository):
        self.repo = repo

    def list_(self):
        return self.repo.list_()

    def create(self, neighborhood: CreateNeighborhoodRequestDTO) -> None:
        self.repo.create(
            Neighborhood(
                name=neighborhood.name,
                base_price=neighborhood.base_price,
            )
        )

    def update(self, id: UUID, neighborhood: CreateNeighborhoodRequestDTO) -> None:
        self.repo.update(
            Neighborhood(
                id=id,
                name=neighborhood.name,
                base_price=neighborhood.base_price,
            )
        )

    def delete(self, id: UUID) -> None:
        self.repo.delete(id)

    def get_delivery_fee(self, id: UUID) -> int:
        neighborhood = self.repo.get_by_id(id)

        if not neighborhood:
            raise ValueError("Neighborhood not found")

        return neighborhood.base_price
