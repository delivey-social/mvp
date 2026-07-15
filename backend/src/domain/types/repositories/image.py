from abc import ABC, abstractmethod
from pathlib import Path
from typing import IO


class ImageRepository(ABC):
    @abstractmethod
    async def save(self, image_bytes: IO[bytes], filename: str) -> Path: ...

    @abstractmethod
    async def delete(self, public_path: Path) -> None: ...
