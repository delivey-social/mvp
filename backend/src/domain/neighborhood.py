from uuid import UUID, uuid4

from pydantic import BaseModel, Field


class Neighborhood(BaseModel):
    id: UUID = Field(default_factory=uuid4)
    name: str = Field(..., min_length=3, max_length=100)
    base_price: int = Field(..., gt=0)
