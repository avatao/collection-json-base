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
    protected _dataStore?: DataStore;

    constructor(query: QueryJSON) {
        this.href = query.href;
        this.rel = query.rel;

        if (typeof query.name !== 'undefined') {
            this.name = query.name;
        }

        if (typeof query.prompt !== 'undefined') {
            this.prompt = query.prompt;
        }

        if (typeof query.data !== 'undefined') {
            this.parseData(query.data);
        }
    }

    public allData(): DataStore {
        if (typeof this._dataStore !== 'undefined') {
            return this._dataStore;
        } else {
            throw new Error('There are no data on this Query');
        }
    }

    public json(): QueryJSON {
        const result: QueryJSON = {href: this.href, rel: this.rel};

        if (typeof this.name !== 'undefined') {
            result.name = this.name;
        }

        if (typeof this.prompt !== 'undefined') {
            result.prompt = this.prompt;
        }

        if (typeof this._dataStore !== 'undefined') {
            result.data = this._dataStore.json();
        }

        return result;
    }

    protected abstract parseData(data: DataJSON[]): void;
    public abstract send(params: { name: string, value: string | number | boolean }[]): Observable<CollectionBase>;

}
