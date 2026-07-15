from enum import Enum
from typing import Self
from uuid import UUID, uuid4

from pydantic import BaseModel, Field, EmailStr
from pydantic.config import ConfigDict


class OrderItem(BaseModel):
    product_id: UUID
    price: int = Field(gt=0)
    quantity: int = Field(gt=0)


class OrderUser(BaseModel):
    email: EmailStr
    phone: str
    address: str


class OrderStatus(Enum):
    WAITING_PAYMENT = "WAITING_PAYMENT"
    PREPARING = "PREPARING"
    READY_FOR_DELIVERY = "READY_FOR_DELIVERY"
    FINISHED = "FINISHED"


class PaymentMethod(Enum):
    PIX = "PIX"
    CREDIT_CARD = "CREDIT_CARD"
    DEBIT_CARD = "DEBIT_CARD"


class Order(BaseModel):
    model_config = ConfigDict(frozen=True)

    id: UUID = Field(default_factory=uuid4)
    items: list[OrderItem]
    user: OrderUser
    status: OrderStatus = Field(default=OrderStatus.WAITING_PAYMENT)
    payment_method: PaymentMethod
    items_total: int
    app_fee: int
    delivery_fee: int
    observation: str = Field(default="")

    @property
    def total(self) -> int:
        return self.items_total + self.app_fee + self.delivery_fee

    @classmethod
    def create(
        cls,
        items: list[OrderItem],
        user: OrderUser,
        payment_method: PaymentMethod,
        neighborhood_fee: int,
        observation: str = "",
        id: UUID | None = None,
    ) -> Self:
        items_total = sum(item.price * item.quantity for item in items)
        app_fee = items_total // 10
        delivery_fee = neighborhood_fee

        return cls(
            items=items,
            user=user,
            payment_method=payment_method,
            observation=observation,
            items_total=items_total,
            app_fee=app_fee,
            delivery_fee=delivery_fee,
            id=id or uuid4(),
        )

    def mark_as_paid(self) -> Self:
        if self.status != OrderStatus.WAITING_PAYMENT:
            raise ValueError("Order is not in a state that can be marked as paid")

        return self.model_copy(update={"status": OrderStatus.PREPARING})

    def mark_as_ready(self) -> Self:
        if self.status != OrderStatus.PREPARING:
            raise ValueError("Order is not in a state that can be marked as ready")

        return self.model_copy(update={"status": OrderStatus.READY_FOR_DELIVERY})

    def mark_as_finished(self) -> Self:
        if self.status != OrderStatus.READY_FOR_DELIVERY:
            raise ValueError("Order is not in a state that can be marked as finished")

        return self.model_copy(update={"status": OrderStatus.FINISHED})
