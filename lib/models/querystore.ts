import {Query} from '../interfaces';
import {QueryStoreAPI} from '../interfaces/querystore';
import {QueryJSON} from '../interfaces/json';

export class QueryStore implements QueryStoreAPI {
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

    public json(): QueryJSON[] {
        const result: QueryJSON[] = [];

        for (const query of this) {
            result.push(query.json())
        }

        return result;
    }

    [Symbol.iterator]() {
        return this.queries.values();
    }

}
