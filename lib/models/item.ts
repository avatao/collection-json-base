import {Item, ItemJSON, LinkJSON} from '../interfaces';
import {DataStore} from './datastore';
import {LinkStore} from './linkstore';
import {DataJSON} from '../interfaces/json';
import {LinkBase} from './link';
import {DataBase} from './data';

export abstract class ItemBase implements Item {

    public href: string;
    public linkStore?: LinkStore;
    public dataStore?: DataStore;

    constructor(item: ItemJSON) {
        this.href = item.href;

        if (typeof item.links !== 'undefined') {
            this.parseLinks(item.links);
        }

        if (typeof item.data !== 'undefined') {
            this.parseData(item.data);
        }
    }

    public link(rel: string): LinkBase | undefined {
        if (typeof this.linkStore !== 'undefined') {
            return this.linkStore.link(rel);
        }
    }

    public data(name: string): DataBase | undefined {
        if (typeof this.dataStore !== 'undefined') {
            return this.dataStore.data(name);
        }
    }

    public getDataValue(name: string): string | number | boolean | undefined {
        if (typeof this.dataStore !== 'undefined') {
            return this.dataStore.getDataValue(name);
        }
    }


    public getDataArray(name: string): (string | number | boolean)[] | undefined {
        if (typeof this.dataStore !== 'undefined') {
            return this.dataStore.getDataArray(name);
        }
    }

    public setDataValue(name: string, value: string | number | boolean | undefined): void {
        if (typeof this.dataStore !== 'undefined') {
            return this.dataStore.setDataValue(name, value);
        }
    }

    public setDataArray(name: string, array: (string | number | boolean)[] | undefined) {
        if (typeof this.dataStore !== 'undefined') {
            return this.dataStore.setDataArray(name, array);
        }
    }

    public dataHasValue(name: string): boolean {
        if (typeof this.dataStore !== 'undefined') {
            return this.dataStore.dataHasValue(name);
        }
        return false;
    }

    public dataHasArray(name: string): boolean {
        if (typeof this.dataStore !== 'undefined') {
            return this.dataStore.dataHasArray(name);
        }
        return false;
    }

    public dataToObject(): any {
        if (typeof this.dataStore !== 'undefined') {
            return this.dataStore.dataToObject();
        }
        return {};
    }

    public getDataStore(): DataStore | undefined {
        if (typeof this.dataStore !== 'undefined') {
            return this.dataStore;
        }
    }


    public json(): ItemJSON {

        const result: ItemJSON = {
            href: this.href
        };

        if (typeof this.linkStore !== 'undefined') {
            result.links = this.linkStore.json();
        }

        if (typeof this.dataStore !== 'undefined') {
            result.data = this.dataStore.json();
        }

        return result;
    }

    protected abstract parseLinks(links: LinkJSON[]): void;
    protected abstract parseData(data: DataJSON[]): void;
}
