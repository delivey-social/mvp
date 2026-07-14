from uuid import UUID

from src.application.restaurant import RestaurantService
from src.domain.order import Order, OrderItem, OrderUser
from src.presentation.order import CreateOrderRequestDTO
from src.domain.types.repositories.order import OrderRepository


class OrderService:
    def __init__(self, repo: OrderRepository, restaurant_service: RestaurantService):
        self.repo = repo
        self.restaurant_service = restaurant_service

    def create(self, request: CreateOrderRequestDTO) -> None:
        restaurant_items = self.restaurant_service.get_menu_items_by_ids(
            request.restaurant_id, [item.product_id for item in request.items]
        )

        items: list[OrderItem] = []

        for item in request.items:
            restaurant_item = next(
                (ri for ri in restaurant_items if ri.id == item.product_id), None
            )

            if not restaurant_item:
                raise ValueError(f"Product with id {item.product_id} not found")

            items.append(
                OrderItem(
                    product_id=item.product_id,
                    quantity=item.quantity,
                    price=restaurant_item.price,
                )
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

        self.repo.create(order)

    def update(self, order: Order) -> None:
        self.repo.update(order)

    def delete(self, order_id: UUID) -> None:
        self.repo.delete(order_id)

    def list_(self) -> list[Order]:
        return self.repo.list_()

    def get_by_id(self, order_id: UUID) -> Order:
        return self.repo.get_by_id(order_id)
