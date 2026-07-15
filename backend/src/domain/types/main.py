from dataclasses import dataclass
from typing import IO


@dataclass(frozen=True)
class FileData:
    filename: str
    content_type: str
    data: IO[bytes]
