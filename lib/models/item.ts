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

export interface ItemData {
    href: string;
    links: LinkStore;
    datastore: DataStore;
}

export interface Item extends ItemData, ItemAPI {}

export abstract class ItemBase implements Item {
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
