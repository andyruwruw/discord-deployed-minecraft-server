// Packages
import { v4 as uuidv4 } from 'uuid';

// Types
import {
  DatabaseColumnTypes,
  MariaDbQuery,
  QueryConditions,
  QueryProjection,
  QuerySort,
  QueryUpdate,
} from '../../../types/database';

/**
 * Applies a projection to a set of items.
 *
 * @param {any[]} items Items to apply projection to.
 * @param {QueryProjection} projection Projection to be applied.
 * @returns {Record<string, DatabaseColumnTypes>[]} Items with applied projection.
 */
const applyProjection = (
  items: any[],
  projection: QueryProjection,
): Record<string, DatabaseColumnTypes>[] => {
  const projectedItems = [] as Record<string, DatabaseColumnTypes>[];
  const fields = Object.keys(projection);

  if (fields.length === 0) {
    return items as unknown as Record<string, DatabaseColumnTypes>[];
  }

  for (let i = 0; i < items.length; i += 1) {
    const item = items[i] as unknown as Record<string, DatabaseColumnTypes>;
    const projectedItem = {} as Record<string, DatabaseColumnTypes>;

    for (let j = 0; j < fields.length; j += 1) {
      const field = fields[j];

      projectedItem[fields[j]] = item[field] as DatabaseColumnTypes;
    }

    projectedItems.push(projectedItem);
  }

  return projectedItems;
};

/**
 * Abstract class for Data Access Objects.
 */
export class DataAccessObject<T> {
  /**
   * Cache storage for the DataAccessObject.
   */
  _items: T[];

  constructor() {
    this._items = [];
  }

  /**
   * Creates a new instance of the item in the Database.
   *
   * @param {T} options The item to create.
   * @returns {T} The created item.
   */
  async _create(options: T): Promise<T> {
    const entry = {
      _id: uuidv4(),
      ...options,
    };

    this._items.push(entry);

    return entry;
  }

  /**
   * Finds one item in the Database.
   *
   * @param {QueryConditions} filter The filter to apply to the query.
   * @param {QueryProjection} projection The projection to apply to the query.
   * @returns {Promise<T | null>} The item.
   */
  async findOne(
    filter: QueryConditions = {},
    projection: QueryProjection = {},
  ): Promise<T | null> {
    const items = this._findFilterItems(filter);
    const projectedItems = applyProjection(
      items,
      projection,
    ) as unknown as T[];

    return projectedItems[0] || null;
  }

  /**
   * Pain.
   */
  async query(query: string | MariaDbQuery): Promise<any> {
    return null;
  }

  /**
   * Not needed.
   */
  async createTable(): Promise<void> {
    return;
  }

  /**
   * Not needed.
   */
  async dropTable(): Promise<void> {
    return;
  }

  /**
   * Deletes all items from the Database.
   */
  async deleteAll(): Promise<void> {
    this._items = [];
  }

  /**
   * Creates a new instance of the item in the Database.
   *
   * @param {T} options The item to create.
   * @returns {T} The created item.
   */
  async insert(item: T): Promise<number> {
    await this._create(item);

    return 1;
  }

  /**
   * Retrieves default sort value.
   *
   * @returns {Record<string, number>} Sort method.
   */
  _getSort() {
    return {};
  }

  /**
   * Finds all of the item in the Database.
   *
   * @param {QueryConditions} filter The filter to apply to the query.
   * @param {QueryProjection} projection The projection to apply to the query.
   * @returns {Promise<T[]>} The items.
   */
  async find(
    filter: QueryConditions = {},
    projection: QueryProjection = {},
    sort: QuerySort | null = null,
    offset = 0,
    limit = 20,
  ): Promise<T[]> {
    const items = this._findFilterItems(
      filter,
      sort ? sort : this._getSort(),
      offset,
      limit,
    );
    const projectedItems = applyProjection(
      items,
      projection,
    ) as unknown as T[];

    return projectedItems;
  }

  /**
   * Finds an item by it's id from the Database.
   *
   * @param {string} id The id of the item.
   * @returns {Promise<T | null>} The item or null if not found.
   */
  async findById(id: string): Promise<T | null> {
    const items = this._findFilterItems({
      id,
    });

    if (items.length === 0) {
      return null;
    }
    return items[0];
  }

  /**
   * Deletes all items or a subset of items from the Database.
   *
   * @param {QueryConditions} filter The filter to apply to the query.
   * @returns {Promise<number>} The number of items deleted.
   */
  async delete(filter: QueryConditions = {}): Promise<number> {
    const deleteItems = this._findFilterItems(filter);
    const deleteIds = deleteItems.map((item) => {
      if ('id' in (item as unknown as Record<string, any>)) {
        return (item as unknown as Record<string, string>).id;
      }
      return 'unknown id';
    });

    this._items = this._items.filter((item) => {
      if ('id' in (item as unknown as Record<string, any>)) {
        return !(deleteIds.includes((item as unknown as Record<string, string>).id));
      }
      return true;
    });

    return deleteItems.length;
  }

  /**
   * Deletes a single item by its id from the Database.
   *
   * @param {string} id The id of the item.
   * @returns {Promise<boolean>} Whether the item was deleted.
   */
  async deleteById(id: string): Promise<boolean> {
    return (await this.delete({ id })) > 0;
  }

