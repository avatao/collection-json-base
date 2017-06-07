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
        let result = link_array.find((link) => link.rel === rel);
        return result && result.href || "";
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