import { Collection } from '../interfaces/collection';
import { TemplateJSON } from '../interfaces/json';
import { TemplateAPI } from '../interfaces/template';
export declare abstract class TemplateBase implements TemplateAPI {
    private dataStore;
    constructor(template: TemplateJSON);
    abstract submit(): Promise<Collection>;
    abstract update(): Promise<Collection>;
}
