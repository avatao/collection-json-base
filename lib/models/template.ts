import { Collection } from '../interfaces/collection';
import { TemplateJSON } from '../interfaces/json';
import { TemplateAPI } from '../interfaces/template';
import { DataStore } from './datastore';

export abstract class TemplateBase implements TemplateAPI {
    private datastore: DataStore;

    constructor(template: TemplateJSON) {
        this.datastore = new DataStore(template.data);
    }

    public abstract submit(): Promise<Collection>;
    public abstract update(): Promise<Collection>;
}
