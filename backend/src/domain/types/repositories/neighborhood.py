from abc import ABC, abstractmethod

from ...neighborhood import Neighborhood


class NeighborhoodRepository(ABC):
    @abstractmethod
    def list_(self) -> list[Neighborhood]:
        pass
