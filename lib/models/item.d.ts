import { Item, ItemJSON, Link, LinkJSON } from '../interfaces';
import { DataStore } from './datastore';
import { LinkStore } from './linkstore';
export declare abstract class ItemBase implements Item {
    href: string;
    links?: LinkStore;
    dataStore?: DataStore;
    constructor(item: ItemJSON);
    protected abstract parseLinks(links: LinkJSON[]): void;
    link(rel: string): Link;
}
