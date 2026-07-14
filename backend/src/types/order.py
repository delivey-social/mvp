from uuid import UUID
from pydantic import BaseModel
from src.domain.order import PaymentMethod


class CreateOrderRequestItem(BaseModel):
    product_id: UUID
    quantity: int


class CreateOrderRequestUserDTO(BaseModel):
    email: str
    phone: str
    address: str


class CreateOrderRequestDTO(BaseModel):
    restaurant_id: UUID
    items: list[CreateOrderRequestItem]
    user: CreateOrderRequestUserDTO
    payment_method: PaymentMethod
    observation: str = ""
