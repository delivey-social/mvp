from uuid import UUID

from pydantic import BaseModel, Field

from src.domain.restaurant import Restaurant
from src.domain.shared.cnpj import CNPJ


class RestaurantDTO(BaseModel):
    id: UUID
    name: str
    address: str
    cnpj: str

    @classmethod
    def from_domain(cls, restaurant: Restaurant):
        return cls(
            id=restaurant.id,
            name=restaurant.name,
            address=restaurant.address,
            cnpj=str(restaurant.CNPJ),
        )


class CreateRestaurantRequestDTO(BaseModel):
    name: str = Field(..., min_length=3, max_length=100)
    address: str = Field(..., min_length=5, max_length=200)
    CNPJ: CNPJ


class CreateMenuItemRequestDTO(BaseModel):
    name: str = Field(..., min_length=3, max_length=100)
    description: str = Field(..., min_length=5, max_length=200)
    price: int = Field(..., gt=0)
    category: str = Field(..., min_length=3, max_length=50)


class ListRestaurantResponseDTO(BaseModel):
    restaurants: list[RestaurantDTO]
