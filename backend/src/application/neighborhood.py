from src.domain.types.repositories.neighborhood import NeighborhoodRepository


class NeighborhoodService:
    def __init__(self, repo: NeighborhoodRepository):
        self.repo = repo

    def list_(self):
        return self.repo.list_()
