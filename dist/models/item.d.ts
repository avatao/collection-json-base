import { Item } from '../interfaces/item';
import { ItemJSON, LinkJSON } from '../interfaces/json';
import { Link } from '../interfaces/link';
import { DataStore } from './datastore';
import { LinkStore } from './linkstore';
export declare abstract class ItemBase implements Item {
    href: string;
    links?: LinkStore;
    dataStore?: DataStore;
    constructor(item: ItemJSON);
    protected abstract parseLinks(links: LinkJSON[]): void;
    link(rel: string): Link;
}
