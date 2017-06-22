import {Data} from '../interfaces';
import {DataStoreAPI} from '../interfaces/datastore';
import {DataJSON} from '../interfaces/json';

export class DataStore implements DataStoreAPI {
    private dataStore: Map<string, Data>;

    constructor() {
        this.dataStore = new Map();
    }

    public add(data: Data) {
        this.dataStore.set(data.name, data);
    }

    public data(name: string): Data {
        const data = this.dataStore.get(name);
        if (typeof data !== 'undefined') {
            return data;
        } else {
            throw new Error('Key not found');
        }
    }

    public json(): DataJSON[] {
        const result = [];

        for (const data of this) {
            result.push(data.json())
        }

        return result;
    }

    [Symbol.iterator]() {
        return this.dataStore.values();
    }

}
