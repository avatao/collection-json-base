import { Link } from './link';

export class Links {
    private links: Map<string, Link>;
    constructor() {
        this.links = new Map();
    }

    public add(link: Link) {
        this.links.set(link.rel, link);
    }

    public link(rel: string): Link {
        const link = this.links.get(rel);
        if (link)
            return link;
        else
            throw new Error('Key not found');
    }
}
