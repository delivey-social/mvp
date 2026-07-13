from src.domain.neighborhood import Neighborhood
from src.domain.types.repositories.neighborhood import NeighborhoodRepository


class InMemoryNeighborhoodRepository(NeighborhoodRepository):
    def __init__(self):
        self._neighborhoods: list[Neighborhood] = [
            Neighborhood(name="Centro", base_price=500),
        ]

    def list_(self) -> list[Neighborhood]:
        return self._neighborhoods
