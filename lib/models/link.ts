import {findIndex} from 'lodash';

export interface LinkJSON {
    href: string;
    rel: string;
    name: string;
    prompt: string;
    render: string;
}

export class Link implements LinkJSON {
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

    static findLink(link_array: Link[], rel: string): string {
        let idx = findIndex(link_array, {'rel': rel});
        return idx > -1 ? link_array[idx].href : "";
    }

    static parseArray(links: LinkJSON[]) {
        let link_arr: Link[] = [];
        if(links) {
            for (let l of links) {
                link_arr.push(new Link(l));
            }
        }
        return link_arr;
    }
}