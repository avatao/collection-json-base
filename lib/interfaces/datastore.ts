import {DataJSON} from './json';
import {DataBase} from '../models/data';

export interface DataStoreAPI {
    add(data: DataBase): void;
    data(name: string): DataBase | undefined;
    setDataValue(name: string, value: string | number | boolean | undefined): void;
    setDataArray(name: string, array: (string | number | boolean)[] | undefined): void;
    getDataValue(name: string): string | number | boolean | undefined;
    getDataArray(name: string): (string | number | boolean)[] | undefined;
    dataHasValue(name: string): boolean;
    dataHasArray(name: string): boolean;
    dataToObject(): any;
    json(): DataJSON[];
}
