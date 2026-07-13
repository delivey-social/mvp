from fastapi import APIRouter

from src.application.neighborhood import NeighborhoodService


class NeighborhoodRouter(APIRouter):
    def __init__(self, service: NeighborhoodService):
        super().__init__(prefix="/neighborhood", tags=["Neighborhoods"])

        self.add_api_route("/", self.list_, methods=["GET"])
        self.service = service

    def list_(self):
        neighborhoods = self.service.list_()

        return {"neighborhoods": neighborhoods}
