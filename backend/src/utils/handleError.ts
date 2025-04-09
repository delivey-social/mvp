export default async function handleError<T>(
  promise: Promise<T>
): Promise<[undefined, T] | [Error]> {
  try {
    const res = await promise;
    return [undefined, res];
  } catch (error) {
    return [error as Error];
  }
}
