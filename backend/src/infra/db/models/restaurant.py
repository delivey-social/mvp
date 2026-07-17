from uuid import UUID
from sqlalchemy import String, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column

from .base import Base


class RestaurantModel(Base):
    __tablename__ = "restaurants"

    id: Mapped[UUID] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    address: Mapped[str] = mapped_column(String(200), nullable=False)
    cnpj: Mapped[str] = mapped_column(String(14), nullable=False, unique=True)


class MenuItemModel(Base):
    __tablename__ = "menu_items"

    id: Mapped[UUID] = mapped_column(primary_key=True)
    restaurant_id: Mapped[UUID] = mapped_column(
        ForeignKey("restaurants.id", ondelete="CASCADE"),
        nullable=False,
    )
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    description: Mapped[str] = mapped_column(String(200), nullable=True)
    price: Mapped[float] = mapped_column(nullable=False)
    category: Mapped[str] = mapped_column(String(50), nullable=True)
    image_path: Mapped[str] = mapped_column(String(200), nullable=True)
