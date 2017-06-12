import { Data } from './data';
import { DataStore } from './datastore';

export interface TemplateJSON {
    data: Data[];
}

export interface TemplateAPI {}

export interface Template extends TemplateJSON, TemplateAPI {}

export abstract class TemplateBase implements TemplateAPI {
    private datastore: DataStore;

    constructor(template: TemplateJSON) {
        this.datastore = new DataStore(template.data);
    }
}
