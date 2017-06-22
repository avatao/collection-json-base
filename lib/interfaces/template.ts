import {Observable} from 'rxjs/Observable';
import {DataStore} from '../models';
import {Collection} from './collection';
import {TemplateJSON} from './json';

export interface TemplateData {
     dataStore: DataStore;
}

export interface TemplateAPI {
    submit(): Observable<Collection>;
    update(): Observable<Collection>;
    json(): TemplateJSON;
}

export interface Template extends TemplateData, TemplateAPI {}
