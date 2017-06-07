import { Collection } from './collection';

export interface LinkJSON {
    href: string;
    rel: string;
    name: string;
    prompt: string;
    render: string;
}

export abstract class Link implements LinkJSON {
    href: string;
    rel: string;
    name: string;
    prompt: string;
    render: string;

    constructor(link: LinkJSON) {
        this.href = link["href"];
        this.rel = link["rel"];
        this.name = link["name"] || "";
        this.prompt = link["prompt"] || "";
        this.render = link["render"] || "";
    }

    abstract follow(): Collection<any>;

    static findLink(link_array: Link[], rel: string): string {
        let result = link_array.find((link) => link.rel === rel);
        return result && result.href || "";
    }

    static parseArray<LinkImpl extends Link>(links: LinkJSON[], linkimpl: {new (l: LinkJSON): LinkImpl;}): LinkImpl[] {
        let link_arr: LinkImpl[] = [];
        if(links) {
            for (let l of links) {
                link_arr.push(new linkimpl(l));
            }
        }
        return link_arr;
    }
}