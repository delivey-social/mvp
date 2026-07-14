from uuid import UUID

from src.exceptions import EntityNotFoundException
from src.domain.neighborhood import Neighborhood
from src.domain.types.repositories.neighborhood import NeighborhoodRepository


class InMemoryNeighborhoodRepository(NeighborhoodRepository):
    def __init__(self):
        self._neighborhoods: list[Neighborhood] = [
            Neighborhood(name="Centro", base_price=500),
        ]

    def list_(self) -> list[Neighborhood]:
        return self._neighborhoods

    def create(self, neighborhood: Neighborhood) -> None:
        self._neighborhoods.append(neighborhood)

    def update(self, neighborhood: Neighborhood) -> None:
        for i, n in enumerate(self._neighborhoods):
            if n.id == neighborhood.id:
                self._neighborhoods[i] = neighborhood
                return

        raise EntityNotFoundException(
            f"Neighborhood with id {neighborhood.id} not found."
        )

    def delete(self, id: UUID) -> None:
        for i, n in enumerate(self._neighborhoods):
            if n.id == id:
                del self._neighborhoods[i]
                return

        raise EntityNotFoundException(f"Neighborhood with id {id} not found.")
