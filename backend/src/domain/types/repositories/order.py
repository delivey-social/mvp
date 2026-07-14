from abc import ABC, abstractmethod
from uuid import UUID

from src.domain.order import Order


class OrderRepository(ABC):
    @abstractmethod
    def create(self, order: Order) -> None:
        pass

    @abstractmethod
    def update(self, order: Order) -> None:
        pass

    @abstractmethod
    def delete(self, id: UUID) -> None:
        pass

    @abstractmethod
    def list_(self) -> list[Order]:
        pass

    @abstractmethod
    def get_by_id(self, id: UUID) -> Order:
        pass
