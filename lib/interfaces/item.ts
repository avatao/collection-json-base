import {DataStore, LinkStore} from '../models';
import {ItemJSON} from './json';
import {LinkBase} from '../models/link';
import {DataBase} from '../models/data';

export interface ItemAPI {
    link(rel: string): LinkBase | undefined;
    data(name: string): DataBase | undefined;
    setDataValue(name: string, value: string | number | boolean | undefined): void;
    setDataArray(name: string, array: (string | number | boolean)[] | undefined): void;
    getDataValue(name: string): string | number | boolean | undefined;
    getDataArray(name: string): (string | number | boolean)[] | undefined;
    dataHasValue(name: string): boolean;
    dataHasArray(name: string): boolean;
    dataToObject(): any;
    getDataStore(): DataStore | undefined;
    json(): ItemJSON;
}

export interface ItemData {
    href: string;
    linkStore?: LinkStore;
    dataStore?: DataStore;
}

export interface Item extends ItemData, ItemAPI {}
