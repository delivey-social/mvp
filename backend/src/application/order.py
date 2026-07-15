from uuid import UUID

from src.application.types.events import (
    OrderCreatedEvent,
    OrderDeliveringEvent,
    OrderFinishedEvent,
    OrderPaidEvent,
)
from src.application.types.event_bus import EventBus
from src.domain.order import Order, OrderItem, OrderUser
from src.application.restaurant import RestaurantService
from src.types.order import CreateOrderRequestDTO
from src.domain.types.repositories.order import OrderRepository


class OrderService:
    def __init__(
        self,
        repo: OrderRepository,
        restaurant_service: RestaurantService,
        event_bus: EventBus,
    ):
        self.repo = repo
        self.restaurant_service = restaurant_service
        self.event_bus = event_bus

    def create(self, request: CreateOrderRequestDTO) -> None:
        items = self._get_restaurant_items(
            request.restaurant_id, [item.product_id for item in request.items]
        )

        order: Order = Order.create(
            items=items,
            user=OrderUser(
                address=request.user.address,
                email=request.user.email,
                phone=request.user.phone,
            ),
            payment_method=request.payment_method,
            neighborhood_fee=0,
            observation=request.observation,
        )

        self.event_bus.publish(OrderCreatedEvent, order)

        self.repo.create(order)

    def update(self, id: UUID, request: CreateOrderRequestDTO) -> None:
        items = self._get_restaurant_items(
            request.restaurant_id, [item.product_id for item in request.items]
        )

        self.repo.update(
            Order.create(
                id=id,
                items=items,
                user=OrderUser(
                    address=request.user.address,
                    email=request.user.email,
                    phone=request.user.phone,
                ),
                payment_method=request.payment_method,
                neighborhood_fee=0,
                observation=request.observation,
            )
        )

    def _get_restaurant_items(
        self, restaurant_id: UUID, product_ids: list[UUID]
    ) -> list[OrderItem]:
        restaurant_items = self.restaurant_service.get_menu_items_by_ids(
            restaurant_id, product_ids
        )

        items: list[OrderItem] = []

        for product_id in product_ids:
            restaurant_item = next(
                (ri for ri in restaurant_items if ri.id == product_id), None
            )

            if not restaurant_item:
                raise ValueError(f"Product with id {product_id} not found")

            items.append(
                OrderItem(
                    product_id=product_id,
                    quantity=1,  # Default quantity to 1 for this example
                    price=restaurant_item.price,
                )
            )

        return items

    def delete(self, order_id: UUID) -> None:
        self.repo.delete(order_id)

    def list_(self) -> list[Order]:
        return self.repo.list_()

    def get_by_id(self, order_id: UUID) -> Order:
        return self.repo.get_by_id(order_id)

    def order_paid(self, id: UUID) -> None:
        order = self.repo.get_by_id(id)

        self.repo.update(order.mark_as_paid())

        self.event_bus.publish(OrderPaidEvent, order)

    def order_ready_for_delivery(self, id: UUID) -> None:
        order = self.repo.get_by_id(id)

        self.repo.update(order.mark_as_ready())

        self.event_bus.publish(OrderDeliveringEvent, order)

    def order_finished(self, id: UUID) -> None:
        order = self.repo.get_by_id(id)

        self.repo.update(order.mark_as_finished())

        self.event_bus.publish(OrderFinishedEvent, order)
