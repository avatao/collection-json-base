import {Query} from '../interfaces';

export class QueryStore {
    private queries: Map<string, Query>;

    constructor() {
        this.queries = new Map();
    }

    public add(query: Query) {
        this.queries.set(query.rel, query);
    }

    public query(rel: string): Query {
        const query = this.queries.get(rel);
        if (typeof query !== 'undefined') {
            return query;
        } else {
            throw new Error('Key not found');
        }
    }

    [Symbol.iterator]() {
        return this.queries.values();
    }

}
