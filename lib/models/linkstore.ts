import {LinkJSON} from '../interfaces/json';
import {LinkStoreAPI} from '../interfaces/linkstore';
import {LinkBase} from './link';

export class LinkStore implements LinkStoreAPI {
    private links: Map<string, LinkBase>;
    constructor() {
        this.links = new Map();
    }

    public add(link: LinkBase) {
        this.links.set(link.rel, link);
    }

    public link(rel: string): LinkBase {
        const link = this.links.get(rel);
        if (typeof link !== 'undefined') {
            return link;
        } else {
            throw new Error('Key not found');
        }
    }

    public json(): LinkJSON[] {
        const result: LinkJSON[] = [];

        for (const link of this) {
            result.push(link.json())
        }

        return result;
    }

    [Symbol.iterator]() {
        return this.links.values();
    }
}
