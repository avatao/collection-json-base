import { Collection } from './collection';

export interface LinkJSON {
    href: string;
    rel: string;
    name: string;
    prompt: string;
    render: string;
}

export abstract class Link implements LinkJSON {
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

    public abstract follow(): Collection<any>;

    public static findLink(linkArray: Link[], rel: string): string {
        const result = linkArray.find((link) => link.rel === rel);
        return result && result.href || '';
    }

    public static parseArray<LinkImpl extends Link>(links: LinkJSON[],
                                                    linkimpl: {new (l: LinkJSON): LinkImpl; })
    : LinkImpl[] {
        const linkArray: LinkImpl[] = [];
        if (links) {
            for (const l of links) {
                linkArray.push(new linkimpl(l));
            }
        }
        return linkArray;
    }
}
