from src.domain.order import Order, OrderUser
from src.presentation.order import CreateOrderRequestDTO
from src.domain.types.repositories.order import OrderRepository


class OrderService:
    def __init__(self, repo: OrderRepository):
        self.repo = repo

    def create(self, request: CreateOrderRequestDTO) -> None:
        order: Order = Order.create(
            items=[],
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
