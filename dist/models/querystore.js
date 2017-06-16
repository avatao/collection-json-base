"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class QueryStore {
    constructor() {
        this.queries = new Map();
    }
    add(query) {
        this.queries.set(query.rel, query);
    }
    query(rel) {
        const query = this.queries.get(rel);
        if (typeof query !== 'undefined')
            return query;
        else
            throw new Error('Key not found');
    }
}
exports.QueryStore = QueryStore;
//# sourceMappingURL=querystore.js.map