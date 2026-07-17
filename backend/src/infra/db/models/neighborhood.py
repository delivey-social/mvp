from typing import Self
from uuid import UUID
from sqlalchemy.orm import Mapped, mapped_column

from src.domain.neighborhood import Neighborhood

from .base import Base


class NeighborhoodModel(Base):
    __tablename__ = "neighborhoods"

    id: Mapped[UUID] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(nullable=False)
    base_price: Mapped[int] = mapped_column(nullable=False)

    @classmethod
    def to_domain(cls, model: Self) -> Neighborhood:
        return Neighborhood(
            id=model.id,
            name=model.name,
            base_price=model.base_price,
        )

    @classmethod
    def from_domain(cls, neighborhood: Neighborhood) -> Self:
        return cls(
            id=neighborhood.id,
            name=neighborhood.name,
            base_price=neighborhood.base_price,
        )
