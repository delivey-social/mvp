from abc import ABC, abstractmethod

from src.domain.order import Order


class OrderRepository(ABC):
    @abstractmethod
    def create(self, order: Order) -> None:
        pass