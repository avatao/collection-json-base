import {DataJSON} from './json';
import {DataBase} from '../models/data';

export interface DataStoreAPI {
    add(data: DataBase): void;
    data(name: string): DataBase | undefined;
    setDataValue(name: string, value: string | number | boolean | null | undefined): void;
    setDataArray(name: string, array: (string | number | boolean| null)[] | null | undefined): void;
    getDataValue(name: string): string | number | boolean | null | undefined;
    getDataArray(name: string): (string | number | boolean | null)[] | null | undefined;
    dataHasValue(name: string): boolean;
    dataHasArray(name: string): boolean;
    dataToObject(): any;
    json(): DataJSON[];
}
