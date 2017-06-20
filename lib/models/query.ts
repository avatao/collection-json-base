import {Observable} from 'rxjs/Observable';
import {Collection, Query, QueryJSON} from '../interfaces';
import {DataStore} from './datastore';

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

    public abstract send(): Observable<Collection>;
}
