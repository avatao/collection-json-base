import { Collection, Template, TemplateJSON } from '../interfaces';
import { DataStore } from './datastore';
export declare abstract class TemplateBase implements Template {
    dataStore: DataStore;
    constructor(template: TemplateJSON);
    abstract submit(): Promise<Collection>;
    abstract update(): Promise<Collection>;
}
