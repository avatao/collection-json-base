import {Observable} from 'rxjs/Observable';
import {Query, QueryJSON} from '../interfaces';
import {DataStore} from './datastore';
import {DataJSON} from '../interfaces/json';
import {CollectionBase} from './collection';

export abstract class QueryBase implements Query {
    public href: string;
    public rel: string;
    public name?: string;
    public prompt?: string;
    public dataStore?: DataStore;

    constructor(query: QueryJSON) {
        this.href = query.href;
        this.rel = query.rel;

        if (typeof query.name !== 'undefined') {
            this.name = query.name;
        }

        if (typeof query.prompt !== 'undefined') {
            this.prompt = query.prompt
        }

        if (typeof query.data !== 'undefined') {
            this.parseData(query.data);
        }
    }

    protected abstract parseData(data: DataJSON[]): void;
    public abstract send(params: { name: string, value: string | number | boolean }[]): Observable<CollectionBase>;

    public json(): QueryJSON {
        const result: QueryJSON = {href: this.href, rel: this.rel};

        if (typeof this.name !== 'undefined') {
            result.name = this.name;
        }

        if (typeof this.prompt !== 'undefined') {
            result.prompt = this.prompt
        }

        if (typeof this.dataStore !== 'undefined') {
            result.data = this.dataStore.json();
        }

        return result;
    }
}
