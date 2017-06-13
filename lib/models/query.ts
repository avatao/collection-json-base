import { Collection } from '../interfaces/collection';
import { QueryJSON } from '../interfaces/json';
import { Query } from '../interfaces/query';
import { DataStore } from './datastore';

export abstract class QueryBase implements Query {
    public href: string;
    public rel: string;
    public name?: string;
    public prompt?: string;
    public dataStore?: DataStore;

    constructor(query: QueryJSON) {
        this.href = query.href;
        this.rel = query.rel;
        this.name = query.name;
        this.prompt = query.prompt;
        this.dataStore = query.data && new DataStore(query.data);
    }

    public abstract send(): Promise<Collection>;
}
