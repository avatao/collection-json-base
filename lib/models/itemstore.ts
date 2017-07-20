import {ItemJSON} from '../interfaces/json';
import {ItemStoreAPI} from '../interfaces/itemstore';
import {ItemBase} from './item';

export class ItemStore implements ItemStoreAPI {
    protected _items: ItemBase[];

    constructor() {
        this._items = [];
    }

    public add(item: ItemBase): void {
        this._items.push(item);
    }

    /**
     * Returns the items array
     * @returns {ItemBase[]} the items array
     */
    public all(): ItemBase[] {
        return this._items;
    }

    /**
     * This method will return the first item of the items array
     * regardless of the number of items in the array
     * @returns {ItemBase} the first item in the array
     */
    public first(): ItemBase | undefined {
        return this._items[0];
    }

    /**
     * This method will return the first item of the items array, if there is only one value
     * It will fail otherwise
     * @returns {ItemBase} the first and only item in the array
     */
    public one(): ItemBase {
        if (this._items.length === 0) {
            throw new Error('This item array is empty!');
        } else if (this._items.length > 1) {
            throw new Error(`The item array contains more than one values, use first() if you are sure you need the first one only!`);
        } else {
            return this._items[0];
        }
    }

    public json(): ItemJSON[] {
        const result = [];

        for (const item of this) {
            result.push(item.json());
        }

        return result;
    }

    [Symbol.iterator]() {
        return this._items[Symbol.iterator]();
    }

}
