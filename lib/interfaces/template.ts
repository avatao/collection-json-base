import {Observable} from 'rxjs';
import {TemplateJSON} from './json';
import {CollectionBase} from '../models';
import {DataBase} from '../models/data';
import {DataStore} from '../models';

export interface TemplateAPI {
    submit(): Observable<CollectionBase>;
    update(): Observable<CollectionBase>;
    json(): TemplateJSON;
    data(name: string): DataBase | undefined;
    allData(): DataStore;
    hasData(): boolean;
    set(name: string, value: string | number | boolean ): void;
    setAll(body: {name: string, value: string | number | boolean}[]): void;
    setWithDataObject(dataObject: any): void;
    clear(): void;
    validate(): void;
}

export interface Template extends TemplateAPI {}
