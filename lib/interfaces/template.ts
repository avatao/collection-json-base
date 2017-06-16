import {DataStore} from '../models';
import {Collection} from './collection';

export interface TemplateData {
     dataStore: DataStore;
}

export interface TemplateAPI {
    submit(): Promise<Collection>;
    update(): Promise<Collection>;
}

export interface Template extends TemplateData, TemplateAPI {}
