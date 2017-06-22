import {Link} from '../interfaces';
import {LinkJSON} from '../interfaces/json';
import {LinkStoreAPI} from '../interfaces/linkstore';

export class LinkStore implements LinkStoreAPI {
    private links: Map<string, Link>;
    constructor() {
        this.links = new Map();
    }

    public add(link: Link) {
        this.links.set(link.rel, link);
    }

    public link(rel: string): Link {
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
