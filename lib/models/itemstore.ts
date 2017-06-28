import {Item} from '../interfaces/item';
import {ItemJSON} from '../interfaces/json';
import {ItemStoreAPI} from '../interfaces/itemstore';

export class ItemStore implements ItemStoreAPI {
    private items: Item[];

    constructor() {
        this.items = [];
    }

    public add(item: Item): void {
        this.items.push(item);
    }

    /**
     * Returns the items array
     * @returns {Item[]} the items array
     */
    public all(): Item[] {
        return this.items;
    }

    /**
     * This method will return the first item of the items array
     * regardless of the number of items in the array
     * @returns {Item} the first item in the array
     */
    public first(): Item {
        return this.items[0];
    }

    /**
     * This method will return the first item of the items array, if there is only one value
     * It will fail otherwise
     * @returns {Item} the first and only item in the array
     */
    public one(): Item {
        if (this.items.length === 1) {
            return this.first();
        } else {
            throw new Error(`The item array contains more than one values, use first() if you are sure you need the first one only!`)
        }
    }

    public json(): ItemJSON[] {
        const result = [];

        for (const item of this) {
            result.push(item.json())
        }

        return result;
    }

    [Symbol.iterator]() {
        return this.items[Symbol.iterator]();
    }

}
