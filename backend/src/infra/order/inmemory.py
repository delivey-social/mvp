from uuid import UUID

from src.exceptions import EntityNotFoundException
from src.domain.order import Order
from src.domain.types.repositories.order import OrderRepository


class InMemoryOrderRepository(OrderRepository):
    def __init__(self):
        self._current_id = 0

        self.orders: list[Order] = []

    def _get_next_id(self) -> UUID:
        self._current_id += 1

        id_string = f"00000000-0000-0000-0000-{self._current_id:012d}"

        return UUID(id_string)

    def create(self, order: Order) -> None:
        self.orders.append(
            Order(
                id=self._get_next_id(),
                **order.model_dump(exclude={"id"}),
            )
        )

    def update(self, order: Order) -> None:
        for i, existing_order in enumerate(self.orders):
            if existing_order.id == order.id:
                self.orders[i] = order
                return

        raise EntityNotFoundException(f"Order with id {order.id} not found.")

    def delete(self, id: UUID) -> None:
        self.orders = [order for order in self.orders if order.id != id]

    def list_(self) -> list[Order]:
        return self.orders

    def get_by_id(self, id: UUID) -> Order:
        for order in self.orders:
            if order.id == id:
                return order

        raise EntityNotFoundException(f"Order with id {id} not found.")
