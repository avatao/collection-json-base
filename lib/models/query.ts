import {Observable} from 'rxjs/Observable';
import {Collection, Query, QueryJSON} from '../interfaces';
import {DataStore} from './datastore';
import {DataJSON} from '../interfaces/json';

export abstract class QueryBase implements Query {
    public href: string;
    public rel: string;
    public name?: string;
    public prompt?: string;
    public dataStore?: DataStore;

    constructor(query: QueryJSON) {
        this.href = query.href;
        this.rel = query.rel;

        if (query.name) {
            this.name = query.name;
        }

        if (query.prompt) {
            this.prompt = query.prompt
        }

        if (query.data) {
            this.parseData(query.data);
        }
    }

    protected abstract parseData(data: DataJSON[]): void;
    public abstract send(params: { name: string, value: string | number | boolean }[]): Observable<Collection>;

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
