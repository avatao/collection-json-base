import {Observable} from 'rxjs/Observable';
import {DataStore} from '../models';
import {Collection} from './collection';

export interface TemplateData {
     dataStore: DataStore;
}

export interface TemplateAPI {
    submit(): Observable<Collection>;
    update(): Observable<Collection>;
}

export interface Template extends TemplateData, TemplateAPI {}
