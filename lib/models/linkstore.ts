import { Link } from '../interfaces/link';
export class LinkStore {
    private links: Map<string, Link>;
    constructor() {
        this.links = new Map();
    }

    public add(link: Link) {
        this.links.set(link.rel, link);
    }

    public link(rel: string): Link {
        const link = this.links.get(rel);
        if (typeof link !== 'undefined')
            return link;
        else
            throw new Error('Key not found');
    }
}
