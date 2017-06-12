import { Collection } from './collection';
import { Data } from './data';
import { DataStore } from './datastore';

export interface TemplateJSON {
    data: Data[];
}

export interface TemplateAPI {
    submit(): Promise<Collection>;
    update(): Promise<Collection>;
}

export interface Template extends TemplateJSON, TemplateAPI {}

export abstract class TemplateBase implements TemplateAPI {
    private datastore: DataStore;

    constructor(template: TemplateJSON) {
        this.datastore = new DataStore(template.data);
    }

    public abstract submit(): Promise<Collection>;
    public abstract update(): Promise<Collection>;
}
