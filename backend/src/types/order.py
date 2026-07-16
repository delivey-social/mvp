from uuid import UUID
from pydantic import BaseModel, EmailStr

from src.domain.shared.phone_number import PhoneNumber
from src.domain.order import PaymentMethod


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
