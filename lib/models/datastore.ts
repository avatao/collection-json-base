import {Data} from '../interfaces';

export class DataStore {
    private dataStore: Map<string, Data>;

    constructor(dataArray?: Data[]) {
        this.dataStore = new Map();
        if (dataArray)
            for (const d of dataArray)
                this.add(d);
    }

    public add(data: Data) {
        this.dataStore.set(data.name, data);
    }

    public data(name: string): Data {
        const data = this.dataStore.get(name);
        if (typeof data !== 'undefined')
            return data;
        else
            throw new Error('Key not found');
    }
}
