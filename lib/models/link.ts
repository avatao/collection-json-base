import { Collection } from './collection';

export interface LinkJSON {
    href: string;
    rel: string;
    name: string;
    prompt: string;
    render: string;
}

export interface LinkAPI {
    follow(): Collection;
}

export interface Link extends LinkJSON, LinkAPI {}

export abstract class LinkBase implements Link {
    public href: string;
    public rel: string;
    public name: string;
    public prompt: string;
    public render: string;

    constructor(link: LinkJSON) {
        this.href = link.href;
        this.rel = link.rel;
        this.name = link.name || '';
        this.prompt = link.prompt || '';
        this.render = link.render || '';
    }

    public abstract follow(): Collection;

    public static findLink(linkArray: Link[], rel: string): string {
        const result = linkArray.find((link) => link.rel === rel);
        return result && result.href || '';
    }
}
