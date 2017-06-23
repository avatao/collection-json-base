import {Observable} from 'rxjs/Observable';
import {DataStore} from '../models';
import {Collection} from './collection';
import {TemplateJSON} from './json';
import {Data} from './data';

export interface TemplateData {
     dataStore: DataStore;
}

export interface TemplateAPI {
    submit(): Observable<Collection>;
    update(): Observable<Collection>;
    json(): TemplateJSON;
    data(name: string): Data;
}

export interface Template extends TemplateData, TemplateAPI {}
