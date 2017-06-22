import {DataStore, LinkStore} from '../models';
import {Link} from './link';
import {ItemJSON} from './json';

export interface ItemAPI {
    link(rel: string): Link;
    json(): ItemJSON;
}

export interface ItemData {
    href: string;
    links?: LinkStore;
    dataStore?: DataStore;
}

export interface Item extends ItemData, ItemAPI {}
