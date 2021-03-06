import {Observable} from 'rxjs';
import {DataStore, CollectionBase} from '../models';
import {QueryJSON} from './json';

export interface QueryData {
    href: string;
    rel: string;
    name?: string;
    prompt?: string;
    dataStore?: DataStore;
}

export interface QueryAPI {
    send(params: { name: string, value: string | number | boolean }[]): Observable<CollectionBase>;
    allData(): DataStore;
    hasData(): boolean;
    json(): QueryJSON;
}

export interface Query extends QueryData, QueryAPI {}
