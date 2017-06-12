import { Collection } from '../interfaces/collection';
import { LinkJSON } from '../interfaces/json';
import { Link } from '../interfaces/link';

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

    public abstract follow(): Promise<Collection>;
}
