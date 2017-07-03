import {DataStore, LinkStore} from '../models';
import {ItemJSON} from './json';
import {LinkBase} from '../models/link';
import {DataBase} from '../models/data';

export interface ItemAPI {
    link(rel: string): LinkBase;
    data(name: string): DataBase;
    dataValue(name: string): string | number | boolean | undefined ;
    json(): ItemJSON;
}

export interface ItemData {
    href: string;
    linkStore?: LinkStore;
    dataStore?: DataStore;
}

export interface Item extends ItemData, ItemAPI {}
