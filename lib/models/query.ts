import { Collection } from './collection';
import { Data } from './data';
import { DataStore } from './datastore';

export interface QueryJSON {
    href: string;
    rel: string;
    name: string;
    prompt: string;
    data: Data[];
}

export interface QueryData {
    href: string;
    rel: string;
    name: string;
    prompt: string;
    datastore: DataStore;
}

export interface QueryAPI {
    send(): Promise<Collection>;
}

export interface Query extends QueryData, QueryAPI {}

export abstract class QueryBase implements Query {
    public href: string;
    public rel: string;
    public name: string;
    public prompt: string;
    public datastore: DataStore;

    constructor(query: QueryJSON) {
        this.href = query.href;
        this.rel = query.rel;
        this.name = query.name;
        this.prompt = query.prompt;
        this.datastore = new DataStore(query.data);
    }

    public abstract send(): Promise<Collection>;
}
