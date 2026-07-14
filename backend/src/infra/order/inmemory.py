from uuid import UUID

from src.domain.order import Order
from src.domain.types.repositories.order import OrderRepository


class InMemoryOrderRepository(OrderRepository):
    def __init__(self):
        self.orders: list[Order] = []

    def create(self, order: Order) -> None:
        self.orders.append(order)

    def update(self, order: Order) -> None:
        for i, existing_order in enumerate(self.orders):
            if existing_order.id == order.id:
                self.orders[i] = order
                return
        raise ValueError(f"Order with id {order.id} not found.")

    def delete(self, id: UUID) -> None:
        self.orders = [order for order in self.orders if order.id != id]

    def list_(self) -> list[Order]:
        return self.orders

    def get_by_id(self, id: UUID) -> Order:
        for order in self.orders:
            if order.id == id:
                return order

        raise ValueError(f"Order with id {id} not found.")
