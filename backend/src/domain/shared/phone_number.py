from pydantic import BaseModel, model_validator
from typing import Any


class PhoneNumber(BaseModel):
    ddd: str
    numero: str  # XXXX-XXXX or XXXXX-XXXX

    @model_validator(mode="before")
    @classmethod
    def validate_and_parse(cls, data: Any) -> Any:
        if isinstance(data, PhoneNumber):
            return data

        if isinstance(data, str):
            digits = "".join(filter(str.isdigit, data))

            if len(digits) not in (10, 11):
                raise ValueError(
                    "Número de telefone deve ter 10 ou 11 dígitos",
                )

            return {"ddd": digits[:2], "numero": digits[2:]}

        return data

    def __str__(self):
        return f"({self.ddd}) {self.numero}"
