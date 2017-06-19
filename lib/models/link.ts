import {Collection, Link, LinkJSON} from '../interfaces';

export abstract class LinkBase implements Link {
    public href: string;
    public rel: string;
    public name?: string;
    public prompt?: string;
    public render?: string;

    constructor(link: LinkJSON) {
        this.href = link.href;
        this.rel = link.rel;

        if (link.name) {
            this.name = link.name;
        }

        if (link.prompt) {
            this.prompt = link.prompt;
        }

        if (link.render) {
            this.render = link.render;
        }
    }

    public abstract follow(): Promise<Collection>;
}
