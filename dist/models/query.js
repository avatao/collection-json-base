"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const datastore_1 = require("./datastore");
class QueryBase {
    constructor(query) {
        this.href = query.href;
        this.rel = query.rel;
        this.name = query.name;
        this.prompt = query.prompt;
        this.dataStore = query.data && new datastore_1.DataStore(query.data);
    }
}
exports.QueryBase = QueryBase;
//# sourceMappingURL=query.js.map