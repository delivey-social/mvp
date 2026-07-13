from fastapi import APIRouter
from pydantic import BaseModel


class ChangeOpenRequestDTO(BaseModel):
    open: bool


class ConfigurationRouter(APIRouter):
    def __init__(self):
        self.open = False

        super().__init__(prefix="/config", tags=["Configuration"])

        self.add_api_route("/open", self.get_open, methods=["GET"])
        self.add_api_route("/open", self.change_open, methods=["PATCH"])

    def get_open(self):
        return {"open": self.open}

    def change_open(self, req: ChangeOpenRequestDTO):
        self.open = req.open

        return {"message": "Status changed successfully"}
