from dotenv import find_dotenv

from enum import Enum
from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class RepositoryType(str, Enum):
    InMemory = "inmemory"
    SQLAlchemy = "sqlalchemy"


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=find_dotenv(),
        env_file_encoding="utf-8",
    )

    repositories_type: RepositoryType = Field(
        default=RepositoryType.InMemory,
        validation_alias="REPO_TYPE",
    )


settings = Settings()