  /**
   * Updates one item in the Database matching the filter.
   *
   * @param {QueryConditions} filter
   * @param {QueryUpdate} update
   * @param {boolean} insertNew
   * @returns {Promise<boolean>} Whether the item was updated.
   */
  async updateOne(
    filter: QueryConditions = {},
    update: QueryUpdate = {},
    insertNew = true,
  ): Promise<boolean> {
    const items = this._findFilterItems(filter);
    const itemIds = items.map((item) => {
      if ('id' in (item as unknown as Record<string, any>)) {
        return (item as unknown as Record<string, string>).id;
      }
      return 'unknown id';
    });

    if (itemIds.length === 0 && insertNew) {
      try {
        // Risky, but don't have many other options from the Abstract class.
        await this._create(update as unknown as T);

        return true;
      } catch (error) {
        return false;
      }
    }

    for (let i = 0; i < this._items.length; i += 1) {
      const itemId = (this._items[i] as unknown as Record<string, string>).id;
      if (itemIds.includes(itemId)) {
        this._updateItem(
          i,
          update,
        );
        return true;
      }
    }
    return false;
  }

  /**
   * Updates one item in the Database matching the filter.
   *
   * @param {QueryConditions} filter
   * @param {QueryUpdate} update
   * @param {boolean} insertNew
   * @returns {Promise<boolean>} Whether the item was updated.
   */
  async update(
    conditions: QueryConditions = {},
    update: QueryUpdate = {},
  ): Promise<number> {
    return this.updateMany(
      conditions,
      update,
      false,
    );
  }

  /**
   * Updates all items in the Database matching the filter.
   *
   * @param {QueryConditions} filter
   * @param {QueryUpdate} update
   * @param {boolean} insertNew
   * @returns {Promise<number>} The number of documents updated.
   */
  async updateMany(
    filter: QueryConditions = {},
    update: QueryUpdate = {},
    insertNew = true,
  ): Promise<number> {
    const items = this._findFilterItems(filter);
    const itemIds = items.map((item) => {
      if ('id' in (item as unknown as Record<string, any>)) {
        return (item as unknown as Record<string, string>).id;
      }
      return 'unknown id';
    });

    if (itemIds.length === 0 && insertNew) {
      try {
        // Risky, but don't have many other options from the Abstract class.
        await this._create(update as unknown as T);

        return 1;
      } catch (error) {
        return 0;
      }
    }

    let updatedCount = 0;

    for (let i = 0; i < this._items.length; i += 1) {
      const itemId = (this._items[i] as unknown as Record<string, string>).id;

      if (itemIds.includes(itemId)) {
        this._updateItem(
          i,
          update,
        );

        updatedCount += 1;
      }
    }

    return updatedCount;
  }

  /**
   * Clears all items from the table.
   *
   * @returns {Promise<void>} Promise of the action.
   */
  async clear(): Promise<void> {
    this._items = [];
  }

  /**
   * Applies filter to items.
   *
   * @param {QueryConditions} filter Filter to be applied.
   * @param {number} offset Number of items to skip.
   * @returns {T[]} The filtered items.
   */
  _findFilterItems(
    filter: QueryConditions,
    sort: QuerySort | null = null,
    offset: number = 0,
    limit: number = 20,
  ): T[] {
    const approved = [] as boolean[];
    const keys = Object.keys(filter);

    if (keys.length === 0) {
      return this._items;
    }
    if (offset === this._items.length) {
      return [];
    }

    for (let i = offset; i < this._items.length; i += 1) {
      const item = this._items[i] as unknown as Record<string, DatabaseColumnTypes>;

      if (approved.length === i) {
        approved.push(true);
      }

      for (let j = 0; j < keys.length; j += 1) {
        const value = item[keys[j]];
        const filterValue = filter[keys[j]];

        if (typeof (filterValue) === 'object') {
          const filterValueKeys = Object.keys(filterValue as unknown as Record<string, any>);

          for (let k = 0; k < filterValueKeys.length; k += 1) {
            if (filterValueKeys[k] === '$in') {
              type FilterValueArray = Record<string, DatabaseColumnTypes[]>;
              const array = (filterValue as unknown as FilterValueArray)[filterValueKeys[k]];

              if (!(array.includes(value))) {
                approved[i] = false;
                break;
              }
            }
          }

          if (approved[i] === false) {
            break;
          }
        } else if (filterValue as any instanceof Array
          && (value as any) instanceof Array) {
          const requiredArray = (filterValue as unknown as DatabaseColumnTypes[]);

          if (requiredArray.length !== (value as any[]).length) {
            approved[i] = false;
            break;
          }

          for (let k = 0; k < requiredArray.length; k += 1) {
            const requiredValue = requiredArray[k];

            if (!((value as unknown as DatabaseColumnTypes[]).includes(requiredValue))) {
              approved[i] = false;
              break;
            }
          }

          if (approved[i] === false) {
            break;
          }
        } else if (value !== filterValue) {
          approved[i] = false;
          break;
        }
      }
    }

    const filteredItems = [] as T[];

    for (let i = 0; i < approved.length && filteredItems.length < limit; i += 1) {
      if (approved[i]) {
        filteredItems.push(this._items[i]);
      }
    }

    return filteredItems;
  }

  /**
   * Updates an item at a given index.
   *
   * @param {number} index Index of the item to be updated.
   * @param {QueryUpdate} update The update to be applied.
   */
  _updateItem(
    index: number,
    update: QueryUpdate,
  ): void {
    const oldItem = this._items[index];
    const newItem = {} as Record<string, DatabaseColumnTypes>;
    const fields = Object.keys(oldItem as Record<string, any>);

    for (let i = 0; i < fields.length; i += 1) {
      if (fields[i] in update) {
        newItem[fields[i]] = (update as unknown as Record<string, DatabaseColumnTypes>)[fields[i]];
      } else {
        newItem[fields[i]] = (oldItem as unknown as Record<string, DatabaseColumnTypes>)[fields[i]];
      }
    }

    this._items[index] = newItem as unknown as T;
  }
}
