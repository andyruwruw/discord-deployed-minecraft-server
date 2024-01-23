// Types
import {
  MariaDbQuery,
  QueryConditions,
  QueryProjection,
  QuerySort,
  QueryUpdate,
} from '../types/database';

/**
 * Abstract Data Access Object
 */
export class DataAccessObject<T> {
  createTable(): Promise<void> {
    throw new Error('Used abstract DAO!');
  }

  clear(): Promise<void> {
    throw new Error('Used abstract DAO!');
  }

  delete(conditions: QueryConditions): Promise<number> {
    throw new Error('Used abstract DAO!');
  }

  deleteAll(): Promise<void> {
    throw new Error('Used abstract DAO!');
  }

  deleteById(id: string): Promise<boolean> {
    throw new Error('Used abstract DAO!');
  }

  dropTable(): Promise<void> {
    throw new Error('Used abstract DAO!');
  }

  find(
    conditions: QueryConditions = {},
    projection: QueryProjection = {},
    sort: QuerySort | null = null,
    offset: number = 0,
    limit: number = 20,
  ): Promise<T[]> {
    throw new Error('Used abstract DAO!');
  }

  findById(id: string): Promise<T | null> {
    throw new Error('Used abstract DAO!');
  }

  findOne(
    conditions: QueryConditions,
    projection: QueryProjection = {},
  ): Promise<T | null> {
    throw new Error('Used abstract DAO!');
  }

  insert(item: T): Promise<number> {
    throw new Error('Used abstract DAO!');
  }

  query(query: string | MariaDbQuery): Promise<any> {
    throw new Error('Used abstract DAO!');
  }

  update(
    conditions: QueryConditions,
    update: QueryUpdate,
  ): Promise<number> {
    throw new Error('Used abstract DAO!');
  }

  updateMany(
    filter: QueryConditions = {},
    update: QueryUpdate = {},
    insertNew = true,
  ): Promise<number> {
    throw new Error('Used abstract DAO!');
  }
}
