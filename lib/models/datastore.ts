import { Data } from './data';

export class DataStore {
    private datastore: Map<string, Data>;

    constructor(dataArray?: Data[]) {
        this.datastore = new Map();
        if (dataArray)
            for (const d of dataArray)
                this.add(d);
    }

    public add(data: Data) {
        this.datastore.set(data.name, data);
    }

    public data(name: string): Data {
        const data = this.datastore.get(name);
        if (data)
            return data;
        else
            throw new Error('Key not found');

    }
}
