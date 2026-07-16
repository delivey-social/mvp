from uuid import UUID

from src.exceptions import EntityNotFoundException
from src.domain.neighborhood import Neighborhood
from src.domain.types.repositories.neighborhood import NeighborhoodRepository


class InMemoryNeighborhoodRepository(NeighborhoodRepository):
    def __init__(self):
        self._current_id = 0

        id = self._get_next_id()

        self._neighborhoods: list[Neighborhood] = [
            Neighborhood(
                id=id,
                name="Centro",
                base_price=500,
            ),
        ]

    def _get_next_id(self) -> UUID:
        self._current_id += 1

        id_string = f"00000000-0000-0000-0000-{self._current_id:012d}"

        return UUID(id_string)

    def list_(self) -> list[Neighborhood]:
        return self._neighborhoods

    def create(self, neighborhood: Neighborhood) -> None:
        self._neighborhoods.append(
            Neighborhood(
                id=self._get_next_id(),
                **neighborhood.model_dump(exclude={"id"}),
            )
        )

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

    def get_by_id(self, id: UUID) -> Neighborhood:
        for n in self._neighborhoods:
            if n.id == id:
                return n

        raise EntityNotFoundException(f"Neighborhood with id {id} not found.")
