import {Observable} from 'rxjs/Observable';
import {DataStore} from '../models';
import {Collection} from './collection';
import {QueryJSON} from './json';

export interface QueryData {
    href: string;
    rel: string;
    name?: string;
    prompt?: string;
    dataStore?: DataStore;
}

export interface QueryAPI {
    send(params: { name: string, value: string | number | boolean }[]): Observable<Collection>;
    json(): QueryJSON
}

export interface Query extends QueryData, QueryAPI {}
