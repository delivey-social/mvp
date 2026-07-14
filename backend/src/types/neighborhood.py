from pydantic import BaseModel, Field


class CreateNeighborhoodRequestDTO(BaseModel):
    name: str = Field(..., min_length=3, max_length=100)
    base_price: int = Field(..., gt=0)
