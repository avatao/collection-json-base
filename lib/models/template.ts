import {Observable} from 'rxjs/Observable';
import {Collection, Template, TemplateJSON} from '../interfaces';
import {DataStore} from './datastore';
import {DataJSON} from '../interfaces/json';

export abstract class TemplateBase implements Template {
    public dataStore: DataStore;

    constructor(template: TemplateJSON) {
        this.parseData(template.data);
    }

    protected abstract parseData(data: DataJSON[]): void;
    public abstract submit(): Observable<Collection>;
    public abstract update(): Observable<Collection>;

    public json(): TemplateJSON {
        return { data: this.dataStore.json() }
    }
}
