import {Observable} from 'rxjs/Observable';
import {DataStore} from '../models';
import {TemplateJSON} from './json';
import {CollectionBase} from '../models/collection';
import {DataBase} from '../models/data';

export interface TemplateData {
     dataStore: DataStore;
}

export interface TemplateAPI {
    submit(): Observable<CollectionBase>;
    update(): Observable<CollectionBase>;
    json(): TemplateJSON;
    data(name: string): DataBase | undefined;
    set(name: string, value: string | number | boolean ): void;
    setAll(body: {name: string, value: string | number | boolean}[]): void;
    validate(): void;
}

export interface Template extends TemplateData, TemplateAPI {}
