from uuid import UUID
from pydantic import BaseModel, Field

from src.domain.neighborhood import Neighborhood


class NeighborhoodDTO(BaseModel):
    id: UUID
    name: str = Field(..., min_length=3, max_length=100)
    base_price: int = Field(..., gt=0)

    @classmethod
    def from_domain(cls, neighborhood: Neighborhood):
        return cls(
            id=neighborhood.id,
            name=neighborhood.name,
            base_price=neighborhood.base_price,
        )


class CreateNeighborhoodRequestDTO(BaseModel):
    name: str = Field(..., min_length=3, max_length=100)
    base_price: int = Field(..., gt=0)


class ListNeighborhoodsResponseDTO(BaseModel):
    neighborhoods: list[NeighborhoodDTO]
