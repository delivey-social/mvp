from src.domain.order import Order
from src.domain.types.repositories.order import OrderRepository


class InMemoryOrderRepository(OrderRepository):
    def __init__(self):
        self.orders: list[Order] = []

    def create(self, order: Order) -> None:
        self.orders.append(order)
