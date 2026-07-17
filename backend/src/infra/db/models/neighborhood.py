from uuid import UUID
from sqlalchemy.orm import Mapped, mapped_column

from .base import Base


class NeighborhoodModel(Base):
    __tablename__ = "neighborhoods"

    id: Mapped[UUID] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(nullable=False)
    base_price: Mapped[int] = mapped_column(nullable=False)
