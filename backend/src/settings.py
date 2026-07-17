from enum import Enum
from pydantic_settings import BaseSettings


class RepositoryType(Enum):
    InMemory = "inmemory"
    SQLAlchemy = "sqlalchemy"


class Settings(BaseSettings):
    repositories_type: RepositoryType = RepositoryType.InMemory


settings = Settings()
