import {LinkJSON} from '../interfaces/json';
import {LinkStoreAPI} from '../interfaces/linkstore';
import {LinkBase} from './link';

export class LinkStore implements LinkStoreAPI {
    protected _links: Map<string, LinkBase>;
    
    constructor() {
        this._links = new Map();
    }

    public add(link: LinkBase) {
        this._links.set(link.rel, link);
    }

    public link(rel: string): LinkBase | undefined {
        return this._links.get(rel);
    }

    public json(): LinkJSON[] {
        const result: LinkJSON[] = [];

        for (const link of this) {
            result.push(link.json());
        }

        return result;
    }

    [Symbol.iterator]() {
        return this._links.values();
    }
}
