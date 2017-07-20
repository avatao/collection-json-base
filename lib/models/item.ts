import {Item, ItemJSON, LinkJSON} from '../interfaces';
import {DataStore} from './datastore';
import {LinkStore} from './linkstore';
import {DataJSON} from '../interfaces/json';
import {LinkBase} from './link';
import {DataBase} from './data';

export abstract class ItemBase implements Item {

    public href: string;
    private _linkStore?: LinkStore;
    private _dataStore?: DataStore;

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
        if (typeof this._linkStore !== 'undefined') {
            return this._linkStore.link(rel);
        }
    }

    public data(name: string): DataBase | undefined {
        if (typeof this._dataStore !== 'undefined') {
            return this._dataStore.data(name);
        }
    }

    public allData(): DataStore {
        if (typeof this._dataStore !== 'undefined') {
            return this._dataStore;
        } else {
            throw new Error('There are no data on this Item');
        }
    }

    public links(): LinkStore {
        if (typeof this._linkStore !== 'undefined') {
            return this._linkStore;
        } else {
            throw new Error('There are no links on this Item');
        }
    }

    public getDataValue(name: string): string | number | boolean | undefined {
        if (typeof this._dataStore !== 'undefined') {
            return this._dataStore.getDataValue(name);
        }
    }


    public getDataArray(name: string): (string | number | boolean)[] | undefined {
        if (typeof this._dataStore !== 'undefined') {
            return this._dataStore.getDataArray(name);
        }
    }

    public setDataValue(name: string, value: string | number | boolean | undefined): void {
        if (typeof this._dataStore !== 'undefined') {
            return this._dataStore.setDataValue(name, value);
        }
    }

    public setDataArray(name: string, array: (string | number | boolean)[] | undefined) {
        if (typeof this._dataStore !== 'undefined') {
            return this._dataStore.setDataArray(name, array);
        }
    }

    public dataHasValue(name: string): boolean {
        if (typeof this._dataStore !== 'undefined') {
            return this._dataStore.dataHasValue(name);
        }
        return false;
    }

    public dataHasArray(name: string): boolean {
        if (typeof this._dataStore !== 'undefined') {
            return this._dataStore.dataHasArray(name);
        }
        return false;
    }

    public dataToObject(): any {
        if (typeof this._dataStore !== 'undefined') {
            return this._dataStore.dataToObject();
        }
        return {};
    }


    public json(): ItemJSON {

        const result: ItemJSON = {
            href: this.href
        };

        if (typeof this._linkStore !== 'undefined') {
            result.links = this._linkStore.json();
        }

        if (typeof this._dataStore !== 'undefined') {
            result.data = this._dataStore.json();
        }

        return result;
    }

    protected abstract parseLinks(links: LinkJSON[]): void;
    protected abstract parseData(data: DataJSON[]): void;
}
