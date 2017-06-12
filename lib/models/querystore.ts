import { Query } from '../interfaces/query';

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
        if (query)
            return query;
        else
            throw new Error('Key not found');
    }
}
