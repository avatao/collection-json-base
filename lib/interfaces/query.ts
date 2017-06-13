import { DataStore } from '../models/datastore';
import { Collection } from './collection';

export interface QueryData {
    href: string;
    rel: string;
    name: string;
    prompt: string;
    dataStore: DataStore;
}

export interface QueryAPI {
    send(): Promise<Collection>;
}

export interface Query extends QueryData, QueryAPI {}
