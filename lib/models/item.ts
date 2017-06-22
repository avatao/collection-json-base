import {Item, ItemJSON, Link, LinkJSON} from '../interfaces';
import {DataStore} from './datastore';
import {LinkStore} from './linkstore';
import {DataJSON} from '../interfaces/json';

export abstract class ItemBase implements Item {
    public href: string;
    public links?: LinkStore;
    public dataStore?: DataStore;

    constructor(item: ItemJSON) {
        this.href = item.href;

        if (item.links) {
            this.parseLinks(item.links);
        }

        if (item.data) {
            this.parseData(item.data)
        }
    }

    protected abstract parseLinks(links: LinkJSON[]): void;
    protected abstract parseData(data: DataJSON[]): void;

    public link(rel: string): Link {
        if (typeof this.links !== 'undefined') {
            return this.links.link(rel);
        } else {
            throw new Error('There are no links stored in this Item!');
        }
    }

    public json(): ItemJSON {

        const result: ItemJSON = {
            href: this.href
        };

        if (this.links) {
            result.links = this.links.json()
        }

        if (this.dataStore) {
            result.data = this.dataStore.json()
        }

        return result;
    }
}
