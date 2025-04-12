export default class HTTPError extends Error {
  constructor(
    public readonly statusCode: number,
    message: string
  ) {
    super(message);
  }
}

export class ResourceNotFoundError extends HTTPError {
  constructor(resourceName?: string) {
    const message = resourceName
      ? `${resourceName} not found`
      : "Resource not found";
    super(404, message);
  }
}

export class BadRequestError extends HTTPError {
  constructor(message?: string) {
    const errorMessage = message ?? "Bad request";
    super(400, errorMessage);
  }
}
