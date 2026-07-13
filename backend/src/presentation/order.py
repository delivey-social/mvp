from uuid import UUID

from fastapi import APIRouter

from pydantic import BaseModel

from src.domain.order import PaymentMethod
from src.application.order import OrderService


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


class OrderRouter(APIRouter):
    def __init__(self, service: OrderService):
        self.service = service

        super().__init__(prefix="/order", tags=["Orders"])

        self.add_api_route("/", self.create, methods=["POST"])

    def create(self, request: CreateOrderRequestDTO):
        self.service.create(request)
