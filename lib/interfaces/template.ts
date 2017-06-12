import { Collection } from './collection';
import { TemplateJSON } from './json';

export interface TemplateAPI {
    submit(): Promise<Collection>;
    update(): Promise<Collection>;
}

export interface Template extends TemplateJSON, TemplateAPI {}
