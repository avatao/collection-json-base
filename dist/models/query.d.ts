import { Collection } from '../interfaces/collection';
import { QueryJSON } from '../interfaces/json';
import { Query } from '../interfaces/query';
import { DataStore } from './datastore';
export declare abstract class QueryBase implements Query {
    href: string;
    rel: string;
    name?: string;
    prompt?: string;
    dataStore?: DataStore;
    constructor(query: QueryJSON);
    abstract send(): Promise<Collection>;
}
