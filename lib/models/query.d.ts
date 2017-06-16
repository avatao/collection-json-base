import { Collection, Query, QueryJSON } from '../interfaces';
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
