from pydantic import RootModel
from pydantic.functional_validators import field_validator


class CNPJ(RootModel[str]):
    root: str

    @field_validator("root")
    @classmethod
    def validate_cnpj(cls, value: str) -> str:
        digits = "".join(filter(str.isdigit, value))

        if len(digits) != 14:
            raise ValueError("CNPJ deve conter 14 dígitos")

        return digits

    def __str__(self):
        return self.root
