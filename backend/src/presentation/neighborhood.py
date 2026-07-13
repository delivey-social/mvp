from fastapi import APIRouter


class NeighborhoodRouter(APIRouter):
    def __init__(self):
        super().__init__(prefix="/neighborhood", tags=["Neighborhoods"])

        self.add_api_route("/", self.list_, methods=["GET"])

    def list_(self):

        return {"message": "List neighborhoods"}
