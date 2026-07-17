from typing import Self
from uuid import UUID
from sqlalchemy import ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from src.domain.order import (
    Order,
    OrderItem,
    OrderStatus,
    OrderUser,
    PaymentMethod,
    PhoneNumber,
)

from .base import Base


class OrderModel(Base):
    __tablename__ = "orders"

    id: Mapped[UUID] = mapped_column(primary_key=True)
    restaurant_id: Mapped[UUID] = mapped_column(
        ForeignKey("restaurants.id", ondelete="CASCADE"),
        nullable=False,
    )
    items: Mapped[list["OrderItemModel"]] = relationship(
        "OrderItemModel",
        back_populates="order",
        cascade="all, delete-orphan",
    )
    status: Mapped[str] = mapped_column(
        String(50),
        nullable=False,
    )
    payment_method: Mapped[str] = mapped_column(
        String(50),
        nullable=False,
    )
    items_total: Mapped[int] = mapped_column(nullable=False)
    app_fee: Mapped[int] = mapped_column(nullable=False)
    delivery_fee: Mapped[int] = mapped_column(nullable=False)
    observation: Mapped[str] = mapped_column(String(200))

    user_email: Mapped[str] = mapped_column(String(100), nullable=False)
    user_phone: Mapped[str] = mapped_column(String(20), nullable=False)
    user_address: Mapped[str] = mapped_column(String(200), nullable=False)

    @classmethod
    def from_domain(cls, order: Order) -> Self:
        return cls(
            id=order.id,
            restaurant_id=order.restaurant_id,
            status=order.status.value,
            payment_method=order.payment_method.value,
            items_total=order.items_total,
            app_fee=order.app_fee,
            delivery_fee=order.delivery_fee,
            observation=order.observation,
            user_email=order.user.email,
            user_phone=str(order.user.phone),
            user_address=order.user.address,
        )

    @classmethod
    def to_domain(cls, order_model: Self) -> Order:
        return Order(
            id=order_model.id,
            restaurant_id=order_model.restaurant_id,
            status=OrderStatus(order_model.status),
            payment_method=PaymentMethod(order_model.payment_method),
            items_total=order_model.items_total,
            app_fee=order_model.app_fee,
            delivery_fee=order_model.delivery_fee,
            observation=order_model.observation,
            items=[OrderItemModel.to_domain(item) for item in order_model.items],
            user=OrderUser(
                email=order_model.user_email,
                phone=PhoneNumber.from_string(order_model.user_phone),
                address=order_model.user_address,
            ),
        )


class OrderItemModel(Base):
    __tablename__ = "order_items"

    order_id: Mapped[UUID] = mapped_column(
        ForeignKey("orders.id", ondelete="CASCADE"),
        primary_key=True,
    )

    product_id: Mapped[UUID] = mapped_column(
        ForeignKey("menu_items.id"),
        primary_key=True,
    )
    price_snapshot: Mapped[int] = mapped_column(nullable=False)
    quantity: Mapped[int] = mapped_column(nullable=False)

    order: Mapped["OrderModel"] = relationship("OrderModel", back_populates="items")

    @classmethod
    def from_domain(cls, order_id: UUID, item: OrderItem) -> Self:
        return cls(
            order_id=order_id,
            product_id=item.product_id,
            price_snapshot=item.price,
            quantity=item.quantity,
        )

    @classmethod
    def to_domain(cls, item: Self) -> OrderItem:
        return OrderItem(
            product_id=item.product_id,
            price=item.price_snapshot,
            quantity=item.quantity,
        )
