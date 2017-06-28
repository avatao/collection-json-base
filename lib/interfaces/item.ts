import {DataStore, LinkStore} from '../models';
import {Link} from './link';
import {ItemJSON} from './json';
import {Data} from './data';

export interface ItemAPI {
    link(rel: string): Link;
    data(name: string): Data;
    json(): ItemJSON;
}

export interface ItemData {
    href: string;
    linkStore?: LinkStore;
    dataStore?: DataStore;
}

export interface Item extends ItemData, ItemAPI {}
