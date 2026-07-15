from pydantic import BaseModel
from src.exceptions import InvalidValueException


class CNPJ(BaseModel):
    numero: str

    def __post_init__(self):
        digits = self.numero.replace(".", "").replace("/", "").replace("-", "")

        object.__setattr__(self, "numero", digits)
        self._validate(digits)

    def _validate(self, digits: str):
        if len(digits) != 14:
            raise InvalidValueException(
                digits,
                "CNPJ deve conter 14 dígitos",
            )

        if not digits.isdigit():
            raise InvalidValueException(
                digits,
                "CNPJ deve conter apenas números",
            )
