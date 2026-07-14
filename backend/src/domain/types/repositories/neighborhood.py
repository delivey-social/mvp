from abc import ABC, abstractmethod
from uuid import UUID

from ...neighborhood import Neighborhood


class NeighborhoodRepository(ABC):
    @abstractmethod
    def list_(self) -> list[Neighborhood]:
        pass

    @abstractmethod
    def create(self, neighborhood: Neighborhood) -> None:
        pass

    @abstractmethod
    def update(self, neighborhood: Neighborhood) -> None:
        pass

    @abstractmethod
    def delete(self, id: UUID) -> None:
        pass
