import { Link } from '../interfaces';
export declare class LinkStore {
    private links;
    constructor();
    add(link: Link): void;
    link(rel: string): Link;
}
