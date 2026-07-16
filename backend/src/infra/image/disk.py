from pathlib import Path
import shutil
from typing import IO

from src.domain.types.repositories.image import ImageRepository


class DiskImageRepository(ImageRepository):
    def __init__(self, base_dir: str):
        self.base_dir = Path(base_dir)

        self.base_dir.mkdir(parents=True, exist_ok=True)

    async def save(self, image_bytes: IO[bytes], relative_path: Path) -> Path:
        file_path = self.base_dir / relative_path

        file_path.parent.mkdir(parents=True, exist_ok=True)

        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(image_bytes, buffer)

        return relative_path

    async def delete(self, relative_path: Path):
        file_path = self.base_dir / relative_path

        if file_path.exists():
            file_path.unlink()

    async def replace(
        self, image_bytes: IO[bytes], relative_path: Path, new_filename: str
    ):

        await self.delete(relative_path)

        new_relative_path = relative_path.parent / new_filename

        return await self.save(image_bytes, new_relative_path)
