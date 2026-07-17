from pathlib import Path
from typing import Self
from uuid import UUID
from sqlalchemy import String, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column

from src.domain.restaurant import CNPJ, MenuItem, Restaurant

from .base import Base


class RestaurantModel(Base):
    __tablename__ = "restaurants"

    id: Mapped[UUID] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    address: Mapped[str] = mapped_column(String(200), nullable=False)
    cnpj: Mapped[str] = mapped_column(String(14), nullable=False, unique=True)

    @classmethod
    def from_domain(cls, restaurant: Restaurant) -> Self:
        return cls(
            id=restaurant.id,
            name=restaurant.name,
            address=restaurant.address,
            cnpj=str(restaurant.CNPJ),
        )

    @classmethod
    def to_domain(cls, restaurant_model: Self) -> Restaurant:
        return Restaurant(
            id=restaurant_model.id,
            name=restaurant_model.name,
            address=restaurant_model.address,
            CNPJ=CNPJ(restaurant_model.cnpj),
        )


class MenuItemModel(Base):
    __tablename__ = "menu_items"

    id: Mapped[UUID] = mapped_column(primary_key=True)
    restaurant_id: Mapped[UUID] = mapped_column(
        ForeignKey("restaurants.id", ondelete="CASCADE"),
        nullable=False,
    )
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    description: Mapped[str] = mapped_column(String(200), nullable=True)
    price: Mapped[int] = mapped_column(nullable=False)
    category: Mapped[str] = mapped_column(String(50), nullable=True)
    image_path: Mapped[str] = mapped_column(String(200), nullable=True)

    @classmethod
    def from_domain(cls, menu_item: MenuItem) -> Self:
        return cls(
            id=menu_item.id,
            restaurant_id=menu_item.restaurant_id,
            name=menu_item.name,
            description=menu_item.description,
            price=menu_item.price,
            category=menu_item.category,
            image_path=str(menu_item.image_path),
        )

    @classmethod
    def to_domain(cls, menu_item_model: Self) -> MenuItem:
        return MenuItem(
            id=menu_item_model.id,
            restaurant_id=menu_item_model.restaurant_id,
            name=menu_item_model.name,
            description=menu_item_model.description,
            price=menu_item_model.price,
            category=menu_item_model.category,
            image_path=Path(menu_item_model.image_path),
        )
