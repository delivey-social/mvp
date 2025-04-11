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
