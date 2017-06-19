import {Item, ItemJSON, Link, LinkJSON} from '../interfaces';
import {DataStore} from './datastore';
import {LinkStore} from './linkstore';

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
        if (typeof this.links !== 'undefined') {
            return this.links.link(rel);
        }
        else {
            throw new Error('There are no links stored in this Item!');
        }
    }
}
