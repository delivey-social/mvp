from uuid import UUID

from src.exceptions import InvalidReferenceException
from src.application.types.events import (
    OrderCreatedEvent,
    OrderDeliveringEvent,
    OrderFinishedEvent,
    OrderPaidEvent,
)

from src.types.order import CreateOrderRequestDTO, CreateOrderRequestItem

from src.domain.order import Order, OrderItem, OrderUser
from src.domain.types.repositories.order import OrderRepository

from src.application.neighborhood import NeighborhoodService
from src.application.restaurant import RestaurantService
from src.application.types.event_bus import EventBus


class OrderService:
    def __init__(
        self,
        repo: OrderRepository,
        restaurant_service: RestaurantService,
        neighborhood_service: NeighborhoodService,
        event_bus: EventBus,
    ):
        self.repo = repo
        self.restaurant_service = restaurant_service
        self.neighborhood_service = neighborhood_service
        self.event_bus = event_bus

    def create(self, request: CreateOrderRequestDTO) -> None:
        items = self._get_restaurant_items(request.restaurant_id, request.items)

        delivery_fee = self.neighborhood_service.get_delivery_fee(
            request.user.address.neighborhood_id
        )

        order: Order = Order.create(
            items=items,
            user=OrderUser(
                address=request.user.address.address,
                email=request.user.email,
                phone=request.user.phone,
            ),
            payment_method=request.payment_method,
            neighborhood_fee=delivery_fee,
            observation=request.observation,
            restaurant_id=request.restaurant_id,
        )

        self.event_bus.publish(OrderCreatedEvent, order)

        self.repo.create(order)

    def update(self, id: UUID, request: CreateOrderRequestDTO) -> None:
        items = self._get_restaurant_items(request.restaurant_id, request.items)

        delivery_fee = self.neighborhood_service.get_delivery_fee(
            request.user.address.neighborhood_id
        )

        self.repo.update(
            Order.create(
                id=id,
                items=items,
                user=OrderUser(
                    address=request.user.address.address,
                    email=request.user.email,
                    phone=request.user.phone,
                ),
                payment_method=request.payment_method,
                neighborhood_fee=delivery_fee,
                observation=request.observation,
                restaurant_id=request.restaurant_id,
            )
        )

    def _get_restaurant_items(
        self, restaurant_id: UUID, order_items: list[CreateOrderRequestItem]
    ) -> list[OrderItem]:
        restaurant_items = self.restaurant_service.get_menu_items_by_ids(
            restaurant_id, [item.product_id for item in order_items]
        )

        items: list[OrderItem] = []

        for item in order_items:
            restaurant_item = next(
                (ri for ri in restaurant_items if ri.id == item.product_id), None
            )

            if not restaurant_item:
                raise InvalidReferenceException(
                    f"Product with id {item.product_id} not found"
                )

            items.append(
                OrderItem(
                    product_id=item.product_id,
                    quantity=item.quantity,
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
