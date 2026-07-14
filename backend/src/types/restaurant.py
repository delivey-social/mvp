from pydantic import BaseModel, Field


class CreateRestaurantRequestDTO(BaseModel):
    name: str = Field(..., min_length=3, max_length=100)
    address: str = Field(..., min_length=5, max_length=200)
    CNPJ: str = Field(..., min_length=14, max_length=14)


class CreateMenuItemRequestDTO(BaseModel):
    name: str = Field(..., min_length=3, max_length=100)
    description: str = Field(..., min_length=5, max_length=200)
    price: int = Field(..., gt=0)
    category: str = Field(..., min_length=3, max_length=50)
