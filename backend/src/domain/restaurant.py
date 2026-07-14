from uuid import UUID, uuid4

from pydantic import BaseModel, Field


class MenuItem(BaseModel):
    id: UUID = Field(default_factory=uuid4)
    restaurant_id: UUID
    name: str = Field(..., min_length=3, max_length=100)
    description: str = Field(..., min_length=3, max_length=500)
    price: int = Field(..., gt=0)
    category: str = Field(..., min_length=3, max_length=50)


class Restaurant(BaseModel):
    id: UUID = Field(default_factory=uuid4)
    name: str = Field(..., min_length=3, max_length=100)
    address: str = Field(..., min_length=5, max_length=200)
    CNPJ: str
