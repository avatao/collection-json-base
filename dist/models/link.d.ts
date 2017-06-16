import { Collection } from '../interfaces/collection';
import { LinkJSON } from '../interfaces/json';
import { Link } from '../interfaces/link';
export declare abstract class LinkBase implements Link {
    href: string;
    rel: string;
    name?: string;
    prompt?: string;
    render?: string;
    constructor(link: LinkJSON);
    abstract follow(): Promise<Collection>;
}
