import { Collection, Link, LinkJSON } from '../interfaces';
export declare abstract class LinkBase implements Link {
    href: string;
    rel: string;
    name?: string;
    prompt?: string;
    render?: string;
    constructor(link: LinkJSON);
    abstract follow(): Promise<Collection>;
}
