import {Observable} from 'rxjs/Observable';
import {DataStore} from '../models';
import {Collection} from './collection';

export interface QueryData {
    href: string;
    rel: string;
    name?: string;
    prompt?: string;
    dataStore?: DataStore;
}

export interface QueryAPI {
    send(): Observable<Collection>;
}

export interface Query extends QueryData, QueryAPI {}
