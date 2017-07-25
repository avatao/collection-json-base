import {LinkStore} from '../models';
import {ItemJSON} from './json';
import {LinkBase} from '../models/link';
import {DataBase} from '../models/data';
import {DataStore} from '../models/datastore';

export interface ItemAPI {
    link(rel: string): LinkBase | undefined;
    data(name: string): DataBase | undefined;
    links(): LinkStore;
    hasLinks(): boolean;
    allData(): DataStore;
    hasData(): boolean;
    setDataValue(name: string, value: string | number | boolean | null | undefined): void;
    setDataArray(name: string, array: (string | number | boolean | null)[] | null | undefined): void;
    getDataValue(name: string): string | number | boolean | null | undefined;
    getDataArray(name: string): (string | number | boolean | null)[] | null | undefined;
    dataHasValue(name: string): boolean;
    dataHasArray(name: string): boolean;
    dataToObject(): any;
    json(): ItemJSON;
}

export interface ItemData {
    href: string;
}

export interface Item extends ItemData, ItemAPI {}
