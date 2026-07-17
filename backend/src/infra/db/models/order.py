from uuid import UUID
from sqlalchemy import ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

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
