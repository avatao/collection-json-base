import {Observable} from 'rxjs/Observable';
import {DataStore, CollectionBase} from '../models';
import {QueryJSON} from './json';
import {Data} from './data';

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
    json(): QueryJSON;
}

export interface Query extends QueryData, QueryAPI {}
