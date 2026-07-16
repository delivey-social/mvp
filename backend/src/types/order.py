from uuid import UUID
from pydantic import BaseModel, EmailStr

from src.domain.shared.phone_number import PhoneNumber
from src.domain.order import Order, OrderStatus, PaymentMethod


class CreateOrderRequestItem(BaseModel):
    product_id: UUID
    quantity: int


class CreateOrderRequestUserDTO(BaseModel):
    email: EmailStr
    phone: PhoneNumber
    address: str


class CreateOrderRequestDTO(BaseModel):
    restaurant_id: UUID
    items: list[CreateOrderRequestItem]
    user: CreateOrderRequestUserDTO
    payment_method: PaymentMethod
    observation: str = ""


class OrderResponseUserDTO(BaseModel):
    email: EmailStr
    phone: str
    address: str


class OrderResponseItemDTO(BaseModel):
    product_id: UUID
    quantity: int


class OrderResponseDTO(BaseModel):
    id: UUID
    items: list[OrderResponseItemDTO]
    user: OrderResponseUserDTO
    status: OrderStatus
    payment_method: PaymentMethod
    observation: str = ""

    items_total: int
    app_fee: int
    delivery_fee: int

    @classmethod
    def from_domain(cls, order: Order):
        return cls(
            id=order.id,
            items=[
                OrderResponseItemDTO(product_id=item.product_id, quantity=item.quantity)
                for item in order.items
            ],
            user=OrderResponseUserDTO(
                email=order.user.email,
                phone=str(order.user.phone),
                address=order.user.address,
            ),
            status=order.status,
            payment_method=order.payment_method,
            observation=order.observation,
            items_total=order.items_total,
            app_fee=order.app_fee,
            delivery_fee=order.delivery_fee,
        )
