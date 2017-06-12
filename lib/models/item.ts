import { Data } from './data';
import { DataStore } from './datastore';
import { Link } from './link';
import { LinkStore } from './linkstore';

export interface ItemJSON {
    href: string;
    links: Link[];
    data: Data[];
}

export interface ItemAPI {
    link(rel: string): Link;
}

export interface Item extends ItemJSON, ItemAPI {}

export abstract class ItemBase implements ItemAPI {
    public href: string;
    public links: LinkStore;
    public datastore: DataStore;

    constructor(item: ItemJSON) {
        this.href = item.href;
        // links is constructed by descendant
        this.datastore = new DataStore(item.data);
    }

    public link(rel: string): Link {
        return this.links.link(rel);
    }
}
