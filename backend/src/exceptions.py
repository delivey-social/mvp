class DomainException(Exception):
    """
    Base class for domain exceptions.
    """

    pass


class EntityNotFoundException(DomainException):
    """
    Raised when an entity is not found in the repository.
    """

    pass


class InvalidStateException(DomainException):
    """
    Raised when an entity is in an invalid state for the requested operation.
    """

    pass
