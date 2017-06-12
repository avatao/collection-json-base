import { Item } from '../interfaces/item';
import { ItemJSON } from '../interfaces/json';
import { Link } from '../interfaces/link';
import { DataStore } from './datastore';
import { LinkStore } from './linkstore';

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
