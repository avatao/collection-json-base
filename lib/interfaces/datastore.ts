import {DataJSON} from './json';
import {DataBase} from '../models/data';

export interface DataStoreAPI {
    add(data: DataBase): void;
    data(name: string): DataBase | undefined;
    setDataValue(name: string, value: string | number | boolean | undefined): void;
    getDataValue(name: string): string | number | boolean | undefined;
    json(): DataJSON[];
}
