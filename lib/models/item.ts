import { DataArrayHolderBase, DataArrayHolderJSON } from './dataarrayholder';
import { Link, LinkBase } from './link';

export interface ItemJSON extends DataArrayHolderJSON {
    href: string;
    links: Link[];
}

export interface ItemAPI {
    link(rel: string): string;
}

export interface Item extends ItemJSON, ItemAPI {}

export class ItemBase extends DataArrayHolderBase implements Item {
    public href: string;
    public links: Link[];

    constructor(item: ItemJSON) {
        super(item);
        this.href = item.href;
    }

    public link(rel: string): string {
        return LinkBase.findLink(this.links, rel);
    }
}
