import {Observable} from 'rxjs/Observable';
import {TemplateJSON} from './json';
import {CollectionBase} from '../models/collection';
import {DataBase} from '../models/data';
import {DataStore} from '../models/datastore';

export interface TemplateAPI {
    submit(): Observable<CollectionBase>;
    update(): Observable<CollectionBase>;
    json(): TemplateJSON;
    data(name: string): DataBase | undefined;
    allData(): DataStore;
    set(name: string, value: string | number | boolean ): void;
    setAll(body: {name: string, value: string | number | boolean}[]): void;
    validate(): void;
}

export interface Template extends TemplateAPI {}
