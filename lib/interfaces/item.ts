import {DataStore, LinkStore} from '../models';
import {ItemJSON} from './json';
import {LinkBase} from '../models/link';
import {DataBase} from '../models/data';

export interface ItemAPI {
    link(rel: string): LinkBase | undefined;
    data(name: string): DataBase | undefined;
    getDataValue(name: string): string | number | boolean | undefined;
    setDataValue(name: string, value: string | number | boolean | undefined): void;
    json(): ItemJSON;
}

export interface ItemData {
    href: string;
    linkStore?: LinkStore;
    dataStore?: DataStore;
}

export interface Item extends ItemData, ItemAPI {}
