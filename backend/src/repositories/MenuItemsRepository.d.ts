export interface MenuItemsRepository {
  findById: (id: string) => Promise<MenuItem | null>;
  getAll: () => Promise<MenuItem[]>;
}
