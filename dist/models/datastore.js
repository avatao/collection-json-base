"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DataStore {
    constructor(dataArray) {
        this.dataStore = new Map();
        if (dataArray)
            for (const d of dataArray)
                this.add(d);
    }
    add(data) {
        this.dataStore.set(data.name, data);
    }
    data(name) {
        const data = this.dataStore.get(name);
        if (typeof data !== 'undefined')
            return data;
        else
            throw new Error('Key not found');
    }
}
exports.DataStore = DataStore;
//# sourceMappingURL=datastore.js.map