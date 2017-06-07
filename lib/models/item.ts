import { Data } from './data';
import { DataArrayHolder, DataArrayHolderJSON } from './dataarrayholder';
import { Link, LinkJSON } from './link';

export interface ItemJSON extends DataArrayHolderJSON {
    href: string;
    links: Link[];
}

export class Item<LinkImpl extends Link> extends DataArrayHolder implements ItemJSON {
    public href: string;
    public links: Link[];

    constructor(item: ItemJSON, private linkimpl: {new(link: LinkJSON): LinkImpl}) {
        super(item);
        this.href = item.href;
        this.links = Link.parseArray<LinkImpl>(item.links, this.linkimpl);
    }

    public link(rel: string): string {
        return Link.findLink(this.links, rel);
    }

    public static parseArray<LinkImpl extends Link>(items: ItemJSON[],
                                                    linkimpl: {new(link: LinkJSON): LinkImpl})
    : Array<Item<LinkImpl>> {
        const itemArray: Array<Item<LinkImpl>> = [];
        if (items) {
            for (const i of items) {
                itemArray.push(new Item<LinkImpl>(i, linkimpl));
            }
        }
        return itemArray;
    }
}
