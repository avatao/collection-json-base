import {DataStoreAPI} from '../interfaces/datastore';
import {DataJSON} from '../interfaces/json';
import {DataBase} from './data';

export class DataStore implements DataStoreAPI {
    private dataStore: Map<string, DataBase>;

    constructor() {
        this.dataStore = new Map();
    }

    public add(data: DataBase) {
        this.dataStore.set(data.name, data);
    }

    public data(name: string): DataBase | undefined {
        return this.dataStore.get(name);
    }

    public setDataValue(name: string, value: string | number | boolean | undefined) {
        const data = this.dataStore.get(name);
        if (typeof data !== 'undefined') {
            data.value = value;
        }
    }

    public getDataValue(name: string) {
        const data = this.dataStore.get(name);
        if (typeof data !== 'undefined') {
            return data.value;
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
