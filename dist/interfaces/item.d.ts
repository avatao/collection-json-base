import { DataStore } from '../models/datastore';
import { LinkStore } from '../models/linkstore';
import { Link } from './link';
export interface ItemAPI {
    link(rel: string): Link;
}
export interface ItemData {
    href: string;
    links?: LinkStore;
    dataStore?: DataStore;
}
export interface Item extends ItemData, ItemAPI {
}
