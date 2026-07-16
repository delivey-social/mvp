from abc import ABC, abstractmethod
from uuid import UUID

from ...neighborhood import Neighborhood


class NeighborhoodRepository(ABC):
    @abstractmethod
    def list_(self) -> list[Neighborhood]: ...

    @abstractmethod
    def create(self, neighborhood: Neighborhood) -> None: ...

    @abstractmethod
    def update(self, neighborhood: Neighborhood) -> None: ...

    @abstractmethod
    def delete(self, id: UUID) -> None: ...

    @abstractmethod
    def get_by_id(self, id: UUID) -> Neighborhood: ...
