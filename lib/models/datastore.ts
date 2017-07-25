import {DataStoreAPI} from '../interfaces/datastore';
import {DataJSON} from '../interfaces/json';
import {DataBase} from './data';

export class DataStore implements DataStoreAPI {
    protected _dataStore: Map<string, DataBase>;

    constructor() {
        this._dataStore = new Map();
    }

    public add(data: DataBase) {
        this._dataStore.set(data.name, data);
    }

    public data(name: string): DataBase | undefined {
        return this._dataStore.get(name);
    }

    public setDataValue(name: string, value: string | number | boolean | null | undefined) {
        const data = this._dataStore.get(name);
        if (typeof data !== 'undefined') {
            data.value = value;
        }
    }

    public setDataArray(name: string, array: (string | number | boolean | null)[] | null | undefined) {
        const data = this._dataStore.get(name);
        if (typeof data !== 'undefined') {
            data.array = array;
        }
    }

    public getDataValue(name: string): string | number | boolean | null | undefined {
        const data = this._dataStore.get(name);
        if (typeof data !== 'undefined') {
            return data.value;
        }
    }

    public getDataArray(name: string): (string | number | boolean | null)[] | null | undefined {
        const data = this._dataStore.get(name);
        if (typeof data !== 'undefined') {
            return data.array;
        }
    }

    public dataHasValue(name: string): boolean {
        const data = this._dataStore.get(name);
        if (typeof data !== 'undefined') {
            return typeof data.value !== 'undefined';
        }
        return false;
    }

    public dataHasArray(name: string): boolean {
        const data = this._dataStore.get(name);
        if (typeof data !== 'undefined') {
            return typeof data.array !== 'undefined';
        }
        return false;
    }

    public json(): DataJSON[] {
        const result = [];

        for (const data of this) {
            result.push(data.json());
        }

        return result;
    }

    public dataToObject(): any {
        const result: any = {};
        for (const data of this) {
            if (typeof data.value !== 'undefined') {
                result[data.name] = data.value;
            } else {
                result[data.name] = data.array;
            }
        }
        return result;
    }

    [Symbol.iterator]() {
        return this._dataStore.values();
    }

}
