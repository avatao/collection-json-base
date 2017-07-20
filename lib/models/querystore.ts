import {QueryStoreAPI} from '../interfaces/querystore';
import {QueryJSON} from '../interfaces/json';
import {QueryBase} from './query';

export class QueryStore implements QueryStoreAPI {
    protected _queries: Map<string, QueryBase>;

    constructor() {
        this._queries = new Map();
    }

    public add(query: QueryBase) {
        this._queries.set(query.rel, query);
    }

    public query(rel: string): QueryBase | undefined {
        return this._queries.get(rel);
    }

    public json(): QueryJSON[] {
        const result: QueryJSON[] = [];

        for (const query of this) {
            result.push(query.json());
        }

        return result;
    }

    [Symbol.iterator]() {
        return this._queries.values();
    }

}
