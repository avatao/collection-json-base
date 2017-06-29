import {Item, ItemJSON, Link, LinkJSON} from '../interfaces';
import {DataStore} from './datastore';
import {LinkStore} from './linkstore';
import {DataJSON} from '../interfaces/json';
import {Data} from '../interfaces/data';

export abstract class ItemBase implements Item {

    public href: string;
    public linkStore?: LinkStore;
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

    public link(rel: string): Link {
        if (typeof this.linkStore !== 'undefined') {
            return this.linkStore.link(rel);
        } else {
            throw new Error('There are no links stored in this Item!');
        }
    }

    public data(name: string): Data {
        if (typeof this.dataStore !== 'undefined') {
            return this.dataStore.data(name);
        } else {
            throw new Error(`This item with the href: ${this.href} has no data array!`)
        }
    }


    public json(): ItemJSON {

        const result: ItemJSON = {
            href: this.href
        };

        if (typeof this.linkStore !== 'undefined') {
            result.links = this.linkStore.json()
        }

        if (typeof this.dataStore !== 'undefined') {
            result.data = this.dataStore.json()
        }

        return result;
    }

    protected abstract parseLinks(links: LinkJSON[]): void;
    protected abstract parseData(data: DataJSON[]): void;
}
