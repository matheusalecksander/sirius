/* istanbul ignore file */

export abstract class Repository {
  async create<T>(data: T): Promise<boolean> {
    return;
  }
}
