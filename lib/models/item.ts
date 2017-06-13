import { Item } from '../interfaces/item';
import { ItemJSON, LinkJSON } from '../interfaces/json';
import { Link } from '../interfaces/link';
import { DataStore } from './datastore';
import { LinkStore } from './linkstore';

export abstract class ItemBase implements Item {
    public href: string;
    public links?: LinkStore;
    public dataStore?: DataStore;

    constructor(item: ItemJSON) {
        this.href = item.href;
        if (item.links) {
            this.links = new LinkStore();
            this.parseLinks(item.links);
        }
        this.dataStore = item.data && new DataStore(item.data);
    }

    protected abstract parseLinks(links: LinkJSON[]): void;

    public link(rel: string): Link {
        if (typeof this.links !== 'undefined')
            return this.links.link(rel);
        else
            throw new Error('There are no links stored in this Item!');
    }
}
