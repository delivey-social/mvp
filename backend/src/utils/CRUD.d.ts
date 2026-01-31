export type CreateRequest<T> = Omit<T, "id">;
export type UpdateRequest<T> = Partial<CreateRequest<T>>;

export interface CRUDRepository<T> {
  create(data: CreateRequest<T>): Promise<T>;
  update(id: string, data: UpdateRequest<T>): Promise<T>;
  delete(id: string): Promise<boolean>;
  list(): Promise<T[]>;
  findById(id: string): Promise<T | null>;
}

export interface CRUDService<T> {
  create(data: CreateRequest<T>): Promise<T>;
  update(id: string, data: UpdateRequest<T>): Promise<T>;
  delete(id: string): Promise<boolean>;
  list(): Promise<T[]>;
  findById(id: string): Promise<T | null>;
}
